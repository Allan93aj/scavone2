/* eslint-disable */
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ExtensionPoint } from 'vtex.render-runtime';
import { useProduct } from 'vtex.product-context';
import { useCrossSelling, CrossSellingProduct } from '../../context/CrossSellingContext';
import s from './styles.css'

const CrossProductSlider = () => {
  const productContext = useProduct();
  const { products } = useCrossSelling();

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  const renderExtension = (product: CrossSellingProduct) => (
    <div key={product.product?.productId}>
      <ExtensionPoint id="cross-product-summary" blockProps={{ product }} />
    </div>
  );

  const renderComplementaryOnly = (crossProduct: CrossSellingProduct) => {
    if (crossProduct.product?.productId === productContext?.product?.productId) {
      return null;
    }
    return renderExtension(crossProduct);
  };

  return (
    <div className={s.crossProductSlider}>
      <Slider {...settings}>
        {products?.map(renderComplementaryOnly)}
      </Slider>
    </div>
  );
};

export default CrossProductSlider;
