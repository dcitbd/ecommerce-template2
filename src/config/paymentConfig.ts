export const DEFAULT_PAYMENT_METHODS = [
  {
    id: "cod",
    name: "Cash on Delivery",
    code: "COD",
    isOnline: false,
    isActive: true,
    isDefault: true,
    instructions: "পণ্য হাতে পেয়ে সম্পূর্ণ মূল্য পরিশোধ করুন। (প্রি-অর্ডারে প্রযোজ্য নয়)"
  },
  {
    id: "bkash",
    name: "bKash",
    code: "BKASH",
    isOnline: true,
    isActive: true,
    isDefault: false,
    accountNumber: "01351003958 (Merchant)",
    instructions: "বিকাশ পেমেন্ট গেটওয়ের মাধ্যমে ১০০% নিরাপদ পেমেন্ট করুন।"
  },
  {
    id: "nagad",
    name: "Nagad",
    code: "NAGAD",
    isOnline: true,
    isActive: true,
    isDefault: false,
    accountNumber: "01351003958 (Merchant)",
    instructions: "নগদ পেমেন্ট গেটওয়ের মাধ্যমে ইনস্ট্যান্ট পেমেন্ট সম্পন্ন করুন।"
  },
  {
    id: "rocket",
    name: "Rocket",
    code: "ROCKET",
    isOnline: true,
    isActive: true,
    isDefault: false,
    accountNumber: "01351003958",
    instructions: "ডাচ-বাংলা রকেট অ্যাকাউন্টের মাধ্যমে পে করুন।"
  },
  {
    id: "bank_dollar",
    name: "Bank Transfer / Dollar (USD / USDT)",
    code: "DOLLAR_CRYPTO",
    isOnline: false,
    isActive: true,
    isDefault: false,
    instructions: "আন্তর্জাতিক বা পাইকারি অর্ডারের ক্ষেত্রে USD/USDT বা সরাসরি ব্যাংক ট্রান্সফারে পেমেন্ট করুন।"
  }
];
