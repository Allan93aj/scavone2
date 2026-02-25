interface ShareOptionProps {
  title: string;
  icon: string;
  href: string;
}

interface ShareProps {
  options: ShareOptionProps[];
}

export type { ShareProps, ShareOptionProps };
