export function validatePaymentConfig(method: { name: string; code: string }) {
  return !!method.name && !!method.code;
}
