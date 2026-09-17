export async function createPathaoOrder(orderData: any, apiKey: string) {
  console.log("Creating Pathao parcel with API key:", apiKey ? "Configured" : "Missing");
  return { success: true, trackingCode: "PTH-" + Math.floor(100000 + Math.random() * 900000) };
}
