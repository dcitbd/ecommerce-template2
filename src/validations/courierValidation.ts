export function validateCourierConfig(courier: { name: string; apiKey?: string }) {
  return !!courier.name;
}
