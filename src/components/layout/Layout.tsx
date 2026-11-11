import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TopBanner } from './TopBanner';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PropertyEnquiryModal } from '../modals/PropertyEnquiryModal';
import { PropertyDetailModal } from '../modals/PropertyDetailModal';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-ivory-50 text-stone-900 selection:bg-gold-500 selection:text-white">
      <TopBanner />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <PropertyEnquiryModal />
      <PropertyDetailModal />
    </div>
  );
};
