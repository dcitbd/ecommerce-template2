export interface CourierConfig {
  id: string;
  name: 'Pathao' | 'Steadfast' | 'RedX' | 'Paperfly' | 'Sundarban';
  apiKey: string;
  apiSecret?: string;
  webhookUrl?: string;
  isActive: boolean;
  isDefault: boolean;
}
