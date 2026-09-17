import React from "react";
import { CustomerDashboardView } from "@/components/customer/CustomerDashboardView";
export const DashboardPage: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => <CustomerDashboardView navigate={navigate} />;
