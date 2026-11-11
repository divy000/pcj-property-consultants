import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail, Phone, ChevronRight, MessageSquareText, MessageCircle } from 'lucide-react';
import { InstagramIcon } from '../common/InstagramIcon';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import { companyData } from '../../data/company';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openEnquiryModal } = useEnquiryModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Available Properties', path: '/properties' },
    { label: 'Our Services', path: '/services' },
    { label: 'Legacy & Projects', path: '/projects' },
    { label: 'Locations & Map', path: '/locations' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-ivory-50/95 backdrop-blur-md shadow-sm border-b border-gold-300/40 py-2.5'
          : 'bg-ivory-50 border-b border-stone-200/60 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-gold-400/40 bg-[#F5EFEB] shadow-sm flex items-center justify-center p-0.5 group-hover:border-gold-500 transition-colors shrink-0">
            <img
              src="/brand/pcj-logo.jpg"
              alt="PCJ Property Consultants"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-forest-950 group-hover:text-forest-800 transition-colors">
              PCJ PROPERTY CONSULTANTS
            </span>
            <span className="text-[10px] sm:text-xs text-gold-700 tracking-widest uppercase font-medium">
              Kumaon, Uttarakhand • Est. 1996
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs xl:text-sm tracking-wider uppercase font-medium transition-all relative py-1 ${
                  isActive
                    ? 'text-forest-950 font-bold'
                    : 'text-stone-600 hover:text-forest-950'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${companyData.contact.phoneCallable}`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-forest-950 bg-ivory-100 hover:bg-ivory-200 border border-stone-200 transition"
            title="Direct Phone Call"
          >
            <Phone className="w-3.5 h-3.5 text-gold-700" />
            <span>{companyData.contact.phoneDisplay}</span>
          </a>

          <button
            onClick={() => openEnquiryModal(null)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs uppercase tracking-widest font-semibold shadow-sm hover:shadow-gold-glow transition-all"
          >
            <MessageSquareText className="w-3.5 h-3.5 text-gold-400" />
            <span>Consult With Us</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:${companyData.contact.phoneCallable}`}
            className="p-2 rounded-xl bg-forest-900 text-white"
            aria-label="Call Now"
          >
            <Phone className="w-4 h-4 text-gold-400" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-stone-700 hover:text-forest-950 hover:bg-ivory-200 transition"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-ivory-50 border-b border-gold-300/40 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition ${
                    isActive
                      ? 'bg-forest-900 text-white font-semibold'
                      : 'text-stone-700 hover:bg-ivory-200'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-stone-400'}`} />
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openEnquiryModal(null);
              }}
              className="w-full py-3 rounded-xl bg-forest-900 text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow"
            >
              <MessageSquareText className="w-4 h-4 text-gold-400" />
              <span>Request Property Consultation</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${companyData.contact.phoneCallable}`}
                className="py-2.5 px-3 rounded-xl bg-white border border-stone-200 text-forest-950 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-gold-600" />
                <span>Call Consultant</span>
              </a>

              <a
                href={companyData.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={companyData.contact.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>@{companyData.contact.instagramUsername}</span>
              </a>

              <a
                href={`mailto:${companyData.contact.email}`}
                className="py-2 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-medium flex items-center justify-center gap-1"
              >
                <Mail className="w-3.5 h-3.5 text-gold-600" />
                <span className="truncate">Email Us</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
