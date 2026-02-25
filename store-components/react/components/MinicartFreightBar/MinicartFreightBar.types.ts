interface FreeShippingProps {
  freeShippingAmount: number;
  tradePolicy: string;
}
interface Settings {
  bindingId: string;
  freeShippingTradePolicies: [FreeShippingProps];
}

interface BindingBoundedSettings extends Settings {
  bindingBounded?: boolean;
  settings?: [Settings];
}

interface MinicartFreightBarProps {
  minValue: number;
  settings: BindingBoundedSettings;
}

export type { MinicartFreightBarProps };
