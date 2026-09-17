export interface FraudReport {
  phone: string;
  totalParcels: number;
  deliveredParcels: number;
  returnedParcels: number;
  successRate: number;
  riskRating: string;
  courierReports: {
    courier: string;
    delivered: number;
    returned: number;
  }[];
}
