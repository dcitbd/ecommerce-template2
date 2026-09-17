export async function createRedxOrder(orderData: any, apiKey: string) {
  return { success: true, trackingCode: "RDX-" + Math.floor(100000 + Math.random() * 900000) };
}
