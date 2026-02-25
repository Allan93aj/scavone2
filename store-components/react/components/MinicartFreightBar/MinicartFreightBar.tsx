/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { useOrderForm } from 'vtex.order-manager/OrderForm';
import { useCssHandles } from 'vtex.css-handles';
import { useQuery } from 'react-apollo';

import MinicartFreightBarHandles from './MinicartFreightBar.handles';
import SearchIcon from '../Icons/SearchIcon';
import AppSettings from './minicartbarSettings.graphql';
import formatMoney from '../../utils/formatMoney';
import styles from './MinicartFreeshipping.css';

const MinicartFreightBar: React.FC = () => {
  const [cep, setCep] = useState('');
  const [state, setState] = useState('');
  const [freeShippingAmount, setFreeShippingAmount] = useState(0);
  const [isNewCep, setIsNewCep] = useState(false);
  const [remainingValue, setRemainingValue] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [freightOptions, setFreightOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { orderForm } = useOrderForm();
  const { handles } = useCssHandles(MinicartFreightBarHandles);

  const { data } = useQuery(AppSettings, {
    ssr: false,
    fetchPolicy: 'no-cache',
  });

  // Atualiza valores da barra de frete grátis
  useEffect(() => {
    if (!orderForm) return;
    if (orderForm?.shipping?.selectedAddress?.state && !isNewCep) {
      setState(orderForm.shipping.selectedAddress.state);
    }

    const minicartTotalValue = orderForm.value / 100;
    const minValue = freeShippingAmount;
    const remaining = minValue - minicartTotalValue;

    setRemainingValue(remaining > 0 ? remaining : 0);
    const calcPercentage = Math.min(
      (minicartTotalValue * 100) / Number(minValue || 1),
      100,
    );

    setPercentage(calcPercentage);
  }, [isNewCep, freeShippingAmount, orderForm]);

  // Busca configuração do frete grátis por estado
  useEffect(() => {
    if (!data?.publicSettingsForApp?.message) return;

    const settings = JSON.parse(data.publicSettingsForApp.message);
    const regions = settings.freeShippingRegions;

    if (Object.keys(regions).length === 0) {
      console.warn('No free shipping regions found');

      return;
    }

    const states = Object.keys(regions).reduce((acc, region) => {
      const statesInRegion = regions[region];

      Object.keys(statesInRegion).forEach((stateCode) => {
        acc[stateCode] = statesInRegion[stateCode];
      });

      return acc;
    }, {} as { [key: string]: number });

    const amount = states[state];

    if (amount) setFreeShippingAmount(amount);
  }, [state, data]);

  // Máscara e validação de CEP
  const handleChangeCep = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;

    value = value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 5) value = value.replace(/(\d{5})(\d)/, '$1-$2');
    setCep(value);
  };

  // Submissão do CEP: simula o frete sem recarregar o orderForm
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cep || cep.length < 8) return alert('Digite um CEP válido');

    setLoading(true);
    setFreightOptions([]);

    try {
      const res = await fetch(
        `/api/checkout/pub/postal-code/BRA/${cep.replace(/\D/g, '')}`,
      );

      const dataCep = await res.json();

      if (!dataCep?.state) {
        alert('CEP inválido');
        setLoading(false);

        return;
      }

      setIsNewCep(true);
      setState(dataCep.state);

      // Simulação de frete (sem alterar o orderForm real)
      const simulationBody = {
        items: orderForm?.items?.map((item: any) => ({
          id: item.id,
          quantity: item.quantity,
          seller: item.seller,
        })),
        postalCode: dataCep.postalCode,
        country: 'BRA',
      };

      const simulationRes = await fetch(
        '/api/checkout/pub/orderForms/simulation',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(simulationBody),
        },
        // eslint-disable-next-line @typescript-eslint/no-shadow
      ).then((res) => res.json());

      const logisticsInfo = simulationRes?.logisticsInfo;

      if (logisticsInfo && logisticsInfo[0]?.slas) {
        setFreightOptions(logisticsInfo[0].slas);
      } else {
        setFreightOptions([]);
      }
    } catch (error) {
      console.error('Erro ao buscar/calcular frete:', error);
      alert('Erro ao calcular frete. Tente novamente.');
    }

    setLoading(false);
    setIsNewCep(false);
  };

  return (
    <>
      <div className={handles.freightBarContainer}>
        {remainingValue <= 0 ? (
          <>
            <div className={handles.animatedBarContainer}>
              <div
                style={{ width: `${percentage}%` }}
                className={handles.animatedBar}
              />
            </div>
            <p className={handles.freightMessage}>
              Parabéns, você ganhou <strong>FRETE GRÁTIS</strong>
            </p>
          </>
        ) : (
          <>
            <div className={handles.animatedBarContainer}>
              <div
                style={{ width: `${percentage}%` }}
                className={handles.animatedBar}
              />
            </div>
            <p className={handles.freightMessage}>
              Faltam <strong>{formatMoney(remainingValue)}</strong> para{' '}
              <strong>FRETE GRÁTIS</strong>
            </p>
          </>
        )}
      </div>

      <article className={styles.freeShippingCep__container}>
        <section className={styles.freeShippingCep__textCep}>
          <p>
            Informe seu CEP para calcular o frete e verificar se há{' '}
            <strong>FRETE GRÁTIS</strong> para sua região.
          </p>
        </section>

        <form
          className={styles.freeShippingCep__content}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="x-cep"
            id="x-cep"
            placeholder="Digite seu CEP"
            className={styles.freeShippingCep__inputCep}
            onChange={handleChangeCep}
            value={cep}
          />
          <button
            type="submit"
            className={styles.freeShippingCep__submit}
            title="Pesquisar cep"
            disabled={loading}
          >
            {loading ? '...' : <SearchIcon />}
          </button>
        </form>

        <section className={styles.freeShippingCep__DontKnowCep}>
          <a
            target="_blank"
            href="http://buscacepinter.correios.com.br/app/endereco/index.php?t"
            rel="noreferrer"
          >
            Não sei meu cep!
          </a>
        </section>

        {freightOptions.length > 0 && (
          <section className={styles.freeShippingCep__freightList}>
            <h4>Opções de frete:</h4>
            <ul>
              {freightOptions.map((option) => (
                <li key={option.id}>
                  {option.name} -{' '}
                  {option.price === 0
                    ? 'Grátis'
                    : formatMoney(option.price / 100)}{' '}
                  (
                  {option.shippingEstimate
                    .replace('bd', ' dias úteis')
                    .replace('d', ' dias')}
                  )
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
};

export default MinicartFreightBar;
