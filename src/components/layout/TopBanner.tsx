import React from 'react';
import { Mail, Phone, Compass, MessageCircle } from 'lucide-react';
import { InstagramIcon } from '../common/InstagramIcon';
import { companyData } from '../../data/company';

export const TopBanner: React.FC = () => {
  return (
    <div className="bg-forest-950 text-ivory-200 border-b border-forest-900/80 text-xs py-2 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-light text-gold-300">
            <Compass className="w-3.5 h-3.5 text-gold-400" />
            <span>Nearly Three Decades of Real Estate Experience Across Kumaon (Est. 1996)</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 text-[11px] sm:text-xs">
          {/* Phone */}
          <a
            href={`tel:${companyData.contact.phoneCallable}`}
            className="flex items-center gap-1 text-ivory-100 hover:text-gold-300 transition-colors font-medium"
            title="Call Lead Consultant"
          >
            <Phone className="w-3 h-3 text-gold-400" />
            <span>{companyData.contact.phoneDisplay}</span>
          </a>

          {/* WhatsApp */}
          <a
            href={companyData.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3 h-3 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          {/* Instagram */}
          <a
            href={companyData.contact.instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-pink-300 hover:text-pink-200 transition-colors font-medium"
            title="Follow on Instagram"
          >
            <InstagramIcon className="w-3 h-3 text-pink-400" />
            <span>@{companyData.contact.instagramUsername}</span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${companyData.contact.email}`}
            className="hidden lg:flex items-center gap-1 text-ivory-100 hover:text-gold-300 transition-colors"
            title="Email PCJ Property Consultants"
          >
            <Mail className="w-3 h-3 text-gold-400" />
            <span>{companyData.contact.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
