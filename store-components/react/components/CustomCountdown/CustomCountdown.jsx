import React, { useState, useEffect } from 'react';

import styles from './CustomCountdown.css';

const CustomCountdown = ({
  endDate = '2025-11-28T23:59:59',
  title = 'BLACK FRIDAY SCAVONE, O CONFORTO QUE VOCÊ MERECE!',
  subtitle = 'O descanso que você ama, com preços que você nunca viu. Prepare-se para se envolver em conforto e maciez.',
  showTitle = true,
  hideAfterEnd = false, // ⬅ NOVO
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const countDownDate = new Date(endDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance <= 0) {
        clearInterval(interval);

        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
        });

        setIsOver(true); // ⬅ Marca que o tempo acabou

        return;
      }

      setIsOver(false);

      setTimeLeft({
        days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(
          2,
          '0',
        ),
        hours: String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(
          2,
          '0',
        ),
        minutes: String(Math.floor((distance / (1000 * 60)) % 60)).padStart(
          2,
          '0',
        ),
        seconds: String(Math.floor((distance / 1000) % 60)).padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  // ⬅ Se o tempo acabou e o editor marcou para ocultar → não renderiza nada
  if (isOver && hideAfterEnd) return null;

  return (
    <div className={styles.ccContainer}>
      <div className={styles.ccContent}>
        <div className={styles.ccContenttext}>
          {showTitle && <h1 className={styles.ccTitle}>{title}</h1>}
          <p className={styles.ccSubtitle}>{subtitle}</p>
        </div>

        <div className={styles.ccWrapper}>
          <div className={styles.ccItem}>
            <div className={`${styles.ccNumber} ${styles.ccyellow}`}>
              {timeLeft.days}
            </div>
            <div className={styles.ccLabel}>Dias</div>
          </div>

          <div className={styles.ccItem}>
            <div className={`${styles.ccNumber} ${styles.ccred}`}>
              {timeLeft.hours}
            </div>
            <div className={styles.ccLabel}>Horas</div>
          </div>

          <div className={styles.ccItem}>
            <div className={`${styles.ccNumber} ${styles.pink}`}>
              {timeLeft.minutes}
            </div>
            <div className={styles.ccLabel}>Minutos</div>
          </div>

          <div className={styles.ccItem}>
            <div className={`${styles.ccNumber} ${styles.ccpurple}`}>
              {timeLeft.seconds}
            </div>
            <div className={styles.ccLabel}>Segundos</div>
          </div>
        </div>
      </div>
    </div>
  );
};

CustomCountdown.schema = {
  title: 'Custom Countdown',
  description: 'Countdown editável usado para promoções',
  type: 'object',
  properties: {
    endDate: {
      title: 'Data final do countdown',
      type: 'string',
      default: '2025-11-28T23:59:59',
      widget: {
        'ui:widget': 'datetime',
      },
    },
    title: {
      title: 'Título',
      type: 'string',
      default: 'BLACK FRIDAY SCAVONE, O CONFORTO QUE VOCÊ MERECE!',
    },
    showTitle: {
      title: 'Mostrar título?',
      type: 'boolean',
      default: true,
    },
    subtitle: {
      title: 'Subtítulo',
      type: 'string',
      default:
        'O descanso que você ama, com preços que você nunca viu. Prepare-se para se envolver em conforto e maciez.',
    },

    hideAfterEnd: {
      title: 'Ocultar componente quando o tempo acabar?',
      type: 'boolean',
      default: false,
    },
  },
};

export default CustomCountdown;
