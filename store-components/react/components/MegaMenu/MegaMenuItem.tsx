import React, { useState, useCallback, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useCssHandles } from 'vtex.css-handles';
import { index as RichText } from 'vtex.rich-text';

import Image from '../Image';
import type { MegaMenuItemProps } from './MegaMenu.types';
import Link from '../Link';
import Submenu from './Submenu';
import MegaMenuHandles from './MegaMenu.handles';

/**
 * Mega Menu item for desktop view.
 */
function MegaMenuItem({ label, href, submenus, banner }: MegaMenuItemProps) {
  const [floatingMenuStyles, setFloatingMenuStyles] = useState<
    React.CSSProperties
  >({});

  const [isHovering, setIsHovering] = useState(false);

  const { handles } = useCssHandles(MegaMenuHandles);

  const menuItemRef = useRef<HTMLLIElement>(null);
  const timerRef: { current: NodeJS.Timeout | null } = useRef(null);

  const updateFloatingMenuStyles = useCallback((div: HTMLDivElement) => {
    const boundings = div?.getBoundingClientRect();

    if (!boundings?.width) return;

    const styles: React.CSSProperties = {
      left: 0,
    };

    setFloatingMenuStyles(styles);
  }, []);

  const clearHoverTimeout = () => {
    clearTimeout(timerRef.current as NodeJS.Timeout);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    clearHoverTimeout();
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setIsHovering(false), 150);
  };

  useEffect(() => {
    return () => clearHoverTimeout();
  });

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={handles.menuItem}
      ref={menuItemRef}
    >
      <Link
        className={classNames(handles.menuItemLabel, 'white fw6')}
        href={href}
      >
        <RichText text={label} />
      </Link>
      {(submenus?.length || banner?.src) && (
        <div
          className={classNames(handles.floatingMenuContainer, 'absolute', {
            dn: !isHovering,
          })}
          ref={updateFloatingMenuStyles}
          style={floatingMenuStyles}
        >
          <div
            className={classNames(handles.arrow, 'absolute')}
            style={{
              left: 0,
            }}
          />
          <div
            className={classNames(
              handles.floatingMenu,
              'relative flex bg-white',
            )}
          >
            <div className={handles.floatingMenuContent}>
              <div className={classNames(handles.submenuContainer, 'flex')}>
                {submenus?.map((submenu) => (
                  <Submenu key={JSON.stringify(submenu)} {...submenu} />
                ))}
              </div>
            </div>
            {banner?.src && (
              <div className="flex flex-column">
                <Image {...banner} />
              </div>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

export default MegaMenuItem;
