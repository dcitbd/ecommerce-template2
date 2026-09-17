import { getOrders, saveOrders, addOrder, updateOrderStatus, updateOrder, deleteOrder } from "@/services/orderService";

export const orderStore = {
  getAll: getOrders,
  saveAll: saveOrders,
  add: addOrder,
  updateStatus: updateOrderStatus,
  update: updateOrder,
  delete: deleteOrder
};
