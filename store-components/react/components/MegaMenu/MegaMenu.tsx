import React from 'react';
import classNames from 'classnames';
import { useCssHandles } from 'vtex.css-handles';
import { useDevice } from 'vtex.device-detector';

import type { MegaMenuProps } from './MegaMenu.types';
import MegaMenuItem from './MegaMenuItem';
import MegaMenuHandles from './MegaMenu.handles';
import { MegaMenuSchema } from './MegaMenu.schema';
import DrawerItem from './DrawerItem';
import Link from '../Link';

function MegaMenu({ items }: MegaMenuProps) {
  const { handles } = useCssHandles(MegaMenuHandles);
  const { isMobile } = useDevice();

  return (
    <ul
      className={classNames(handles.megaMenu, 'list nested-list-reset pa0', {
        'flex items-center': !isMobile,
      })}
    >
      {items.map((item) =>
        isMobile ? (
          item.submenus ? (
            <DrawerItem key={item.label} {...item} />
          ) : (
            <Link
              key={item.label}
              href={item.href}
              className={handles.noSubmenu}
            >
              {item.label}
            </Link>
          )
        ) : (
          <MegaMenuItem key={item.label} {...item} />
        ),
      )}
    </ul>
  );
}

MegaMenu.getSchema = () => MegaMenuSchema;

export default MegaMenu;
