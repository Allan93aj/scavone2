import React, { useState, useEffect } from 'react';
import { useCssHandles } from 'vtex.css-handles';
import classNames from 'classnames';

import SpinnerLoadingHandles from './SpinnerLoading.handles';

function SpinnerLoading() {
  const { handles } = useCssHandles(SpinnerLoadingHandles);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const elements = document.querySelectorAll('a, button');

    elements.forEach((el) => {
      el.addEventListener('click', () => {
        setIsVisible(true);
      });
    });

    const checkLoadingState = () => {
      if (window.document.readyState === 'complete') {
        setIsVisible(true);
      } else {
        setIsVisible(true);
      }
    };

    setInterval(checkLoadingState, 1000);
  }, []);

  return (
    isVisible && (
      <div className={classNames(handles.spinnerOverlay)}>
        <div className={classNames(handles.spinner)} />
      </div>
    )
  );
}

export default SpinnerLoading;
