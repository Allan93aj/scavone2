import React, { useState, useEffect } from 'react';
import { useOrderForm } from 'vtex.order-manager/OrderForm';

import styles from './MinicartCoupon.css';

const MinicartCoupon = () => {
  const { orderForm, setOrderForm } = useOrderForm();
  const orderFormId = orderForm?.id;

  const [coupon, setCoupon] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeCoupon, setActiveCoupon] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (orderForm?.marketingData?.coupon !== null) {
      setActiveCoupon(orderForm?.marketingData?.coupon);
    }
  }, [orderForm]);

  const getExpectedSections = () => [
    'items',
    'totalizers',
    'clientProfileData',
    'shippingData',
    'paymentData',
    'sellers',
    'messages',
    'marketingData',
    'clientPreferencesData',
    'storePreferencesData',
    'giftRegistryData',
    'ratesAndBenefitsData',
    'openTextField',
    'commercialConditionData',
    'customData',
  ];

  const updateOrderForm = async (updatedOrderForm: any) => {
    const itemsSellingPrice = updatedOrderForm.items.map(
      (item: { sellingPrice: any }) => ({ sellingPrice: item.sellingPrice }),
    );

    const items = orderForm.items.map((item: object, index: number) => ({
      ...item,
      ...itemsSellingPrice[index],
    }));

    setOrderForm({
      ...orderForm,
      marketingData: updatedOrderForm.marketingData,
      totalizers: updatedOrderForm.totalizers,
      items,
    });
  };

  const handleAddCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderFormId) {
      setMessage('Erro ao recuperar o ID do pedido.');

      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch(
        `/api/checkout/pub/orderForm/${orderFormId}/coupons`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: coupon,
            expectedOrderFormSections: getExpectedSections(),
          }),
        },
      );

      if (response.ok) {
        const result = await response.json();

        setActiveCoupon(result?.marketingData?.coupon);

        if (!result?.marketingData?.coupon) {
          setMessage('Cupom inválido');
        } else {
          setMessage('Cupom adicionado com sucesso!');
          setCoupon('');
          updateOrderForm(result);
        }
      } else {
        const error = await response.json();

        setMessage(error.message || 'Erro ao aplicar o cupom.');
      }
    } catch (err) {
      setMessage('Erro ao conectar ao servidor. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCoupon = async () => {
    const response = await fetch(
      `/api/checkout/pub/orderForm/${orderFormId}/coupons`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: '',
          expectedOrderFormSections: getExpectedSections(),
        }),
      },
    );

    if (!response.ok) {
      const error = await response.json();

      setMessage(error.message || 'Erro ao remover o cupom.');

      return;
    }

    const result = await response.json();

    setActiveCoupon(result?.marketingData?.coupon);
    setMessage('Cupom removido com sucesso!');
    setCoupon('');
    updateOrderForm(result);
  };

  return (
    <div className={styles.coupon_manager}>
      {activeCoupon ? (
        <div className={styles.active_coupon}>
          <span>
            Cupom ativo: <strong>{activeCoupon}</strong>
          </span>
          <button onClick={handleRemoveCoupon} className={styles.remove_coupon}>
            X
          </button>
        </div>
      ) : (
        <form onSubmit={handleAddCoupon} className={styles.add_coupon_form}>
          <label htmlFor="coupon_input">Cupom de desconto</label>
          <section className={styles.coupon_section}>
            <input
              id="coupon_input"
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Insira o código do cupom"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className={styles.btn_add}
            >
              {isLoading ? 'Verificando...' : 'Adicionar'}
            </button>
          </section>
        </form>
      )}
      {message && <p className={styles.coupon_message}>{message}</p>}
    </div>
  );
};

export default MinicartCoupon;
