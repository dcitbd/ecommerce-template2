export async function validateAndCompressImage(file: File): Promise<{ isValid: boolean; error?: string; base64?: string }> {
  if (file.size > 1024 * 1024) {
    return { isValid: false, error: "ছবির সাইজ ১ মেগাবাইটের (1MB) বেশি হতে পারবে না।" };
  }
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ isValid: true, base64: reader.result as string });
    reader.onerror = () => resolve({ isValid: false, error: "ছবি লোড করতে সমস্যা হয়েছে।" });
    reader.readAsDataURL(file);
  });
}
