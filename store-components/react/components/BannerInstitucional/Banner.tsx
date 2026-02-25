import React from 'react';
import { useCssHandles, applyModifiers } from 'vtex.css-handles';
import { useDevice } from 'vtex.device-detector';

import Image from '../Image';
import type { BannerProps } from './Banner.types';
import { BannerSchema } from './Banner.schema';
import BannerHandles from './Banner.handles';
import type { ImageProps } from '../Image/Image.types';

function Banner({
  title,
  subtitle,
  description,
  classes,
  textPosition,
  src,
  srcMobile,
  width,
  widthMobile,
  height,
  heightMobile,
  alt,
}: BannerProps) {
  const { handles } = useCssHandles(BannerHandles, { classes });
  const { isMobile } = useDevice();

  const imageProps = isMobile
    ? {
        src: srcMobile,
        width: widthMobile,
        height: heightMobile,
      }
    : { src, width, height };

  return (
    <div className={handles.instBannerContainer}>
      <Image {...(imageProps as ImageProps)} alt={alt} />

      <div className={applyModifiers(handles.instBannerText, textPosition)}>
        <h2 className={handles.instBannerSubtitle}>
          {subtitle ?? 'INSTITUCIONAL'}
        </h2>
        <h1 className={handles.instBannerTitle}>
          {title ?? 'SOBRE A SCAVONE'}
        </h1>
        <p className={handles.instBannerDescription}>
          {description ??
            'Uma loja enxovais com 120 anos de tradição e qualidade. Tudo produzido com tecido 100% algodão com toque acetinado.'}
        </p>
      </div>
    </div>
  );
}

Banner.getSchema = () => BannerSchema;

export default Banner;
