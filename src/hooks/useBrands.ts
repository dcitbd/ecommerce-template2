import { useState, useEffect } from "react";
import { Brand } from "@/types/brand";
import { getBrands } from "@/services/brandService";

export const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  useEffect(() => { setBrands(getBrands()); }, []);
  return { brands };
};
