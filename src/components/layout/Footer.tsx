import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Compass, ShieldCheck, MessageCircle, ExternalLink } from 'lucide-react';
import { InstagramIcon } from '../common/InstagramIcon';
import { companyData } from '../../data/company';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-950 text-ivory-100 pt-16 pb-12 border-t-2 border-gold-500/40 relative overflow-hidden">
      {/* Background Mountain Glow Pattern */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-forest-900/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-forest-800/80">
          {/* Brand Column (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-gold-400 bg-[#F5EFEB] p-1 shadow-md">
                <img
                  src="/brand/pcj-logo.jpg"
                  alt="PCJ Property Consultants"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                  PCJ PROPERTY CONSULTANTS
                </h3>
                <p className="text-[10px] tracking-widest uppercase text-gold-400 font-semibold">
                  Premium Real Estate Consultancy
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-ivory-200/90 leading-relaxed font-light">
              Nearly three decades of real estate experience across the Kumaon hills of Uttarakhand. Originating in 1996 under the leadership of Mr. Prakash Chandra Joshi, previously operating as Joshi Properties, and continuing today under PCJ Property Consultancy.
            </p>

            <div className="pt-2 text-xs space-y-2 text-ivory-300">
              <p className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-gold-400" />
                <span>Founder: <strong>Mr. Prakash Chandra Joshi</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400" />
                <span>
                  Direct Call:{' '}
                  <a href={`tel:${companyData.contact.phoneCallable}`} className="text-gold-300 underline font-semibold">
                    {companyData.contact.phoneDisplay}
                  </a>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>
                  WhatsApp:{' '}
                  <a
                    href={companyData.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 underline font-semibold"
                  >
                    {companyData.contact.whatsappNumber}
                  </a>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-pink-400" />
                <span>
                  Instagram:{' '}
                  <a
                    href={companyData.contact.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-300 underline font-semibold"
                  >
                    @{companyData.contact.instagramUsername}
                  </a>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400" />
                <span>
                  Email:{' '}
                  <a
                    href={`mailto:${companyData.contact.email}`}
                    className="text-gold-300 underline hover:text-white transition"
                  >
                    {companyData.contact.email}
                  </a>
                </span>
              </p>
            </div>
          </div>

          {/* Quick Navigation Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-ivory-200/80">
              <li>
                <Link to="/" className="hover:text-gold-300 transition">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-300 transition">
                  About PCJ & History
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-gold-300 transition">
                  Available Properties (9)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-300 transition">
                  Our 8 Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-gold-300 transition">
                  Legacy & Track Record
                </Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-gold-300 transition">
                  Kumaon Locations Map
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-300 transition">
                  Contact & Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Services (Col 7-9) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Consultancy Scope
            </h4>
            <ul className="space-y-1.5 text-xs text-ivory-200/80">
              <li>• Luxury Mountain Villas & Cottages</li>
              <li>• Agricultural Land & Hill Orchards</li>
              <li>• Commercial Plots & Development Sites</li>
              <li>• Resorts & Hospitality Land Acquisitions</li>
              <li>• Group Housing & Plotting Projects</li>
              <li>• Large Land Parcels (Nali & Bigha)</li>
              <li>• Tourism & Wellness Investments</li>
              <li>• Strategic Investment Advisory</li>
            </ul>
            <p className="text-[11px] text-gold-300/80 italic pt-1">
              * Exclusively dealing in buying & selling. No rental or leasing services.
            </p>
          </div>

          {/* Key Locations Covered (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Kumaon Coverage
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {[
                'Nainital',
                'Ranikhet',
                'Kausani',
                'Mukteshwar',
                'Sheetla',
                'Machkhali',
                'Kainchi Dham',
                'Jim Corbett',
                'Marchula',
                'Barah Patthar',
                'Bhimtal',
                'Ramgarh',
                'Naukuchiatal',
                'Almora',
                'Haldwani',
              ].map((loc) => (
                <span
                  key={loc}
                  className="px-2 py-0.5 rounded bg-forest-900 border border-forest-800 text-ivory-200"
                >
                  {loc}
                </span>
              ))}
            </div>
            <div className="pt-2 text-xs text-ivory-300/90 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <span>Direct personal representation by consultant Mr. Prakash Chandra Joshi.</span>
            </div>
          </div>
        </div>

        {/* Legal & Compliance Disclaimers */}
        <div className="py-6 border-b border-forest-900/60 text-[11px] text-ivory-300/70 space-y-2 leading-relaxed">
          <p>
            <strong className="text-gold-400">Factual Accuracy Notice:</strong>{' '}
            {companyData.disclaimers.propertyConfirmation}{' '}
            {companyData.disclaimers.illustrativeImagery}{' '}
            {companyData.disclaimers.approximateLocations}
          </p>
          <p>
            <strong className="text-gold-400">Notice on Scope of Work:</strong>{' '}
            {companyData.disclaimers.noRentalServices}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory-300/60 gap-3">
          <p>
            © {new Date().getFullYear()} PCJ Property Consultants. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={companyData.contact.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 transition flex items-center gap-1"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>@{companyData.contact.instagramUsername}</span>
            </a>
            <span>•</span>
            <a
              href={`tel:${companyData.contact.phoneCallable}`}
              className="hover:text-gold-400 transition"
            >
              {companyData.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
