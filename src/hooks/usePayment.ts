import { useState, useEffect } from "react";
import { PaymentMethodConfig } from "@/types/payment";
import { getPaymentMethods, savePaymentMethods } from "@/services/paymentService";

export const usePayment = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodConfig[]>([]);
  const refreshPaymentMethods = () => setPaymentMethods(getPaymentMethods());
  useEffect(() => { refreshPaymentMethods(); }, []);
  return { paymentMethods, refreshPaymentMethods, savePaymentMethods };
};
