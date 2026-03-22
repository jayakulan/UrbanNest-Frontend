"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/context/AuthContext";
import { Mail, Lock, Eye, HelpCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock Login Simulation
    setTimeout(() => {
      let role: UserRole = "Tenant";
      if (email.includes("owner")) role = "Owner";
      if (email.includes("admin")) role = "Admin";
      
      login("mock-jwt-token-xyz-123", {
        id: "usr-" + Math.floor(Math.random() * 1000),
        name: "Test User",
        email,
        role: role
      });
      
      router.push(`/dashboard/${role.toLowerCase()}`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] bg-[#fafafa]">
      
      {/* Left Full-Height Image Side */}
      <div className="hidden md:flex w-full md:w-1/2 relative flex-col justify-end">
        <img 
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="Modern Architecture" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Glassmorphism Card */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-10">
          <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 p-10 rounded-2xl w-full max-w-lg text-left shadow-2xl">
            <h1 className="text-4xl font-bold text-white mb-6 tracking-tight drop-shadow-md">
              UrbanNest
            </h1>
            <h2 className="text-2xl font-bold text-white mb-4 leading-snug drop-shadow-md">
              Find your perfect home effortlessly
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed font-medium">
              Experience a curated selection of architectural masterpieces designed for the modern urban dweller.
            </p>
          </div>
        </div>
        
        {/* Small Bottom Left Footer */}
        <div className="relative z-10 p-10 w-full flex flex-col gap-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
          <p>© {new Date().getFullYear()} URBANNEST ARCHITECTURAL RENTALS</p>
          <button className="flex items-center gap-2 hover:text-white transition-colors w-max">
            <HelpCircle size={14} /> 
            NEED HELP?
          </button>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 relative">
        
        <div className="max-w-md w-full bg-white p-10 rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-gray-50 relative z-10">
          
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-500 font-medium mb-8">
            Please enter your details to sign in.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Form Fields */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3.5 bg-[#f1f3f5] border-transparent rounded-lg text-gray-900 text-sm focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-colors placeholder-gray-400 font-medium"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <a href="#" className="text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors">
                  Forgot Password?
                </a>
              </div>
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
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center mt-4 mb-6">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer bg-white"
              />
              <label htmlFor="remember" className="ml-2.5 text-sm font-medium text-gray-600 cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#05050f] hover:bg-black text-white py-4 rounded-lg font-bold text-sm transition-colors shadow-lg flex justify-center items-center mt-2"
            >
              {isLoading ? "Signing in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-grow h-px bg-gray-100"></div>
            <span className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Or</span>
            <div className="flex-grow h-px bg-gray-100"></div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 py-3.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Login with Google
          </button>

          <p className="mt-8 text-center text-sm font-medium text-gray-500">
            Don't have an account?{" "}
            <Link href="/signup" className="font-bold text-[#4c6b9f] hover:text-blue-700 transition-colors">
              Sign Up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
