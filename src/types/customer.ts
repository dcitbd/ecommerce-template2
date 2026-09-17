export type CustomerRiskLevel =
  | 'Very High Risk' // <50%
  | 'Low Risk'       // 50-60%
  | 'No Risk'        // 60-70%
  | 'Verified'       // 70-80%
  | 'Gold Verified'; // 80-100%

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  address: string;
  registrationDate: string;
  successOrdersCount: number;
  cancelledOrdersCount: number;
  totalOrdersCount: number;
  ratingPercentage: number;
  riskStatus: CustomerRiskLevel;
  notes?: string;
}
