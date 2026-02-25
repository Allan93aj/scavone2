/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect, useState } from 'react';
import { useProduct } from 'vtex.product-context';

const StockAlert = ({ showAlert = true }) => {
  const { selectedItem } = useProduct();
  const [stock, setStock] = useState(null);

  const skuId = selectedItem && selectedItem.itemId;

  useEffect(() => {
    if (!skuId) return;

    const fetchStock = async () => {
      try {
        const response = await fetch(
          `/api/catalog_system/pvt/sku/stockkeepingunitbyid/${skuId}`,
        );

        const data = await response.json();
        const available =
          data && data.AvailableQuantity ? data.AvailableQuantity : null;

        setStock(available);
      } catch (err) {
        console.error('Erro ao buscar estoque', err);
      }
    };

    fetchStock();
  }, [skuId]);

  if (!showAlert || stock === null) return null;

  return (
    <div
      style={{
        marginTop: '12px',
        padding: '8px 12px',
        borderRadius: '6px',
        background: '#f3f3f3',
        border: '1px solid #ccc',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '14px',
      }}
    >
      <span>🛒</span>
      <span>
        restam <strong>{stock}</strong> unid
      </span>
    </div>
  );
};

StockAlert.schema = {
  title: 'Stock Alert',
  type: 'object',
  properties: {
    showAlert: {
      title: 'Mostrar alerta?',
      type: 'boolean',
      default: true,
    },
  },
};

export default StockAlert;
