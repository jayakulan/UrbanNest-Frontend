"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User, Mail, Phone, Lock, Eye, EyeOff, Building2, MapPin, Search,
  AlertCircle, RotateCcw, CheckCircle2, ShieldCheck
} from "lucide-react";

// ── Validation helpers ────────────────────────────────────────────────────
const VALIDATORS = {
  fullName: (v: string) => {
    if (!v.trim()) return "Full name is required";
    if (v.trim().length < 3) return "Name must be at least 3 characters";
    if (!/^[a-zA-Z\s'-]+$/.test(v.trim())) return "Name can only contain letters, spaces, hyphens and apostrophes";
    return "";
  },
  email: (v: string) => {
    if (!v.trim()) return "Email address is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Please enter a valid email address";
    return "";
  },
  phoneNo: (v: string) => {
    if (!v.trim()) return "Phone number is required";
    const digits = v.replace(/\D/g, "");
    if (digits.length < 7) return "Phone number must be at least 7 digits";
    if (digits.length > 15) return "Phone number is too long";
    if (!/^[\d\s\+\-\(\)]+$/.test(v)) return "Enter a valid phone number";
    return "";
  },
  address: (v: string) => {
    if (!v.trim()) return "Address is required";
    if (v.trim().length < 5) return "Address must be at least 5 characters";
    return "";
  },
  password: (v: string) => {
    if (!v) return "Password is required";
    if (v.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(v)) return "Include at least one uppercase letter (A-Z)";
    if (!/[a-z]/.test(v)) return "Include at least one lowercase letter (a-z)";
    if (!/[0-9]/.test(v)) return "Include at least one number (0-9)";
    if (!/[^A-Za-z0-9]/.test(v)) return "Include at least one special character (!@#$...)";
    return "";
  },
  confirmPassword: (v: string, password: string) => {
    if (!v) return "Please confirm your password";
    if (v !== password) return "Passwords do not match";
    return "";
  },
};

/** Password strength score 0–4 */
function getPasswordStrength(pwd: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
  const colors = ["bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-blue-500", "bg-green-500"];
  return { score, label: pwd ? labels[score] : "", color: colors[score] };
}

type FormField = "fullName" | "email" | "phoneNo" | "address" | "password" | "confirmPassword";

export default function SignupPage() {
  const router = useRouter();

  const [role, setRole]           = useState("tenant");
  const [form, setForm]           = useState({
    fullName: "", email: "", phoneNo: "", address: "", password: "", confirmPassword: ""
  });
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [touched, setTouched]     = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword]         = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError]           = useState("");

  const strength = getPasswordStrength(form.password);

  // ── Validate a single field on blur / change ──
  const validate = useCallback((field: FormField, value: string) => {
    if (field === "confirmPassword") return VALIDATORS.confirmPassword(value, form.password);
    return VALIDATORS[field](value);
  }, [form.password]);

  const handleChange = (field: FormField, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setServerError("");
    // Re-validate on change only if field was already touched
    if (touched[field]) {
      let err = "";
      if (field === "confirmPassword") err = VALIDATORS.confirmPassword(value, form.password);
      else err = VALIDATORS[field](value);
      setErrors(prev => ({ ...prev, [field]: err }));
    }
    // Re-validate confirmPassword when password changes
    if (field === "password" && touched["confirmPassword"]) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: VALIDATORS.confirmPassword(form.confirmPassword, value)
      }));
    }
  };

  const handleBlur = (field: FormField) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const err = validate(field, form[field]);
    setErrors(prev => ({ ...prev, [field]: err }));
  };

  // ── Validate all fields before submit ──
  const validateAll = (): boolean => {
    const allTouched: Record<string, boolean> = {};
    const allErrors: Record<string, string> = {};
    const fields: FormField[] = ["fullName", "email", "phoneNo", "address", "password", "confirmPassword"];
    fields.forEach(f => {
      allTouched[f] = true;
      allErrors[f] = f === "confirmPassword"
        ? VALIDATORS.confirmPassword(form.confirmPassword, form.password)
        : VALIDATORS[f](form[f]);
    });
    setTouched(allTouched);
    setErrors(allErrors);
    return Object.values(allErrors).every(e => !e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setIsLoading(true);
    setServerError("");
    try {
      const response = await fetch("http://127.0.0.1:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phoneNo: form.phoneNo,
          address: form.address,
          password: form.password,
          role: role.toUpperCase(),
        }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (response.ok) {
        router.push("/login");
      } else {
        setServerError(data.message || `Signup failed (${response.status}). Please try again.`);
      }
    } catch {
      setServerError("An error occurred during signup. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ── Input field styling helper ──
  const fieldClass = (field: string) => {
    const hasError = touched[field] && errors[field];
    const isOk     = touched[field] && !errors[field] && form[field as FormField];
    if (hasError) return "bg-red-50 border border-red-400 focus:ring-1 focus:ring-red-400 focus:border-red-400";
    if (isOk)     return "bg-green-50 border border-green-300 focus:ring-1 focus:ring-green-300 focus:border-green-300";
    return "bg-[#f1f3f5] border-transparent focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-300";
  };

  // ── Error message component ──
  const FieldError = ({ field }: { field: string }) =>
    touched[field] && errors[field] ? (
      <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1 animate-in slide-in-from-top-1 duration-200">
        <AlertCircle size={11} className="shrink-0" />
        {errors[field]}
      </p>
    ) : null;

  // ── Success tick ──
  const FieldOk = ({ field }: { field: string }) =>
    touched[field] && !errors[field] && form[field as FormField] ? (
      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
        <CheckCircle2 size={16} className="text-green-500" />
      </div>
    ) : null;

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] bg-[#fafafa]">

      {/* Left Full-Height Image Side */}
      <div className="hidden md:flex w-full md:w-1/2 relative flex-col justify-end">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          alt="Modern Interior Architecture"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Glassmorphism Card */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-2xl w-full max-w-lg text-left shadow-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-sm">
              UrbanNest
            </h1>
            <p className="text-white/90 text-sm md:text-base leading-relaxed drop-shadow-sm">
              Find your perfect home effortlessly. Experience architectural curation in every listing.
            </p>

            {/* Trust badges */}
            <div className="flex items-center gap-3 mt-6">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <ShieldCheck size={14} className="text-green-300" />
                <span className="text-white/80 text-[11px] font-semibold">Secure Signup</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <CheckCircle2 size={14} className="text-blue-300" />
                <span className="text-white/80 text-[11px] font-semibold">Verified Listings</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 relative">

        <div className="max-w-xl w-full bg-white p-8 md:p-10 rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-gray-50 relative z-10">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Create Your Account</h2>
          <p className="mt-2 text-sm text-gray-500 mb-8 font-medium">
            Join UrbanNest and explore properties near you
          </p>

          {/* Server error banner */}
          {serverError && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-red-700 font-medium">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Role Selection */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3 block">I want to join as:</p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setRole("tenant")}
                  className={`flex-1 py-4 flex flex-col items-center justify-center gap-2 rounded-xl border transition-all ${role === "tenant"
                    ? "bg-[#eef2fc] border-blue-200 text-blue-900 shadow-sm ring-1 ring-blue-900/10"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div className="relative">
                    <User size={24} />
                    <Search size={10} strokeWidth={3} className="absolute -bottom-1 -right-1" />
                  </div>
                  <span className="text-xs font-bold">Tenant</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("owner")}
                  className={`flex-1 py-4 flex flex-col items-center justify-center gap-2 rounded-xl border transition-all ${role === "owner"
                    ? "bg-[#eef2fc] border-blue-200 text-blue-900 shadow-sm ring-1 ring-blue-900/10"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Building2 size={24} />
                  <span className="text-xs font-bold">Owner</span>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  className={`block w-full pl-10 pr-9 py-3.5 rounded-lg text-gray-900 text-sm transition-colors placeholder-gray-400 font-medium ${fieldClass("fullName")}`}
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={e => handleChange("fullName", e.target.value)}
                  onBlur={() => handleBlur("fullName")}
                />
                <FieldOk field="fullName" />
              </div>
              <FieldError field="fullName" />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  className={`block w-full pl-10 pr-9 py-3.5 rounded-lg text-gray-900 text-sm transition-colors placeholder-gray-400 font-medium ${fieldClass("email")}`}
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={e => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                />
                <FieldOk field="email" />
              </div>
              <FieldError field="email" />
            </div>

            {/* Phone + Address */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone No.</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    className={`block w-full pl-10 pr-9 py-3.5 rounded-lg text-gray-900 text-sm transition-colors placeholder-gray-400 font-medium ${fieldClass("phoneNo")}`}
                    placeholder="+1 (555) 000"
                    value={form.phoneNo}
                    onChange={e => handleChange("phoneNo", e.target.value)}
                    onBlur={() => handleBlur("phoneNo")}
                  />
                  <FieldOk field="phoneNo" />
                </div>
                <FieldError field="phoneNo" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <MapPin size={18} />
                  </div>
                  <input
                    type="text"
                    className={`block w-full pl-10 pr-9 py-3.5 rounded-lg text-gray-900 text-sm transition-colors placeholder-gray-400 font-medium ${fieldClass("address")}`}
                    placeholder="City, State"
                    value={form.address}
                    onChange={e => handleChange("address", e.target.value)}
                    onBlur={() => handleBlur("address")}
                  />
                  <FieldOk field="address" />
                </div>
                <FieldError field="address" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`block w-full pl-10 pr-10 py-3.5 rounded-lg text-gray-900 text-sm transition-colors placeholder-gray-400 font-medium tracking-widest ${fieldClass("password")}`}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => handleChange("password", e.target.value)}
                  onBlur={() => handleBlur("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Password strength bar */}
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[0, 1, 2, 3].map(i => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                          i < strength.score ? strength.color : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-[11px] font-bold ${
                    strength.score <= 1 ? "text-red-500" :
                    strength.score === 2 ? "text-yellow-600" :
                    strength.score === 3 ? "text-blue-600" : "text-green-600"
                  }`}>
                    {strength.label}
                  </p>
                </div>
              )}

              <FieldError field="password" />

              {/* Password requirements checklist */}
              {(touched["password"] || form.password) && (
                <ul className="mt-2 space-y-1">
                  {[
                    { label: "At least 8 characters",       ok: form.password.length >= 8 },
                    { label: "One uppercase letter (A-Z)",  ok: /[A-Z]/.test(form.password) },
                    { label: "One lowercase letter (a-z)",  ok: /[a-z]/.test(form.password) },
                    { label: "One number (0-9)",            ok: /[0-9]/.test(form.password) },
                    { label: "One special character",       ok: /[^A-Za-z0-9]/.test(form.password) },
                  ].map(({ label, ok }) => (
                    <li key={label} className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors ${ok ? "text-green-600" : "text-slate-400"}`}>
                      <CheckCircle2 size={11} className={ok ? "text-green-500" : "text-slate-300"} />
                      {label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <RotateCcw size={18} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`block w-full pl-10 pr-10 py-3.5 rounded-lg text-gray-900 text-sm transition-colors placeholder-gray-400 font-medium tracking-widest ${fieldClass("confirmPassword")}`}
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={e => handleChange("confirmPassword", e.target.value)}
                  onBlur={() => handleBlur("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(p => !p)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <FieldError field="confirmPassword" />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-[#05050f] hover:bg-black text-white py-4 rounded-lg font-bold text-sm transition-colors shadow-lg flex justify-center items-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-grow h-px bg-gray-100"></div>
            <span className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Or</span>
            <div className="flex-grow h-px bg-gray-100"></div>
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 py-3.5 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-3 shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign Up with Google
          </button>

          <p className="mt-8 text-center text-sm font-medium text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#4c6b9f] hover:text-blue-700 transition-colors">
              Login
            </Link>
          </p>
        </div>

        {/* Small Bottom Footer */}
        <div className="absolute bottom-6 left-0 right-0 hidden md:flex justify-between items-center text-[10px] text-gray-400 font-bold tracking-wider uppercase px-12">
          <p>© {new Date().getFullYear()} UrbanNest. An architectural curator experience.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
