import { DeliveryArea, DeliveryMethod } from "@/types/order";
import { DELIVERY_RATES } from "@/config/deliveryConfig";

/**
 * Calculates delivery charge based on prompt specifications:
 * - Collect from office: 0 Tk
 * - Outside Dhaka: 130 + weight-wise calculation (1kg=130, 1.1kg=130+20, 2kg=130+20, 2.1kg=130+20+20)
 * - Inside Dhaka: 90 + weight-wise calculation (1kg=90, 1.1kg=90+20, 2kg=90+20, 2.1kg=90+20+20)
 */
export function calculateDeliveryFee(
  area: DeliveryArea,
  method: DeliveryMethod,
  weightKg: number
): number {
  if (method === "Collect from Office") {
    return DELIVERY_RATES.officeCollection;
  }

  const normalizedWeight = Math.max(0.1, weightKg);
  // Base charge covers up to 1 kg
  const base = area === "Inside Dhaka" ? DELIVERY_RATES.insideDhaka.base : DELIVERY_RATES.outsideDhaka.base;
  const perKgFee = area === "Inside Dhaka" ? DELIVERY_RATES.insideDhaka.additionalPerKg : DELIVERY_RATES.outsideDhaka.additionalPerKg;

  if (normalizedWeight <= 1.0) {
    return base;
  }

  // Weight above 1kg: ceil(weight - 1) * 20 Tk
  // E.g. 1.1kg -> ceil(0.1) = 1 extra kg -> +20
  // 2.0kg -> ceil(1.0) = 1 extra kg -> +20
  // 2.1kg -> ceil(1.1) = 2 extra kg -> +40
  const extraKg = Math.ceil(normalizedWeight - 1.0);
  return base + extraKg * perKgFee;
}
