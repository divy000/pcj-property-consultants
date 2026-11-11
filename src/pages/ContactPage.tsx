import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Compass,
  MessageSquareText,
  Building,
  ShieldCheck,
  Send,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { InstagramIcon } from '../components/common/InstagramIcon';
import { companyData } from '../data/company';
import { SectionHeading } from '../components/common/SectionHeading';
import { MountainDivider } from '../components/common/MountainDivider';
import { GeneralEnquiryForm } from '../components/forms/GeneralEnquiryForm';
import { SellPropertyForm } from '../components/forms/SellPropertyForm';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';

export const ContactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'sell'>('general');

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO HEADER */}
      <section className="relative bg-forest-950 text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/kumaon-peaks-golden-hour.jpg"
            alt="Himalayan Mountain Peaks"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/80 to-forest-950/60" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold-400 block mb-2">
            Direct Communication & Advisory
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ivory-50 leading-tight">
            Contact & Consultation
          </h1>
          <MountainDivider light className="my-3" />
          <p className="text-sm sm:text-base text-ivory-200/90 font-light max-w-2xl mx-auto leading-relaxed">
            Connect directly with founder and lead real estate consultant Mr. Prakash Chandra Joshi via phone, WhatsApp, Instagram, or email for verified property inquiries and site inspections across Kumaon.
          </p>
        </div>
      </section>

      {/* 2. CONTACT DETAILS & FORMS CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Official Contact Card (Col 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-luxury space-y-6">
              <div className="border-b border-stone-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-1">
                  Official Business Identity
                </span>
                <h3 className="font-serif text-2xl font-bold text-forest-950">
                  {companyData.name}
                </h3>
                <p className="text-xs text-stone-500 font-light mt-0.5">
                  Premium Real Estate Consultancy | Kumaon, Uttarakhand
                </p>
              </div>

              {/* Direct Phone Number */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-ivory-100 flex items-center justify-center text-forest-800 shrink-0 border border-gold-300/40">
                  <Phone className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    Direct Contact Number
                  </span>
                  <a
                    href={`tel:${companyData.contact.phoneCallable}`}
                    className="font-serif text-lg sm:text-xl font-bold text-forest-950 hover:text-gold-700 transition"
                  >
                    {companyData.contact.phoneDisplay}
                  </a>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Speak directly with lead consultant Mr. Prakash Chandra Joshi.
                  </p>
                </div>
              </div>

              {/* WhatsApp Consultation */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0 border border-emerald-200">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    Instant WhatsApp Enquiry
                  </span>
                  <a
                    href={companyData.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-base sm:text-lg font-bold text-emerald-800 hover:text-emerald-950 transition flex items-center gap-1.5"
                  >
                    <span>{companyData.contact.whatsappNumber}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                  </a>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Fast response for land queries, brochures, and site visit schedules.
                  </p>
                </div>
              </div>

              {/* Official Instagram */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-pink-50 flex items-center justify-center text-pink-700 shrink-0 border border-pink-200">
                  <InstagramIcon className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    Official Instagram Page
                  </span>
                  <a
                    href={companyData.contact.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-base sm:text-lg font-bold text-pink-800 hover:text-pink-950 transition flex items-center gap-1.5"
                  >
                    <span>@{companyData.contact.instagramUsername}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-pink-600" />
                  </a>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Follow regional highlights, mountain property reels, and video tours.
                  </p>
                </div>
              </div>

              {/* Official Email */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-ivory-100 flex items-center justify-center text-forest-800 shrink-0 border border-gold-300/40">
                  <Mail className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    Official Business Email
                  </span>
                  <a
                    href={`mailto:${companyData.contact.email}`}
                    className="font-serif text-base sm:text-lg font-bold text-forest-950 hover:text-gold-700 transition underline break-all"
                  >
                    {companyData.contact.email}
                  </a>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Formal documentation, land records, and institutional proposals.
                  </p>
                </div>
              </div>

              {/* Founder Leadership */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-ivory-100 flex items-center justify-center text-forest-800 shrink-0 border border-gold-300/40">
                  <Compass className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    Founder & Lead Consultant
                  </span>
                  <p className="font-serif text-base sm:text-lg font-bold text-forest-950">
                    {companyData.founder.name}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Nearly 30 years experience (since 1996) in Kumaon real estate.
                  </p>
                </div>
              </div>

              {/* Region & In-Person Appointments */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-ivory-100 flex items-center justify-center text-forest-800 shrink-0 border border-gold-300/40">
                  <MapPin className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    Operating Region & Consultations
                  </span>
                  <p className="font-serif text-base sm:text-lg font-bold text-forest-950">
                    Kumaon, Uttarakhand, India
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    In-person consultations, property visits, and boundary inspections scheduled by appointment across Kumaon.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Factual Notice */}
            <DisclaimerNotice type="all" />
          </div>

          {/* Right Column: Interactive Consultation Forms (Col 6-12) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Form Mode Selector Tabs */}
            <div className="flex rounded-2xl bg-ivory-200/80 p-1.5 border border-stone-300">
              <button
                onClick={() => setActiveTab('general')}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 ${
                  activeTab === 'general'
                    ? 'bg-forest-900 text-white shadow-md'
                    : 'text-stone-700 hover:text-forest-950'
                }`}
              >
                <MessageSquareText className="w-4 h-4" />
                <span>General Consultation / Buy</span>
              </button>
              <button
                onClick={() => setActiveTab('sell')}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 ${
                  activeTab === 'sell'
                    ? 'bg-forest-900 text-white shadow-md'
                    : 'text-stone-700 hover:text-forest-950'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>Sell Your Property</span>
              </button>
            </div>

            {/* Tab 1: General Enquiry Form */}
            {activeTab === 'general' && <GeneralEnquiryForm />}

            {/* Tab 2: Sell Your Property Form */}
            {activeTab === 'sell' && <SellPropertyForm />}
          </div>
        </div>
      </div>
    </div>
  );
};
