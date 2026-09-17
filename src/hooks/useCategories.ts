import { useState, useEffect } from "react";
import { Category } from "@/types/category";
import { getCategories } from "@/services/categoryService";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => { setCategories(getCategories()); }, []);
  return { categories };
};
