import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, ArrowRight, ArrowRightCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0b0f19] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div className="col-span-1 border-r border-gray-800 pr-4">
            <Link href="/" className="inline-block mb-6">
              <span className="font-bold text-2xl tracking-tight text-white">UrbanNest</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Redefining the rental experience through seamless connections and digital innovation. Your next home is just a click away.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-md bg-gray-900 border border-gray-800 flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                <Facebook size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-md bg-gray-900 border border-gray-800 flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                <Twitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-md bg-gray-900 border border-gray-800 flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                <Instagram size={14} />
              </a>
            </div>
          </div>

          <div className="col-span-1 pl-0 md:pl-8">
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">PLATFORM</h3>
            <ul className="space-y-4 text-xs text-gray-400 font-medium">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">SUPPORT</h3>
            <ul className="space-y-4 text-xs text-gray-400 font-medium">
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/safety" className="hover:text-white transition-colors">Safety</Link></li>
              <li><Link href="/guide" className="hover:text-white transition-colors">Renters Guide</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">STAY UPDATED</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Get the latest properties and real estate trends delivered right to your inbox.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full bg-gray-900 border border-gray-800 rounded-md py-2.5 pl-3 pr-10 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
              />
              <button className="absolute inset-y-0 right-0 p-2.5 text-gray-400 hover:text-white bg-white rounded-r-md transition-colors flex items-center justify-center">
                <ArrowRight size={14} className="text-black" />
              </button>
            </div>
          </div>
          
        </div>
        
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} UrbanNest. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/cookies" className="hover:text-gray-300 transition-colors">Cookies</Link>
            <Link href="/accessibility" className="hover:text-gray-300 transition-colors">Accessibility</Link>
            <Link href="/investors" className="hover:text-gray-300 transition-colors">Investors</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
