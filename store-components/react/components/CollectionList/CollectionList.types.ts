interface CollectionCardProps {
  image: string;
  imageMobile: string;
  title: string;
  text: string;
  buttonLabel: string;
  subTitle: string;
  href: string;
  alt: string;
}

interface CollectionListProps {
  items?: CollectionCardProps[];
  infinite: boolean;
}

export type { CollectionCardProps, CollectionListProps };
