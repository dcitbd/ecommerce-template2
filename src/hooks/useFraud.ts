import { useState } from "react";
import { checkPhoneFraud } from "@/api/fraud/fraudFactory";
import { FraudReport } from "@/types/fraud";

export const useFraud = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<FraudReport | null>(null);

  const checkFraud = async (phone: string) => {
    setLoading(true);
    try {
      const rep = await checkPhoneFraud(phone);
      setReport(rep);
      return rep;
    } finally {
      setLoading(false);
    }
  };

  return { loading, report, checkFraud };
};
