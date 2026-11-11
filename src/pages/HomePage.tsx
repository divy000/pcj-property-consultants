import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Building2,
  Trees,
  Hotel,
  Clock,
  MapPin,
  CheckCircle,
  MessageSquareText,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { companyData } from '../data/company';
import { propertiesData } from '../data/properties';
import { servicesData } from '../data/services';
import { projectsData } from '../data/projects';
import { kumaonLocationsData } from '../data/locations';
import { SectionHeading } from '../components/common/SectionHeading';
import { PropertyCard } from '../components/common/PropertyCard';
import { MountainDivider } from '../components/common/MountainDivider';
import { LandMeasurementGuide } from '../components/common/LandMeasurementGuide';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { InteractiveKumaonMap } from '../components/maps/InteractiveKumaonMap';
import { useEnquiryModal } from '../context/EnquiryModalContext';

export const HomePage: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  const featuredProperties = propertiesData.slice(0, 6);
  const featuredProjects = projectsData.slice(0, 4);
  const prominentDestinations = kumaonLocationsData.filter((loc) => loc.hasAvailableProperties);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-forest-950">
        {/* Background Image with Authentic Kumaon Peak Alpenglow */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/kumaon-peaks-golden-hour.jpg"
            alt="Himalayan Mountain Peaks Kumaon Uttarakhand"
            className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms] opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-forest-950/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-forest-950/50 to-forest-950/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-28">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900/80 border border-gold-400/50 text-gold-300 text-xs sm:text-sm font-medium tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping"></span>
            <span>Nearly Three Decades of Real Estate Experience Across Kumaon</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white font-normal tracking-tight leading-[1.1] mb-6 drop-shadow-md">
            Exceptional Properties. <br />
            <span className="italic font-light gold-gradient-text">
              Extraordinary Himalayan Living.
            </span>
          </h1>

          <MountainDivider light className="my-4" />

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-ivory-100 font-light max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow">
            Discover verified land, heritage properties, luxury residences, and hospitality investment opportunities across the beautiful Kumaon region of Uttarakhand.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/properties"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-semibold text-sm tracking-wider uppercase transition-all shadow-lg hover:shadow-gold-glow flex items-center justify-center gap-2"
            >
              <span>Explore Available Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => openEnquiryModal(null)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-forest-900/80 hover:bg-forest-900 text-white font-medium text-sm tracking-wider uppercase transition-all border border-gold-400/40 backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <MessageSquareText className="w-4 h-4 text-gold-400" />
              <span>Consult With Us</span>
            </button>

            <Link
              to="/contact"
              className="w-full sm:w-auto px-6 py-4 rounded-xl text-ivory-200 hover:text-white font-medium text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-1.5"
            >
              <span>Sell With PCJ</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="mt-14 pt-8 border-t border-forest-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="text-center sm:text-left">
              <span className="block text-xl sm:text-2xl font-serif font-bold text-gold-400">1996</span>
              <span className="text-[11px] sm:text-xs text-ivory-300">Foundation of Experience</span>
            </div>
            <div className="text-center sm:text-left">
              <span className="block text-xl sm:text-2xl font-serif font-bold text-gold-400">9 Active</span>
              <span className="text-[11px] sm:text-xs text-ivory-300">Verified Opportunities</span>
            </div>
            <div className="text-center sm:text-left">
              <span className="block text-xl sm:text-2xl font-serif font-bold text-gold-400">14+ Hubs</span>
              <span className="text-[11px] sm:text-xs text-ivory-300">Kumaon Coverage</span>
            </div>
            <div className="text-center sm:text-left">
              <span className="block text-xl sm:text-2xl font-serif font-bold text-gold-400">100% Direct</span>
              <span className="text-[11px] sm:text-xs text-ivory-300">Consultancy & Advisory</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOUNDER & COMPANY INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-gold-300/60 shadow-luxury bg-forest-950 p-2">
              <img
                src="/images/luxury-villa.jpg"
                alt="PCJ Property Consultants Himalayan Experience"
                className="w-full h-[400px] sm:h-[480px] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent rounded-2xl pointer-events-none" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-forest-950/90 border border-gold-400/50 backdrop-blur-md text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 block">
                  Lead Consultant & Founder
                </span>
                <p className="font-serif text-lg sm:text-xl font-bold text-ivory-50">
                  {companyData.founder.name}
                </p>
                <p className="text-xs text-ivory-200 font-light mt-0.5">
                  Nearly 30 years guiding land transactions and property advisory in Kumaon.
                </p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <SectionHeading
              eyebrow="Three Decades of Trust & Excellence"
              title="A Deep-Rooted Understanding of Kumaon Real Estate"
              subtitle="From the early foundation in 1996 through Joshi Properties, to PCJ Property Consultancy today."
              align="left"
              className="mb-6"
            />

            <p className="text-stone-700 leading-relaxed font-light text-base sm:text-lg">
              {companyData.founder.bio}
            </p>

            {/* Core Competencies Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Land transactions & strategic site identification',
                'Agricultural land and orchard facilitation',
                'Resort and hospitality project land',
                'Residential plotting and layout guidance',
                'Clear-title revenue record scrutiny',
                'Direct buyer-seller coordination',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                  <CheckCircle className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="px-6 py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs uppercase tracking-widest font-semibold transition shadow flex items-center gap-2"
              >
                <span>Read Full Company Story</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </Link>

              <button
                onClick={() => openEnquiryModal(null)}
                className="px-6 py-3 rounded-xl bg-ivory-100 hover:bg-ivory-200 border border-stone-300 text-forest-950 text-xs uppercase tracking-widest font-semibold transition"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AVAILABLE PROPERTIES SECTION (THE 9 ACTUAL OPPORTUNITIES) */}
      <section className="bg-ivory-100/60 py-16 sm:py-24 border-y border-gold-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Verified Opportunities"
            title="Available Properties & Investment Opportunities"
            subtitle="Explore the nine property and land opportunities currently offered across Sheetla, Machkhali, Kausani, Kainchi Dham, Nainital, Ranikhet, Barah Patthar, Gadhgarh, and Jim Corbett."
          />

          {/* Informational Mountain Land Measurement Explainer */}
          <div className="mb-10 max-w-4xl mx-auto">
            <LandMeasurementGuide />
          </div>

          {/* Property Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* View All Properties CTA */}
          <div className="mt-12 text-center">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-sm uppercase tracking-wider transition shadow-md hover:shadow-gold-glow"
            >
              <span>View All 9 Property Opportunities</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </Link>
            <p className="text-xs text-stone-500 mt-3 italic">
              {companyData.disclaimers.propertyConfirmation}
            </p>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE GEOGRAPHICAL MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Geographical Expertise"
          title="Explore Kumaon's Property Landscape on the Map"
          subtitle="Navigate through the actual property locations and renowned destinations across the Kumaon hills of Uttarakhand."
        />

        <div className="mt-8">
          <InteractiveKumaonMap />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <span>
            Click any pin above to inspect locality details, view land specifications, or open in Google Maps.
          </span>
          <Link
            to="/locations"
            className="text-forest-800 font-semibold hover:text-forest-950 underline flex items-center gap-1 shrink-0"
          >
            <span>Explore All 14+ Kumaon Destinations & Connectivity</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 5. EIGHT CORE BUSINESS SERVICES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Consultancy Capabilities"
          title="Comprehensive Real Estate Solutions"
          subtitle="Specializing exclusively in buying and selling properties across eight established categories."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((svc) => (
            <div
              key={svc.id}
              className="group bg-white rounded-2xl p-6 border border-stone-200/80 hover:border-gold-400 transition-all duration-300 shadow-sm hover:shadow-luxury flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-lg font-bold text-gold-600">
                  {svc.number}
                </span>
                <span className="w-8 h-8 rounded-full bg-ivory-100 flex items-center justify-center text-forest-800 group-hover:bg-forest-900 group-hover:text-gold-300 transition-colors">
                  <Building2 className="w-4 h-4" />
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-forest-950 mb-2 group-hover:text-forest-800 transition-colors">
                {svc.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed mb-4 flex-grow">
                {svc.shortDescription}
              </p>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-forest-800 group-hover:text-forest-950">
                <Link to="/services" className="flex items-center gap-1 hover:underline">
                  <span>Explore Details</span>
                  <ArrowRight className="w-3 h-3 text-gold-600" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-stone-500 italic">
            * Please note: PCJ Property Consultants exclusively deals in buying and selling properties. We do not advertise rental or leasing services.
          </p>
        </div>
      </section>

      {/* 6. OUR LEGACY & TRACK RECORD (PROJECT HIGHLIGHTS) */}
      <section className="bg-forest-950 text-white py-16 sm:py-24 border-y-2 border-gold-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Legacy & Track Record"
            title="Decades of Experience. Landmark Transactions. Lasting Relationships."
            subtitle="A selection of landmark hospitality, agricultural, plotting, and institutional transactions carried out under the leadership of Mr. Prakash Chandra Joshi."
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {featuredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-forest-900/80 rounded-2xl overflow-hidden border border-gold-400/30 flex flex-col"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-forest-950/80 text-gold-300 px-2 py-0.5 rounded border border-gold-400/40">
                    {proj.yearOrPeriod}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-serif text-lg font-bold text-white mb-1">
                    {proj.name}
                  </h3>
                  <p className="text-xs text-gold-400 flex items-center gap-1 mb-3">
                    <MapPin className="w-3 h-3" />
                    {proj.location}
                  </p>
                  <p className="text-xs text-ivory-200/90 leading-relaxed font-light mb-4 flex-grow">
                    {proj.roleDescription}
                  </p>
                  <div className="pt-3 border-t border-forest-800 text-[11px] text-ivory-300/80">
                    <strong>Role:</strong> {proj.roleType}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-semibold text-xs uppercase tracking-widest transition shadow-lg"
            >
              <span>Explore All 9 Historical Projects & Transactions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE PCJ PROPERTY CONSULTANTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The PCJ Advantage"
          title="Experience That Builds Confidence. Relationships That Create Opportunities."
          subtitle="What makes PCJ Property Consultants a trusted name in the Kumaon real estate landscape?"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyData.strengths.map((str, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-gold-400/60 transition shadow-sm hover:shadow-luxury"
            >
              <div className="w-10 h-10 rounded-xl bg-ivory-100 flex items-center justify-center text-forest-800 mb-4 border border-gold-300/30">
                <Sparkles className="w-5 h-5 text-gold-600" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest-950 mb-2">
                {str.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                {str.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. VISION & MISSION */}
      <section className="bg-ivory-100/70 py-16 border-y border-gold-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Vision */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gold-300/60 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-2">
                  Our Guiding Vision
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 mb-4">
                  Establishing Benchmark Trust in Kumaon Real Estate
                </h3>
                <blockquote className="font-serif text-lg sm:text-xl text-stone-700 italic border-l-4 border-gold-500 pl-4 my-4 leading-relaxed">
                  "{companyData.vision}"
                </blockquote>
              </div>
              <p className="text-xs text-stone-500 mt-4">
                Committed to quality property alignment and lasting investor confidence.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gold-300/60 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-2">
                  Our Mission
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 mb-4">
                  Principles That Guide Every Transaction
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                  {companyData.mission.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-xs text-stone-500 mt-4">
                Transparency, integrity, and professionalism in every transaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. LEAD CAPTURE & CONSULTATION CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative rounded-3xl overflow-hidden bg-forest-950 p-8 sm:p-14 text-white border-2 border-gold-400/40 shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block mb-2">
              Begin Your Mountain Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Looking for the Right Property in Kumaon?
            </h2>
            <p className="text-sm sm:text-base text-ivory-200/90 leading-relaxed font-light mb-8">
              Whether you are looking for a luxury mountain villa, agricultural land, a commercial property, a running resort, or a large-scale investment opportunity, PCJ Property Consultants is here to assist you.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => openEnquiryModal(null)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-semibold text-xs sm:text-sm uppercase tracking-wider transition shadow-lg"
              >
                Schedule Consultation
              </button>
              <a
                href={`tel:${companyData.contact.phoneCallable}`}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-forest-900 border border-gold-400/40 text-white font-medium text-xs sm:text-sm transition text-center hover:bg-forest-800 flex items-center justify-center gap-2"
              >
                <span>Call: {companyData.contact.phoneDisplay}</span>
              </a>
              <a
                href={companyData.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-xs sm:text-sm transition text-center flex items-center justify-center gap-1.5"
              >
                <span>WhatsApp</span>
              </a>
              <a
                href={companyData.contact.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-pink-700/80 hover:bg-pink-700 text-white font-medium text-xs sm:text-sm transition text-center flex items-center justify-center gap-1.5"
              >
                <span>@{companyData.contact.instagramUsername}</span>
              </a>
            </div>
          </div>

          {/* Decorative mountain background watermark */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 pointer-events-none flex items-center justify-center">
            <img
              src="/brand/pcj-logo.jpg"
              alt="PCJ Watermark"
              className="w-96 h-96 object-contain filter invert"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
