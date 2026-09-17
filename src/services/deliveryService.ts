import { DeliveryAreaConfig, DeliveryMethodConfig } from "@/types/delivery";

export const INITIAL_AREAS: DeliveryAreaConfig[] = [
  { id: "inside_dhaka", name: "Inside Dhaka", baseCharge: 90, perKgOverOneKg: 20, estimatedDays: "1-2 days", isActive: true },
  { id: "outside_dhaka", name: "Outside Dhaka", baseCharge: 130, perKgOverOneKg: 20, estimatedDays: "2-4 days", isActive: true }
];

export const INITIAL_METHODS: DeliveryMethodConfig[] = [
  { id: "home", title: "Home delivery", freeShipping: false, requiresAddress: true, isActive: true },
  { id: "office", title: "Collect from Office", freeShipping: true, requiresAddress: false, isActive: true },
  { id: "point", title: "From collection Point", freeShipping: false, requiresAddress: true, isActive: true }
];

export function getDeliveryAreas(): DeliveryAreaConfig[] {
  try {
    const raw = localStorage.getItem("twbd_delivery_areas");
    return raw ? JSON.parse(raw) : INITIAL_AREAS;
  } catch {
    return INITIAL_AREAS;
  }
}

export function saveDeliveryAreas(areas: DeliveryAreaConfig[]) {
  localStorage.setItem("twbd_delivery_areas", JSON.stringify(areas));
}

export function getDeliveryMethods(): DeliveryMethodConfig[] {
  try {
    const raw = localStorage.getItem("twbd_delivery_methods");
    return raw ? JSON.parse(raw) : INITIAL_METHODS;
  } catch {
    return INITIAL_METHODS;
  }
}

export function saveDeliveryMethods(methods: DeliveryMethodConfig[]) {
  localStorage.setItem("twbd_delivery_methods", JSON.stringify(methods));
}
