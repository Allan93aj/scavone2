import React from 'react';
import classNames from 'classnames';
import { useDevice } from 'vtex.device-detector';
import { useCssHandles } from 'vtex.css-handles';

import TabsCustomHandles from './TabsCustom.handles';
import type { TabsCustomProps } from './TabsCustom.types';
import TabsCustomSchema from './TabsCustom.schema';

function TabsCustom(props: TabsCustomProps) {
  const { handles } = useCssHandles(TabsCustomHandles);
  const { isMobile } = useDevice();

  function goToSection(link: TabsCustomProps) {
    const element = document.getElementById(`${link}`);

    if (element) {
      const smoothScrollTo = (endPosition: number) => {
        const duration = 500;
        const startPosition = window.pageYOffset;
        const distance = endPosition - startPosition;
        const startTime = performance.now();

        const easeInOutQuad = (t: number) => {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        };

        const scroll = (currentTime: number) => {
          const elapsedTime = currentTime - startTime;
          const progress = easeInOutQuad(elapsedTime / duration);

          window.scrollTo(0, startPosition + distance * progress);

          if (elapsedTime < duration) {
            requestAnimationFrame(scroll);
          }
        };

        requestAnimationFrame(scroll);
      };

      const offsetTop = element?.offsetTop - 150;

      smoothScrollTo(offsetTop);
    }
  }

  return (
    !isMobile && (
      <div className={classNames(handles.TabsCustom)}>
        {props.items?.map((item: any, _) => {
          return (
            <button
              key={_}
              className={classNames(handles.TabsCustomTitle)}
              onClick={() => goToSection(item.link)}
            >
              {item.title}
            </button>
          );
        })}
      </div>
    )
  );
}

TabsCustom.getSchema = () => TabsCustomSchema;

export default TabsCustom;
