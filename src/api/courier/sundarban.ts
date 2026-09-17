export async function createSundarbanOrder(orderData: any, apiKey: string) {
  return { success: true, trackingCode: "SND-" + Math.floor(100000 + Math.random() * 900000) };
}
