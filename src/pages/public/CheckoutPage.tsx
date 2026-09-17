import React from "react";
import { OrderCheckoutView } from "@/components/checkout/OrderCheckoutView";
export const CheckoutPage: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => <OrderCheckoutView navigate={navigate} />;
