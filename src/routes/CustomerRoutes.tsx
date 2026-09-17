import React from "react";
import { DashboardPage } from "@/pages/customer/DashboardPage";

export const renderCustomerRoute = (route: string, navigate: (r: string) => void) => {
  if (route.startsWith("customer")) {
    return <DashboardPage navigate={navigate} />;
  }
  return null;
};
