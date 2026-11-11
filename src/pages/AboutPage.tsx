import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Clock,
  ShieldCheck,
  CheckCircle,
  Building2,
  Users,
  Award,
  ArrowRight,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { companyData } from '../data/company';
import { SectionHeading } from '../components/common/SectionHeading';
import { MountainDivider } from '../components/common/MountainDivider';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { useEnquiryModal } from '../context/EnquiryModalContext';

export const AboutPage: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO HEADER */}
      <section className="relative bg-forest-950 text-white py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="/images/kumaon-peaks-golden-hour.jpg"
            alt="Kumaon Mountain Range"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-forest-950/50" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold-400 block mb-3">
            Company Heritage & Leadership
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-ivory-50 leading-tight">
            Three Decades of Trust, Experience & Excellence in Kumaon Real Estate
          </h1>
          <MountainDivider light className="my-4" />
          <p className="text-base sm:text-lg text-ivory-200/90 font-light max-w-2xl mx-auto leading-relaxed">
            From our founding footsteps in 1996 to the modern consultancy of PCJ Property Consultants today — providing principled, client-focused property advisory across Uttarakhand.
          </p>
        </div>
      </section>

      {/* 2. CHRONOLOGICAL EVOLUTION: 1996 TO PRESENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block">
              Our Journey & Origins
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-forest-950 font-bold leading-tight">
              A Living Legacy Rooted in the Mountains of Kumaon
            </h2>
            <p className="text-stone-700 leading-relaxed font-light text-base sm:text-lg">
              PCJ Property Consultants is a professionally managed real estate consultancy specializing in premium property transactions and investment opportunities across the Kumaon region of Uttarakhand.
            </p>
            <p className="text-stone-600 leading-relaxed text-sm sm:text-base font-light">
              The roots of our consultancy trace back to <strong>1996</strong>, when our founder, <strong>Mr. Prakash Chandra Joshi</strong>, began facilitating property transactions and land advisory individually across Kumaon. Operating earlier under the established identity of <strong>Joshi Properties</strong>, he guided landmark property acquisitions, agricultural land deals, and hospitality site selections throughout the region.
            </p>
            <p className="text-stone-600 leading-relaxed text-sm sm:text-base font-light">
              Approximately three to four years ago, this extensive body of work evolved into its present operating identity — <strong>PCJ Property Consultancy</strong> (PCJ Property Consultants). While the modern identity represents a forward-looking, sophisticated corporate consultancy, it is firmly anchored in nearly three decades of unbroken regional relationships, title expertise, and agrarian revenue understanding.
            </p>

            <div className="p-4 bg-ivory-100 rounded-2xl border border-gold-300/50 text-xs sm:text-sm text-stone-700 space-y-1.5">
              <p className="font-bold text-forest-950">Official Business Distinction:</p>
              <p className="text-stone-600">
                • <strong>1996 – Present:</strong> Nearly 30 years of continuous individual real estate practice and transactions led by Mr. Prakash Chandra Joshi (formerly Joshi Properties).
              </p>
              <p className="text-stone-600">
                • <strong>Current Entity:</strong> PCJ Property Consultancy operating under its current brand identity for approximately 3 to 4 years.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-gold-300/60 shadow-luxury bg-forest-950">
              <img
                src="/images/heritage-cottage.jpg"
                alt="Traditional Kumaon Architecture"
                className="w-full h-[420px] sm:h-[500px] object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-forest-950/90 border border-gold-400/40 backdrop-blur-md text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 block mb-1">
                  Brand Philosophy
                </span>
                <p className="font-serif text-lg sm:text-xl font-bold text-ivory-50 leading-snug">
                  "Every property represents an opportunity, and every client deserves the right guidance."
                </p>
                <p className="text-xs text-ivory-300/80 mt-1 font-light">
                  Built on trust, transparency, professional relationships, and enduring value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DEDICATED FOUNDER PROFILE SECTION */}
      <section className="bg-ivory-100/70 py-16 sm:py-24 border-y border-gold-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Leadership & Insight"
            title="Mr. Prakash Chandra Joshi"
            subtitle="Founder & Lead Real Estate Consultant • PCJ Property Consultants"
          />

          <div className="bg-white rounded-3xl border border-gold-300/60 p-6 sm:p-12 shadow-luxury grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Portrait Card */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-gold-400/60 p-1.5 bg-ivory-50 shadow-xl mb-4">
                <img
                  src="/brand/pcj-logo.jpg"
                  alt="Mr. Prakash Chandra Joshi"
                  className="w-full h-full object-contain rounded-full bg-[#F5EFEB]"
                />
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest-950">
                Mr. Prakash Chandra Joshi
              </h3>
              <p className="text-xs text-gold-700 font-bold uppercase tracking-widest mt-1">
                Founder & Lead Consultant
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Nearly 30 Years Experience in Kumaon
              </p>
              <div className="mt-4 pt-4 border-t border-stone-200 w-full flex justify-center gap-3">
                <button
                  onClick={() => openEnquiryModal(null)}
                  className="px-4 py-2 rounded-xl bg-forest-900 text-white text-xs font-semibold hover:bg-forest-800 transition"
                >
                  Direct Consultation
                </button>
              </div>
            </div>

            {/* Profile Narrative */}
            <div className="lg:col-span-8 space-y-5 text-stone-700">
              <div className="border-b border-stone-100 pb-4">
                <h4 className="font-serif text-2xl font-bold text-forest-950">
                  Leading Real Estate Consultancy Across the Kumaon Hills
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Extensive local knowledge, professional insight, and trusted regional relationships.
                </p>
              </div>

              <blockquote className="font-serif text-lg text-forest-900 italic border-l-4 border-gold-500 pl-4 py-1 leading-relaxed">
                "With nearly 30 years of experience in the Kumaon real estate market, Mr. Prakash Chandra Joshi leads PCJ Property Consultants with extensive local knowledge, professional insight, and a strong network of industry relationships."
              </blockquote>

              <p className="text-sm sm:text-base leading-relaxed font-light text-stone-600">
                His experience, deep understanding of the regional market, and long-standing professional relationships have contributed directly to the company’s reputation in property consultancy and real estate transactions. His vision is to connect genuine buyers with the right properties while helping investors identify promising opportunities across Kumaon.
              </p>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2.5">
                  Areas of Direct Involvement & Facilitation:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-stone-700">
                  {companyData.founder.coreCompetencies.map((comp, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-ivory-50 p-2.5 rounded-xl border border-stone-200">
                      <CheckCircle className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPANY PHILOSOPHY & ETHICAL COMMITMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Guiding Code"
          title="Built on Trust, Transparency & Enduring Relationships"
          subtitle="Real estate in the Himalayas is not simply a business transaction; it is a sacred covenant with the land and people of Kumaon."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-ivory-100 flex items-center justify-center text-forest-800 mb-5">
                <ShieldCheck className="w-6 h-6 text-gold-600" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest-950 mb-2">
                100% Genuine Guidance
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                We believe in providing factually accurate, unvarnished property data. We never exaggerate title status, road access, or terrain slope, ensuring buyers invest with complete confidence.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-ivory-100 flex items-center justify-center text-forest-800 mb-5">
                <Users className="w-6 h-6 text-gold-600" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest-950 mb-2">
                Direct Buyer-Seller Coordination
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                Connecting genuine buyers directly with legitimate property owners. Facilitating transparent dialogues, fair negotiations, and mutual respect between all parties involved.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-ivory-100 flex items-center justify-center text-forest-800 mb-5">
                <Compass className="w-6 h-6 text-gold-600" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest-950 mb-2">
                Deep Regional Roots
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                Our consultancy is permanently rooted in Kumaon. We understand local customs, village land governance, ecological boundaries, and sustainable mountain stewardship.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer box */}
        <div className="mt-12">
          <DisclaimerNotice type="all" />
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-forest-950 text-white rounded-3xl p-8 sm:p-12 border border-gold-400/40 shadow-xl space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Connect With Mr. Prakash Chandra Joshi
          </h3>
          <p className="text-xs sm:text-sm text-ivory-200 font-light max-w-xl mx-auto">
            Schedule an in-depth conversation regarding land opportunities, site visits, or representation of your property in Kumaon.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => openEnquiryModal(null)}
              className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-semibold text-xs uppercase tracking-wider transition"
            >
              Request Consultation
            </button>
            <a
              href={`tel:${companyData.contact.phoneCallable}`}
              className="px-5 py-3 rounded-xl bg-forest-900 border border-gold-400/30 text-white font-medium text-xs transition hover:bg-forest-800"
            >
              Call: {companyData.contact.phoneDisplay}
            </a>
            <a
              href={companyData.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-700 text-white font-medium text-xs transition hover:bg-emerald-600"
            >
              WhatsApp
            </a>
            <a
              href={companyData.contact.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-pink-700/80 text-white font-medium text-xs transition hover:bg-pink-700"
            >
              Instagram
            </a>
            <a
              href={`mailto:${companyData.contact.email}`}
              className="px-5 py-3 rounded-xl bg-forest-900 border border-gold-400/30 text-white font-medium text-xs transition"
            >
              Email: {companyData.contact.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
