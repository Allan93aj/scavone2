interface Item {
  spacingTop: string;
  spacingLeft: string;
  productId: string;
}

interface InteractiveBannerProps {
  items: Item[];
  image: string;
  children?: React.ReactNode;
}

export type { InteractiveBannerProps };
