export interface PaymentMethodConfig {
  id: string;
  name: 'Cash on Delivery' | 'bKash' | 'Nagad' | 'Rocket' | 'SSLCommerz' | 'Bank Transfer / Dollar';
  code: string;
  isOnline: boolean;
  isActive: boolean;
  isDefault: boolean;
  accountNumber?: string;
  apiKey?: string;
  instructions?: string;
}
