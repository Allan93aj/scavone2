import React, { useMemo } from 'react';
import { useCssHandles } from 'vtex.css-handles';

import StoresListHandles from '../Stores.handles';
import type { StoreProps } from '../Stores.types';
import Image from '../../Image';
import { IconWhatsapp, IconGoogle } from './Icons';

const Store = ({
  alt,
  src,
  city,
  street,
  saturday,
  sunday,
  week,
  obs,
  phone,
  whatsappNumber,
  whatsappUrl,
  googleUrl,
  classes,
  ...rest
}: StoreProps) => {
  const { handles } = useCssHandles(StoresListHandles, { classes });

  const timetable = useMemo(
    () => [
      {
        id: 'week',
        label: 'Segunda à Sexta-Feira:',
        info: week,
      },
      {
        id: 'saturday',
        label: 'Sábado:',
        info: saturday,
      },
      {
        id: 'sunday',
        label: 'Domingo:',
        info: sunday,
      },
    ],
    [saturday, sunday, week],
  );

  return (
    <li>
      <article className={handles.store}>
        <Image src={src} alt={alt ?? ''} {...rest} />

        <address>
          <h5 className={handles.storeCity}>{city}</h5>
          <span className={handles.storeStreet}>{street}</span>

          <label htmlFor="attendance" className={handles.storeAttendance}>
            Horário de atendimento:
          </label>

          <div id="attendance" className={handles.storeLabelContainer}>
            {timetable.map(({ id, label, info }) => (
              <div key={id}>
                <label htmlFor={id} className={handles.storeLabel}>
                  {label}
                </label>
                <span id={id} className={handles.storeLabelSpan}>
                  {info}
                </span>
              </div>
            ))}
          </div>

          <span className={handles.storeObs}>{obs}</span>

          <div className={handles.storePhoneContainer}>
            <div className={handles.storePhone}>
              <label
                htmlFor="whatsappNumber"
                className={handles.storeLabelSmall}
              >
                Whatsapp:
              </label>
              <span id="whatsappNumber" className={handles.storeLabelSpanSmall}>
                {whatsappNumber}
              </span>
            </div>

            <div className={handles.storePhone}>
              <label htmlFor="phone" className={handles.storeLabelSmall}>
                Telefone:
              </label>
              <span id="phone" className={handles.storeLabelSpanSmall}>
                {phone}
              </span>
            </div>
          </div>

          <div className={handles.storeButtonsContainer}>
            <button className={handles.storeButton} title="Chat WhatsApp">
              <a
                target="_blank"
                href={whatsappUrl}
                className={handles.storeButtonLink}
                rel="noreferrer"
              >
                <IconWhatsapp />
                Chat Whatsapp
              </a>
            </button>

            <button className={handles.storeButton} title="Ver no Google">
              <a
                target="_blank"
                href={googleUrl}
                className={handles.storeButtonLink}
                rel="noreferrer"
              >
                <IconGoogle />
                Ver no Google
              </a>
            </button>
          </div>
        </address>
      </article>
    </li>
  );
};

export default Store;
