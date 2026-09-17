import { generateDashboardAnalytics } from "@/services/reportService";

export const adminStore = {
  getAnalytics: generateDashboardAnalytics
};
