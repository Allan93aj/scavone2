import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import Slider from 'react-slick';

import type { SliderListProps, ArrowProps } from './Slider.types';
import { SliderListSchema } from './Slider.schema';
import SliderListHandles from './Slider.handles';
import './styles.global.css';

function PrevArrow({ className, onClick }: ArrowProps) {
  return (
    <button className={className} onClick={onClick} title="Anterior">
      &#8592;
    </button>
  );
}

function NextArrow({ className, onClick }: ArrowProps) {
  return (
    <button className={className} onClick={onClick} title="Próximo">
      &#8594;
    </button>
  );
}

function SliderCustom({ images, title, subtitle, classes }: SliderListProps) {
  const { handles } = useCssHandles(SliderListHandles, { classes });

  const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    dots: true,
    speed: 500,
    centerPadding: '0',
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    customPaging: (i: number) => (
      <button title={`Ir para o slide ${i + 1}`}>{i + 1}</button>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerMode: false,
          slidesToShow: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <section className={handles.sliderContainer}>
      <header className={handles.sliderHeader}>
        <h3 className={handles.sliderSubtitle}>
          {subtitle ?? 'NOSSA HISTÓRIA'}
        </h3>
        <h2 className={handles.sliderTitle}>{title ?? 'GALERIA DE FOTOS'}</h2>
      </header>

      <Slider {...settings} className={handles.sliderTrack}>
        {images?.map((item, index) => {
          return (
            <article key={index} className={handles.sliderItem}>
              <img src={item.image} alt={item.alt} />
              <p className={handles.sliderDescription}>{item.description}</p>
            </article>
          );
        })}
      </Slider>
    </section>
  );
}

SliderCustom.getSchema = () => SliderListSchema;

export default SliderCustom;
