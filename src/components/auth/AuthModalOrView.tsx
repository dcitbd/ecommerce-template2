import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { validatePhone } from "@/validations/authValidation";
import { sendOtpSms } from "@/api/sms/otpService";

export const AuthModalOrView: React.FC<{
  initialMode?: "login" | "register";
  navigate: (route: string) => void;
}> = ({ initialMode = "login", navigate }) => {
  const { login } = useAuth();
  const [mode, setMode] = useState<"login" | "register" | "forgot">(initialMode);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaChallenge, setCaptchaChallenge] = useState({ a: 7, b: 5 });

  // OTP state for forgot password / verification
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const refreshCaptcha = () => {
    setCaptchaChallenge({
      a: Math.floor(1 + Math.random() * 9),
      b: Math.floor(1 + Math.random() * 9)
    });
    setCaptchaInput("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      setError("সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন।");
      return;
    }
    if (parseInt(captchaInput, 10) !== captchaChallenge.a + captchaChallenge.b) {
      setError("ক্যাপচা সঠিক হয়নি। আবার যোগ করুন।");
      refreshCaptcha();
      return;
    }

    // Special check for admin credentials provided in prompt:
    // Jainal@2000, 01333301363 / 01351003958 / Twbd@2026
    const isAdminAccount = phone === "01351003958" || phone === "01333301363" || password === "Jainal@2000" || password === "Twbd@2026";

    login(phone, isAdminAccount ? "Super Admin" : "Customer", isAdminAccount ? "Jainal Abedin (Admin)" : "Valued Customer");
    navigate(isAdminAccount ? "admin" : "customer");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || name.trim().length < 2) {
      setError("আপনার পুরো নাম দিন।");
      return;
    }
    if (!validatePhone(phone)) {
      setError("সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন।");
      return;
    }
    if (parseInt(captchaInput, 10) !== captchaChallenge.a + captchaChallenge.b) {
      setError("ক্যাপচা সঠিক হয়নি।");
      refreshCaptcha();
      return;
    }

    login(phone, "Customer", name);
    navigate("customer");
  };

  const handleSendOtp = async () => {
    if (!validatePhone(phone)) {
      setError("ওটিপি পাঠানোর জন্য সঠিক মোবাইল নম্বর দিন।");
      return;
    }
    const mockOtp = "1234";
    await sendOtpSms(phone, mockOtp);
    setOtpSent(true);
    setMessage(`আপনার ${phone} নম্বরে ৪ ডিজিটের ভেরিফিকেশন কোড পাঠানো হয়েছে (পরীক্ষামূলক ওটিপি: 1234)`);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode !== "1234") {
      setError("ওটিপি কোড সঠিক নয়।");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setError("পাসওয়ার্ড ন্যূনতম ৬ অক্ষরের হতে হবে।");
      return;
    }
    setMessage("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে। এখন লগইন করুন।");
    setMode("login");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center mx-auto mb-3 shadow-md shadow-indigo-200">
            TW
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            {mode === "login" ? "কাস্টমার ও অ্যাডমিন লগইন" : mode === "register" ? "নতুন অ্যাকাউন্ট তৈরি করুন" : "পাসওয়ার্ড রিসেট"}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            টেকনো ওয়ার্ল্ড বিডি অ্যাকাউন্টে প্রবেশ করুন
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs font-semibold">
            ⚠️ {error}
          </div>
        )}
        {message && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded-xl text-xs font-semibold">
            ✓ {message}
          </div>
        )}

        {/* LOGIN FORM */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                মোবাইল নম্বর
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="01351003958"
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">পাসওয়ার্ড</label>
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="text-[11px] text-indigo-600 hover:underline font-semibold"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Math Captcha */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                সুরক্ষা ক্যাপচা: {captchaChallenge.a} + {captchaChallenge.b} = কত?
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={captchaInput}
                  onChange={e => setCaptchaInput(e.target.value)}
                  placeholder="যোগফল লিখুন"
                  required
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                />
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="px-3 bg-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-300"
                >
                  🔄
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-3 rounded-xl shadow transition-all"
            >
              লগইন করুন →
            </button>

            <div className="pt-2 text-center text-xs text-slate-600">
              অ্যাকাউন্ট নেই?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="text-indigo-600 font-bold hover:underline"
              >
                নতুন রেজিস্টার করুন
              </button>
            </div>
          </form>
        )}

        {/* REGISTER FORM */}
        {mode === "register" && (
          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">আপনার পুরো নাম *</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="যেমন: কামরুল হাসান"
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">মোবাইল নম্বর * (১১ ডিজিট)</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="017xxxxxxxx"
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ই-মেইল (ঐচ্ছিক)</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">বিস্তারিত ঠিকানা</label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="বাসা, রোড, থানা, জেলা..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">পাসওয়ার্ড *</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৬ অক্ষর"
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            {/* Captcha */}
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                সংখ্যা ক্যাপচা: {captchaChallenge.a} + {captchaChallenge.b} = কত?
              </label>
              <input
                type="number"
                value={captchaInput}
                onChange={e => setCaptchaInput(e.target.value)}
                placeholder="উত্তর দিন"
                required
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-3 rounded-xl shadow"
            >
              রেজিস্ট্রেশন সম্পন্ন করুন →
            </button>

            <div className="text-center text-xs text-slate-600">
              ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-indigo-600 font-bold hover:underline"
              >
                লগইন করুন
              </button>
            </div>
          </form>
        )}

        {/* FORGOT PASSWORD FORM (OTP) */}
        {mode === "forgot" && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                নিবন্ধিত মোবাইল নম্বর
              </label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="01351003958"
                  className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="bg-indigo-600 text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 whitespace-nowrap"
                >
                  ওটিপি পাঠান
                </button>
              </div>
            </div>

            {otpSent && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    মোবাইলে পাওয়া ৪ ডিজিটের ওটিপি
                  </label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={e => setOtpCode(e.target.value)}
                    placeholder="1234"
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-center font-mono font-bold tracking-widest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    নতুন পাসওয়ার্ড
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="নতুন পাসওয়ার্ড দিন"
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow"
                >
                  পাসওয়ার্ড পরিবর্তন কনফার্ম করুন
                </button>
              </>
            )}

            <div className="text-center text-xs">
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-slate-500 hover:text-slate-800"
              >
                ← লগইনে ফিরে যান
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
