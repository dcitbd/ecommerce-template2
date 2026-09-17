import { useState, useEffect } from "react";
import { Order } from "@/types/order";
import { getOrders } from "@/services/orderService";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const refreshOrders = () => setOrders(getOrders());
  useEffect(() => { refreshOrders(); }, []);
  return { orders, refreshOrders };
};
