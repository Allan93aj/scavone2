import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useCssHandles } from 'vtex.css-handles';

import AccordionHandles from './Accordion.handles';
import type { AccordionProps } from './Accordion.types';
import { ChevronIcon } from '../Icons';

function Accordion({
  summary,
  children,
  className,
  initiallyOpen,
  heightDependencies,
  ...rest
}: AccordionProps) {
  const { handles } = useCssHandles(AccordionHandles);
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [contentHeight, setContentHeight] = useState(0);

  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setContentHeight(content?.current?.clientHeight ?? 0);
  }, [children, heightDependencies]);

  const handleToggle = useCallback(() => {
    setIsOpen((state) => !state);
  }, []);

  const inlineContentStyles = useMemo(
    () =>
      contentHeight && isOpen
        ? { height: `${contentHeight}px` }
        : { height: 0, margin: 0, padding: 0 },
    [isOpen, contentHeight],
  );

  return (
    <div
      className={`${handles.accordion} ${
        isOpen ? handles['accordion--open'] : ''
      } ${className ?? ''} w-100`}
      {...rest}
    >
      <button
        type="button"
        className={`t-body b input-reset bg-transparent bn color-inherit flex items-center justify-between pa0 w-100 ${handles.accordionToggle}`}
        onClick={handleToggle}
      >
        {summary}
        <ChevronIcon className={handles.arrow} />
      </button>
      <div
        style={inlineContentStyles}
        className={`relative overflow-hidden flex flex-column ${handles.accordionContent}`}
      >
        <div className="absolute w-100" ref={content}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Accordion;
