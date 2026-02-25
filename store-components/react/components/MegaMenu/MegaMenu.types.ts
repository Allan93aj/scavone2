export interface BannerProps {
  src: string;
  width: number;
  height: number;
  alt?: string;
  bottomText?: string;
}

export interface MenuItemProps {
  label: string;
  href?: string;
  highlight?: boolean;
}

export interface MegaSubmenuProps {
  items?: MenuItemProps[];
}

export interface MegaMenuItemProps extends MenuItemProps {
  submenus?: MegaSubmenuProps[];
  banner?: BannerProps;
}

export interface MegaMenuProps {
  items: MegaMenuItemProps[];
}
