import { getStoredProducts, saveProducts, addProduct, updateProduct, deleteProduct } from "@/services/productService";

export const productStore = {
  getAll: getStoredProducts,
  saveAll: saveProducts,
  add: addProduct,
  update: updateProduct,
  delete: deleteProduct
};
