
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Plane,
  Train,
  Car,
  ExternalLink,
} from 'lucide-react';

import { supabase } from '../lib/supabase';
import { InteractiveKumaonMap } from '../components/maps/InteractiveKumaonMap';
import { SectionHeading } from '../components/common/SectionHeading';
import { MountainDivider } from '../components/common/MountainDivider';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { useEnquiryModal } from '../context/EnquiryModalContext';

interface DatabaseLocation {
  id: string;
  name: string;
  slug: string;
  district: string | null;
  state: string | null;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  altitude: string | null;
  tagline: string | null;
  latitude: number | null;
  longitude: number | null;
  has_available_properties: boolean | null;
  associated_properties: string[] | null;
  highlights: string[] | null;
}

interface KumaonLocation {
  id: string;
  name: string;
  district: string;
  altitude: string;
  tagline: string;
  description: string;
  image: string;
  hasAvailableProperties: boolean;
  associatedProperties: string[];
  highlights: string[];
}

export const LocationsPage: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  const [locations, setLocations] = useState<KumaonLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching locations:', error);
        setError('Unable to load destinations at the moment. Please try again.');
        setLoading(false);
        return;
      }

      const formattedLocations: KumaonLocation[] = (
        (data || []) as DatabaseLocation[]
      ).map((loc) => ({
        id: loc.id,
        name: loc.name,
        district: loc.district || 'Kumaon',
        altitude: loc.altitude || '',
        tagline: loc.tagline || '',
        description: loc.description || '',
        image: loc.image_url || '/images/kainchi-valley.jpg',
        hasAvailableProperties: loc.has_available_properties ?? false,
        associatedProperties: loc.associated_properties || [],
        highlights: loc.highlights || [],
      }));

      setLocations(formattedLocations);
      setLoading(false);
    };

    fetchLocations();
  }, []);

  const availableLocations = locations.filter(
    (loc) => loc.hasAvailableProperties
  );

  const otherLocations = locations.filter(
    (loc) => !loc.hasAvailableProperties
  );

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO HEADER */}
      <section className="relative bg-forest-950 text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/kainchi-valley.jpg"
            alt="Kumaon Valleys and Mountain Corridors"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/80 to-forest-950/60" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold-400 block mb-2">
            Geographical Expertise & Coverage
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ivory-50 leading-tight">
            Destinations & Regional Reach Across Kumaon
          </h1>
          <MountainDivider light className="my-3" />
          <p className="text-sm sm:text-base text-ivory-200/90 font-light max-w-2xl mx-auto leading-relaxed">
            From the high-altitude snow ridges of Kausani and Mukteshwar to the tranquil lake bowls of Nainital, Bhimtal, and the sub-Himalayan wilderness of Jim Corbett.
          </p>
        </div>
      </section>

      {/* 2. INTERACTIVE REGIONAL MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Interactive Regional Map"
          title="Explore Kumaon's Property Landscape"
          subtitle="Use our interactive map below to discover property locations, view regional coordinates, and launch GPS directions in Google Maps."
        />

        <div className="mt-8">
          <InteractiveKumaonMap />
        </div>
      </section>

      {/* LOCATION DATA LOADING AND ERROR STATES */}
      {loading && (
        <div className="max-w-7xl mx-auto px-4 text-center py-12">
          <p className="text-sm text-stone-500">
            Loading Kumaon destinations...
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="max-w-7xl mx-auto px-4 text-center py-12">
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 rounded-xl bg-forest-900 text-white text-sm font-semibold hover:bg-forest-800 transition"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && locations.length === 0 && (
        <div className="max-w-7xl mx-auto px-4 text-center py-12">
          <p className="text-sm text-stone-500">
            No active destinations are currently available.
          </p>
        </div>
      )}

      {/* 3. PROMINENT DESTINATIONS WITH CURRENTLY AVAILABLE OPPORTUNITIES */}
      {!loading && !error && availableLocations.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-stone-200 pb-4 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-1">
              Active Inventory Focus
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-forest-950">
              Locations with Current Property Opportunities
            </h2>
            <p className="text-sm text-stone-600 font-light mt-1">
              Destinations where PCJ Property Consultants currently represents verified property and land opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {availableLocations.map((loc) => (
              <div
                key={loc.id}
                className="bg-white rounded-3xl overflow-hidden border-2 border-gold-400/40 shadow-luxury flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-forest-950">
                    <img
                      src={loc.image}
                      alt={loc.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-500 text-forest-950 shadow">
                        ⭐ Opportunities Available
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-white text-xs">
                      <span className="font-medium text-gold-300">{loc.district}</span>
                      <span className="text-[11px] bg-black/40 px-2 py-0.5 rounded">{loc.altitude}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-2xl font-bold text-forest-950">
                      {loc.name}
                    </h3>
                    <p className="text-xs text-gold-700 font-semibold tracking-wide uppercase">
                      {loc.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                      {loc.description}
                    </p>

                    {loc.associatedProperties.length > 0 && (
                      <div className="pt-3 border-t border-stone-100">
                        <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
                          Current Offerings in this Area:
                        </span>
                        <ul className="space-y-1">
                          {loc.associatedProperties.map((prop, i) => (
                            <li
                              key={i}
                              className="text-xs font-medium text-forest-900 flex items-center gap-1.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gold-600"></span>
                              <span>{prop}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between gap-3 mt-4">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      loc.name + ', Kumaon, Uttarakhand, India'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-stone-600 hover:text-forest-950 font-medium flex items-center gap-1"
                  >
                    <Compass className="w-3.5 h-3.5 text-gold-600" />
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-stone-400" />
                  </a>

                  <Link
                    to="/properties"
                    className="px-3.5 py-2 rounded-xl bg-forest-900 text-white text-xs font-semibold hover:bg-forest-800 transition shadow"
                  >
                    View Properties
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. BROADER KUMAON OPERATIONAL COVERAGE */}
      {!loading && !error && otherLocations.length > 0 && (
        <section className="bg-ivory-100/60 py-16 border-y border-gold-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-b border-stone-200 pb-4 mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-1">
                Broader Geographical Scope
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-forest-950">
                Other Renowned Kumaon Destinations
              </h2>
              <p className="text-sm text-stone-600 font-light mt-1">
                Locations where PCJ Property Consultants conducts site identification, investor advisory, and bespoke land searches upon request.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherLocations.map((loc) => (
                <div
                  key={loc.id}
                  className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:border-gold-400 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                      <span className="font-medium text-gold-700">{loc.district}</span>
                      <span>{loc.altitude}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-forest-950 mb-1">
                      {loc.name}
                    </h3>
                    <p className="text-xs text-stone-600 font-light leading-relaxed mb-4">
                      {loc.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        loc.name + ', Kumaon, Uttarakhand, India'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-500 hover:text-forest-950 flex items-center gap-1"
                    >
                      <span>Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => openEnquiryModal(null)}
                      className="text-forest-800 font-semibold underline hover:text-forest-950"
                    >
                      Request Sourcing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. REGIONAL CONNECTIVITY & ACCESSIBILITY GUIDE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Access & Transit"
          title="Connecting Kumaon to Delhi NCR & India"
          subtitle="A practical overview of how to reach the prime destinations of Kumaon via air, rail, and highway corridors."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Air Travel */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-ivory-100 flex items-center justify-center text-forest-800 border border-gold-300/40">
              <Plane className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="font-serif text-xl font-bold text-forest-950">
              Air Connectivity: Pantnagar Airport
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              <strong>Pantnagar Airport (PGH):</strong> The primary commercial aviation gateway to Kumaon, offering scheduled direct flights to New Delhi and Dehradun.
            </p>
            <div className="pt-2 text-xs text-stone-500 space-y-1 border-t border-stone-100">
              <p>• Pantnagar to Nainital / Bhimtal: ~2.0 hours (65 km)</p>
              <p>• Pantnagar to Jim Corbett (Ramnagar): ~1.5 hours (80 km)</p>
              <p>• Pantnagar to Ranikhet / Mukteshwar: ~3.0 hours (100 km)</p>
            </div>
          </div>

          {/* Rail Connectivity */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-ivory-100 flex items-center justify-center text-forest-800 border border-gold-300/40">
              <Train className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="font-serif text-xl font-bold text-forest-950">
              Rail Connectivity: Kathgodam & Ramnagar
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              <strong>Kathgodam Railway Station (KGM):</strong> The iconic broad-gauge terminal served by premium express trains including the New Delhi Shatabdi Express and Ranikhet Express.
            </p>
            <div className="pt-2 text-xs text-stone-500 space-y-1 border-t border-stone-100">
              <p>• Kathgodam to Nainital / Bhimtal: ~45–60 mins (34 km)</p>
              <p>• Kathgodam to Mukteshwar / Sheetla: ~2.0 hours (65 km)</p>
              <p>• Ramnagar Railway Station: Direct overnight rail from Delhi</p>
            </div>
          </div>

          {/* Road Corridors */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-ivory-100 flex items-center justify-center text-forest-800 border border-gold-300/40">
              <Car className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="font-serif text-xl font-bold text-forest-950">
              Highway Corridors: NH-9 & Scenic Hill Routes
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Smooth 4-lane highway connectivity from Delhi NCR via NH-9 and Moradabad bypass towards Haldwani, Ramnagar, and all Kumaon arterial hill roads.
            </p>
            <div className="pt-2 text-xs text-stone-500 space-y-1 border-t border-stone-100">
              <p>• Delhi NCR to Haldwani / Corbett: ~4.5 to 5.5 hours drive</p>
              <p>• Delhi NCR to Nainital / Ranikhet: ~6.5 to 7.5 hours drive</p>
              <p>• All-weather widening work progressively expanding routes</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <DisclaimerNotice type="all" />
        </div>
      </section>
    </div>
  );
};
