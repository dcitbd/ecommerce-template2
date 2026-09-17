export async function createPaperflyOrder(orderData: any, apiKey: string) {
  return { success: true, trackingCode: "PFLY-" + Math.floor(100000 + Math.random() * 900000) };
}
