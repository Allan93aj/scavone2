import React from 'react';
import classNames from 'classnames';
import { useCssHandles } from 'vtex.css-handles';
import { useDevice } from 'vtex.device-detector';
import { SliderLayout } from 'vtex.slider-layout';
import { useProduct } from 'vtex.product-context';

import InstructionAndCareHandles from './InstructionAndCare.handles';
import InstructionAndCareSchema from './InstructionAndCare.schema';

// import type { InstructionAndCareProps } from './InstructionAndCare.types';

function InstructionAndCare() {
  const { handles } = useCssHandles(InstructionAndCareHandles);
  const { isMobile } = useDevice();
  const productContext = useProduct();

  const properties = productContext?.product?.properties;
  const instructions = properties?.find(
    (property) => property.name === 'Instruções checkbox',
  );

  return (
    <div className={classNames(handles.InstructionAndCare)} id="instrucoes">
      {!isMobile && (
        <h3 className={classNames(handles.InstructionAndCareTitle)}>
          INSTRUÇÕES/CUIDADOS
        </h3>
      )}

      <div className={classNames(handles.InstructionAndCareContainer)}>
        {!isMobile ? (
          instructions?.values?.map((value: any, _) => {
            const nameImages = value
              .replaceAll(' ', '-')
              .replaceAll('.', '')
              .normalize('NFD')
              .replaceAll(/[\u0300-\u036f]/g, '')
              .toLowerCase()
              .replaceAll(/[0-9]/g, '--');

            const nameImagesClean = nameImages.split('--');

            return (
              <div
                className={classNames(
                  handles.InstructionAndCareContainer_items,
                )}
                key={_}
              >
                <img
                  className={classNames(handles.item_image)}
                  src={`/arquivos/${nameImagesClean[0]}.png`}
                  alt="intrucoes de uso"
                />
                <span className={classNames(handles.items_text_title)}>
                  {value}
                </span>
              </div>
            );
          })
        ) : (
          <SliderLayout infinite itemsPerPage={2} showNavigationArrows="never">
            {instructions?.values?.map((value: any, _) => {
              const nameImagesSlide = value
                .replaceAll(' ', '-')
                .replaceAll('.', '')
                .normalize('NFD')
                .replaceAll(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .replaceAll(/[0-9]/g, '--');

              const nameImagesCleanSlide = nameImagesSlide.split('--');

              return (
                <div
                  className={classNames(
                    handles.InstructionAndCareContainer_items,
                  )}
                  key={_}
                >
                  <img
                    className={classNames(handles.item_image)}
                    src={`/arquivos/${nameImagesCleanSlide[0]}.png`}
                    alt="intrucoes de uso"
                  />
                  <span className={classNames(handles.items_text_title)}>
                    {value}
                  </span>
                </div>
              );
            })}
          </SliderLayout>
        )}
      </div>

      <span className={classNames(handles.items_text_title)}>
        *Produto com pequena margem para encolhimento devido a característica do
        tecido 100% algodão.
      </span>
    </div>
  );
}

InstructionAndCare.getSchema = () => InstructionAndCareSchema;

export default InstructionAndCare;
