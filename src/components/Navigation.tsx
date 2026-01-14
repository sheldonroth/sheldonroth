'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/artist', label: 'Artist' },
    { href: '/collections', label: 'Collections' },
    { href: '/shop', label: 'Shop' },
    { href: '/contact', label: 'Contact' },
  ];

  const textColor = isHome && !isScrolled ? 'text-white' : 'text-[#1a1a1a]';
  const bgColor = isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgColor}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className={`border ${isHome && !isScrolled ? 'border-white' : 'border-[#1a1a1a]'} px-2 py-1`}>
                <span className={`text-xs font-light tracking-[0.2em] ${textColor}`}>ROTH</span>
              </div>
              <div className="flex flex-col">
                <span className={`text-[10px] tracking-[0.3em] font-light ${textColor}`}>FINE</span>
                <span className={`text-[10px] tracking-[0.3em] font-light ${textColor}`}>ART</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs tracking-[0.2em] font-light transition-colors duration-300 hover:opacity-70 ${
                    pathname === link.href ? 'opacity-100' : 'opacity-80'
                  } ${textColor}`}
                >
                  {link.label.toUpperCase()}
                </Link>
              ))}
            </div>

            {/* Cart Icon */}
            <div className="hidden lg:flex items-center gap-6">
              <Link href="/cart" className={`relative ${textColor}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-2 text-[10px] font-medium bg-[#88744a] text-white w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden ${textColor}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-6 h-6"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-lg tracking-[0.3em] font-light transition-colors duration-300 ${
                pathname === link.href ? 'text-[#88744a]' : 'text-[#1a1a1a]'
              }`}
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
          <Link
            href="/cart"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg tracking-[0.3em] font-light text-[#1a1a1a] mt-4"
          >
            CART ({totalItems})
          </Link>
        </div>
      </div>
    </>
  );
}
