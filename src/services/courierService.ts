import { CourierConfig } from "@/types/courier";
import { DEFAULT_COURIERS } from "@/config/courierConfig";

export function getCouriers(): CourierConfig[] {
  try {
    const raw = localStorage.getItem("twbd_courier_configs");
    return raw ? JSON.parse(raw) : DEFAULT_COURIERS;
  } catch {
    return DEFAULT_COURIERS as CourierConfig[];
  }
}

export function saveCouriers(couriers: CourierConfig[]) {
  localStorage.setItem("twbd_courier_configs", JSON.stringify(couriers));
}
