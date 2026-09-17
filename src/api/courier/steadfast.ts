export async function createSteadfastOrder(orderData: any, apiKey: string) {
  console.log("Creating Steadfast parcel with API key:", apiKey ? "Configured" : "Missing");
  return { success: true, trackingCode: "STDF-" + Math.floor(100000 + Math.random() * 900000) };
}
