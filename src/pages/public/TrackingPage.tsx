import React from "react";
import { OrderTrackingView } from "@/components/order/OrderTrackingView";
export const TrackingPage: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => <OrderTrackingView navigate={navigate} />;
