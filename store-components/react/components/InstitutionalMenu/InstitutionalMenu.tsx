import React, { useCallback, useMemo, useState } from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { StoreLink } from 'vtex.store-link';
import classNames from 'classnames';
import { useDevice } from 'vtex.device-detector';
import { useRuntime } from 'vtex.render-runtime';

import InstitutionalMenuHandles from './InstitutionalMenu.handles';
import type { InstitutionalMenuProps } from './InstitutionalMenu.types';
import { InstitutionalMenuSchema } from './InstitutionalMenu.schema';
import MenuIcon from '../Icons/MenuIcon';

function InstitutionalMenu({ items }: InstitutionalMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { route } = useRuntime();

  const { handles } = useCssHandles(InstitutionalMenuHandles);
  const { isMobile } = useDevice();

  const selectedItem = useMemo(
    () => items.find((item) => route.path.includes(item.href)),
    [items, route],
  );

  const menuItemClasses = useCallback(
    (href: string) =>
      classNames([`${handles.institutionalMenuItem}`], {
        [`${handles['institutionalMenuItem--selected']}`]:
          selectedItem?.href === href,
      }),
    [handles, selectedItem],
  );

  const handleToggleOpen = useCallback(() => {
    setIsOpen((state) => !state);
  }, []);

  return (
    <>
      {isMobile ? (
        <>
          <div className={handles.institutionalMenuSelect}>
            <button
              className={`${handles.institutionalMenuSelectCurrent}${
                isOpen ? '--isOpen' : ''
              }`}
              onClick={handleToggleOpen}
            >
              {selectedItem?.label}
              {isOpen ? (
                <MenuIcon
                  name="chevron-institutional"
                  className={handles.chevronOpen}
                  color="#00C2DE"
                />
              ) : (
                <MenuIcon
                  name="chevron-institutional"
                  className={handles.chevron}
                  color="#00C2DE"
                />
              )}
            </button>
            {isOpen && (
              <div className={handles.institutionalMenuSelectOptions}>
                {items.map(({ label, href }) => (
                  <StoreLink key={label} label={label} href={href} />
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className={handles.institutionalMenu}>
          {items.map(({ label, href }) => (
            <div key={label} className={menuItemClasses(href)}>
              <StoreLink key={label} label={label} href={href} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

InstitutionalMenu.getSchema = () => InstitutionalMenuSchema;

export default InstitutionalMenu;
