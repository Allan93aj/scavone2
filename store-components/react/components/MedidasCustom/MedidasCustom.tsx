import React from 'react';
import classNames from 'classnames';
import { useCssHandles } from 'vtex.css-handles';
import { useDevice } from 'vtex.device-detector';

import MedidasCustomHandles from './MedidasCustom.handles';
import type { MedidasProps } from './Medidas.types';
import MedidasCustomSchema from './MedidasCustom.schema';

function MedidasCustom(props: MedidasProps) {
  const { handles } = useCssHandles(MedidasCustomHandles);
  const { isMobile } = useDevice();

  return (
    <div className={classNames(handles.MedidasCustom)} id="medidas">
      {!isMobile && (
        <h3 className={classNames(handles.MedidasCustomTitle)}>Medidas</h3>
      )}

      <div className={classNames(handles.MedidasCustomContainer)}>
        {props.items?.map((item: any, _) => {
          return (
            <div
              className={classNames(handles.MedidasCustomContainer_items)}
              key={_}
            >
              <img
                className={classNames(handles.image)}
                src={item.image}
                alt="Medidas de cama"
              />
              <div className={classNames(handles.items_text)}>
                <span className={classNames(handles.items_text_title)}>
                  {item.title}
                </span>
                <span
                  className={classNames(handles.items_text_content)}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

MedidasCustom.getSchema = () => MedidasCustomSchema;

export default MedidasCustom;
