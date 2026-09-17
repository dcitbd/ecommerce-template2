import { useState, useEffect } from "react";
import { CourierConfig } from "@/types/courier";
import { getCouriers, saveCouriers } from "@/services/courierService";

export const useCourier = () => {
  const [couriers, setCouriers] = useState<CourierConfig[]>([]);
  const refreshCouriers = () => setCouriers(getCouriers());
  useEffect(() => { refreshCouriers(); }, []);
  return { couriers, refreshCouriers, saveCouriers };
};
