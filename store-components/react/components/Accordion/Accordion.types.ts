interface AccordionProps {
  summary: string;
  className?: string;
  children: React.ReactNode;
  initiallyOpen?: boolean;
  heightDependencies?: unknown;
}

export type { AccordionProps };
