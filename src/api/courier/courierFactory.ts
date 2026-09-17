import { createSteadfastOrder } from "./steadfast";
import { createPathaoOrder } from "./pathao";
import { createRedxOrder } from "./redx";
import { createPaperflyOrder } from "./paperfly";
import { createSundarbanOrder } from "./sundarban";

export async function sendOrderToCourier(courierName: string, orderData: any, apiKey: string) {
  switch (courierName.toLowerCase()) {
    case "steadfast":
      return await createSteadfastOrder(orderData, apiKey);
    case "pathao":
      return await createPathaoOrder(orderData, apiKey);
    case "redx":
      return await createRedxOrder(orderData, apiKey);
    case "paperfly":
      return await createPaperflyOrder(orderData, apiKey);
    case "sundarban":
      return await createSundarbanOrder(orderData, apiKey);
    default:
      return await createSteadfastOrder(orderData, apiKey);
  }
}
