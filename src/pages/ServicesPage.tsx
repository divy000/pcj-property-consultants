import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Trees,
  Hotel,
  Home,
  Compass,
  Sparkles,
  ShieldCheck,
  Landmark,
  CheckCircle,
  ArrowRight,
  MessageSquareText,
  Info,
} from 'lucide-react';
import { servicesData } from '../data/services';
import { SectionHeading } from '../components/common/SectionHeading';
import { MountainDivider } from '../components/common/MountainDivider';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { useEnquiryModal } from '../context/EnquiryModalContext';
import { companyData } from '../data/company';

export const ServicesPage: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-6 h-6 text-gold-600" />;
      case 'Trees':
        return <Trees className="w-6 h-6 text-gold-600" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-gold-600" />;
      case 'Hotel':
        return <Hotel className="w-6 h-6 text-gold-600" />;
      case 'Landmark':
        return <Landmark className="w-6 h-6 text-gold-600" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-gold-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-gold-600" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-gold-600" />;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO HEADER */}
      <section className="relative bg-forest-950 text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/luxury-resort.jpg"
            alt="PCJ Property Services"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/80 to-forest-950/60" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold-400 block mb-2">
            Consultancy Scope & Expertise
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ivory-50 leading-tight">
            Comprehensive Real Estate Services Across Kumaon
          </h1>
          <MountainDivider light className="my-3" />
          <p className="text-sm sm:text-base text-ivory-200/90 font-light max-w-2xl mx-auto leading-relaxed">
            Specialized property consultancy, strategic site identification, land transactions, and end-to-end guidance for buyers, sellers, and institutional developers.
          </p>
        </div>
      </section>

      {/* 2. SERVICES LIST */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {servicesData.map((svc, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <div
              key={svc.id}
              id={svc.id}
              className={`bg-white rounded-3xl border border-stone-200/90 shadow-luxury overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image side */}
              <div className={`lg:col-span-5 h-72 sm:h-96 lg:h-full relative overflow-hidden bg-forest-950 ${isEven ? 'lg:order-2' : ''}`}>
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
                <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest bg-forest-950/90 text-gold-300 px-3 py-1 rounded-full border border-gold-400/50">
                  Service {svc.number}
                </span>
                <span className="absolute bottom-4 left-4 text-[10px] bg-black/50 text-ivory-200 px-2 py-0.5 rounded">
                  Regional Landscape Illustration
                </span>
              </div>

              {/* Text side */}
              <div className={`lg:col-span-7 p-6 sm:p-10 space-y-6 ${isEven ? 'lg:order-1' : ''}`}>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-ivory-100 flex items-center justify-center border border-gold-300/40">
                      {getServiceIcon(svc.iconName)}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
                      PCJ Specialty Practice
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
                    {svc.title}
                  </h2>
                </div>

                <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-light">
                  {svc.fullDescription}
                </p>

                {/* Scope & Assistance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-ivory-50 p-4 rounded-xl border border-stone-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-forest-950 mb-2">
                      Property Types Included:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-stone-600">
                      {svc.propertyScope.slice(0, 4).map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-ivory-50 p-4 rounded-xl border border-stone-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-forest-950 mb-2">
                      Our Advisory Assistance:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-stone-600">
                      {svc.keyAssistance.slice(0, 4).map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-forest-700 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={() => openEnquiryModal(null)}
                    className="px-6 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs uppercase tracking-wider font-semibold shadow transition flex items-center gap-2"
                  >
                    <MessageSquareText className="w-3.5 h-3.5 text-gold-400" />
                    <span>Enquire About {svc.title}</span>
                  </button>
                  <Link
                    to="/properties"
                    className="text-xs font-semibold text-forest-800 hover:text-forest-950 underline"
                  >
                    View Available Properties
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Strict Scope Disclaimer */}
        <DisclaimerNotice type="all" />
      </div>
    </div>
  );
};
