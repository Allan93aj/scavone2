import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import classNames from 'classnames';

import type { MegaSubmenuProps } from './MegaMenu.types';
import Link from '../Link';
import MegaMenuHandles from './MegaMenu.handles';

function Submenu({ items }: MegaSubmenuProps) {
  const { handles } = useCssHandles(MegaMenuHandles);

  return (
    <ul className={classNames(handles.submenuList, 'flex flex-column')}>
      {items?.map((item) => (
        <li key={item.label} className={handles.submenuListItem}>
          <Link href={item.href} className="nowrap c-on-base">
            {item.highlight ? (
              <strong className={`${handles.submenuListItem}--highlight fw6`}>
                {item.label}
              </strong>
            ) : (
              item.label
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Submenu;
