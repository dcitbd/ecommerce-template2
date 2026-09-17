export interface DeliveryAreaConfig {
  id: string;
  name: string;
  baseCharge: number;
  perKgOverOneKg: number;
  estimatedDays: string;
  isActive: boolean;
}

export interface DeliveryMethodConfig {
  id: string;
  title: string;
  freeShipping: boolean;
  requiresAddress: boolean;
  isActive: boolean;
}
