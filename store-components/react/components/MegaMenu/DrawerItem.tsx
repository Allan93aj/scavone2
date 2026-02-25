import React, { useMemo } from 'react';
import {
  DisclosureLayout,
  DisclosureTrigger,
  DisclosureContent,
} from 'vtex.disclosure-layout';
import { useCssHandles } from 'vtex.css-handles';
import { index as RichText } from 'vtex.rich-text';

import type { MegaMenuItemProps } from './MegaMenu.types';
import Link from '../Link';

interface DrawerGroupedItem {
  label?: string;
  href?: string;
  submenus?: DrawerGroupedItem[];
}

/**
 * Mega Menu item for mobile view.
 */
function DrawerItem({ label, href, submenus }: MegaMenuItemProps) {
  const { handles } = useCssHandles(['drawerMenuItem']);

  const submenusGroupedByHighlight = useMemo(() => {
    if (!submenus?.length) return;

    const flatSubmenus = submenus?.flatMap(({ items }) => items);

    const result: DrawerGroupedItem[] = [];

    let index = -1;

    flatSubmenus.forEach((item) => {
      if (!item) return;

      if (item?.highlight || index < 0) {
        index++;

        result[index] = {
          ...item,
          submenus: [],
        };

        return;
      }

      result[index].submenus?.push(item);
    });

    return result;
  }, [submenus]);

  return (
    <DisclosureLayout>
      <DisclosureTrigger>
        <Link href={href}>
          <RichText text={label} />
        </Link>
        {/* <Icon name="chevron-disclosure" /> */}
      </DisclosureTrigger>
      <DisclosureContent>
        {submenusGroupedByHighlight?.map((item) =>
          item.submenus?.length ? (
            <DisclosureLayout>
              <DisclosureTrigger>
                <Link href={item.href}>{item.label}</Link>
                {/* <Icon name="chevron-disclosure" /> */}
              </DisclosureTrigger>
              <DisclosureContent>
                {item.submenus.map((subItem) => (
                  <Link
                    key={subItem.label}
                    href={subItem.href}
                    className={handles.drawerMenuItem}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </DisclosureContent>
            </DisclosureLayout>
          ) : (
            <Link href={item.href} className={handles.drawerMenuItem}>
              {item.label}
            </Link>
          ),
        )}
      </DisclosureContent>
    </DisclosureLayout>
  );
}

export default DrawerItem;
