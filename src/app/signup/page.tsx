"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User, Mail, Phone, Lock, Eye, Building2, MapPin, Search, AlertCircle, RotateCcw
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [role, setRole] = useState("tenant"); // tenant or owner
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mock errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    setIsLoading(true);
    setTimeout(() => {
      router.push("/login");
      setIsLoading(false);
    }, 1500);
  };

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
          </div>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 relative">

        {/* The White Card Wrapper mimicking the Login Page */}
        <div className="max-w-xl w-full bg-white p-8 md:p-10 rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-gray-50 relative z-10">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Create Your Account</h2>
          <p className="mt-2 text-sm text-gray-500 mb-8 font-medium">
            Join UrbanNest and explore properties near you
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

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

            {/* Form Fields */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-3.5 bg-[#f1f3f5] border-transparent rounded-lg text-gray-900 text-sm focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-colors placeholder-gray-400 font-medium"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  className={`block w-full pl-10 pr-3 py-3.5 rounded-lg text-gray-900 text-sm transition-colors placeholder-gray-400 font-medium ${emailError ? "bg-red-50 border border-red-300 focus:ring-red-500" : "bg-[#f1f3f5] border-transparent focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                    }`}
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                />
              </div>
              {emailError && (
                <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle size={12} fill="currentColor" className="text-white" />
                  {emailError}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone no.</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    required
                    className="block w-full pl-10 pr-3 py-3.5 bg-[#f1f3f5] border-transparent rounded-lg text-gray-900 text-sm focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-colors placeholder-gray-400 font-medium"
                    placeholder="+1 (555) 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <MapPin size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3.5 bg-[#f1f3f5] border-transparent rounded-lg text-gray-900 text-sm focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-colors placeholder-gray-400 font-medium"
                    placeholder="City, State"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-3.5 bg-[#f1f3f5] border-transparent rounded-lg text-gray-900 text-sm focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-colors placeholder-gray-400 font-medium tracking-widest"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <RotateCcw size={18} />
                </div>
                <input
                  type="password"
                  required
                  className={`block w-full pl-10 pr-3 py-3.5 rounded-lg text-gray-900 text-sm transition-colors placeholder-gray-400 font-medium tracking-widest ${passwordError ? "bg-red-50 border border-red-300 focus:ring-red-500" : "bg-[#f1f3f5] border-transparent focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                    }`}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError(""); }}
                />
              </div>
              {passwordError && (
                <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle size={12} fill="currentColor" className="text-white" />
                  {passwordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-[#05050f] hover:bg-black text-white py-4 rounded-lg font-bold text-sm transition-colors shadow-lg flex justify-center items-center"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
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

        {/* Small Bottom Footer for Split Layout (Only visible on large screns outside wrapper) */}
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
