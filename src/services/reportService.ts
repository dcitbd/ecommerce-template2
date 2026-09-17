import { getOrders } from "./orderService";
import { getStoredProducts } from "./productService";
import { getCustomers } from "./customerService";

export function generateDashboardAnalytics() {
  const orders = getOrders();
  const products = getStoredProducts();
  const customers = getCustomers();

  const totalSales = orders.filter(o => o.orderStatus !== "Cancelled").reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrders = orders.filter(o => o.orderStatus === "Pending").length;
  const deliveredOrders = orders.filter(o => o.orderStatus === "Delivered").length;
  const wholesaleOrders = orders.filter(o => o.orderType === "WholeSale").length;
  const preOrders = orders.filter(o => o.orderType === "Pre-Order").length;

  return {
    totalSales,
    totalOrders: orders.length,
    pendingOrders,
    deliveredOrders,
    wholesaleOrders,
    preOrders,
    totalProducts: products.length,
    totalCustomers: customers.length,
    stockValue: products.reduce((sum, p) => sum + (p.prices.stockPrice || p.prices.mrp) * p.stock, 0)
  };
}
