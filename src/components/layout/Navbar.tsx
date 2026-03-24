"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, User, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/owner")) {
    return null;
  }

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="font-bold text-2xl text-black tracking-tight">UrbanNest</span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-black font-medium text-sm relative border-b-2 border-black pb-1">
              Home
            </Link>
            <Link href="/properties" className="text-gray-500 hover:text-black font-medium text-sm transition-colors pb-1">
              Properties
            </Link>
            <Link href="/about" className="text-gray-500 hover:text-black font-medium text-sm transition-colors pb-1">
              About
            </Link>
            <Link href="/contact" className="text-gray-500 hover:text-black font-medium text-sm transition-colors pb-1">
              Contact
            </Link>
          </div>
            
          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <div className="flex items-center gap-4">
                <Link href={`/dashboard/${user.role.toLowerCase()}`} className="text-sm font-medium text-gray-700 hover:text-black flex items-center gap-2">
                  <User size={16} />
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-red-500 font-medium text-sm transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <Link
                  href="/login"
                  className="text-gray-900 font-medium text-sm hover:text-gray-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-black text-white px-5 py-2 rounded font-medium text-sm hover:bg-gray-800 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-black focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 z-40">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-black bg-gray-50 rounded-md">Home</Link>
            <Link href="/properties" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md">Properties</Link>
            <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md">About</Link>
            <Link href="/contact" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md">Contact</Link>
          </div>
          <div className="pt-4 pb-4 border-t border-gray-100 px-4">
            {user ? (
              <div className="space-y-2">
                <Link
                  href={`/dashboard/${user.role.toLowerCase()}`}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-50 rounded-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link
                  href="/login"
                  className="block w-full text-center px-4 py-2 border border-gray-300 text-base font-medium text-black rounded hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-black rounded hover:bg-gray-800"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
