import { useState, useEffect } from "react";
import { Customer } from "@/types/customer";
import { getCustomers } from "@/services/customerService";

export const useCustomer = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const refreshCustomers = () => setCustomers(getCustomers());
  useEffect(() => { refreshCustomers(); }, []);
  return { customers, refreshCustomers };
};
