import { PaymentMethodConfig } from "@/types/payment";
import { DEFAULT_PAYMENT_METHODS } from "@/config/paymentConfig";

export function getPaymentMethods(): PaymentMethodConfig[] {
  try {
    const raw = localStorage.getItem("twbd_payment_configs");
    return raw ? JSON.parse(raw) : DEFAULT_PAYMENT_METHODS;
  } catch {
    return DEFAULT_PAYMENT_METHODS as PaymentMethodConfig[];
  }
}

export function savePaymentMethods(methods: PaymentMethodConfig[]) {
  localStorage.setItem("twbd_payment_configs", JSON.stringify(methods));
}
