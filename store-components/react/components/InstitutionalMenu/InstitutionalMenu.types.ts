interface MenuItem {
  label: string;
  href: string;
}

interface InstitutionalMenuProps {
  items: MenuItem[];
}

export { InstitutionalMenuProps, MenuItem };
