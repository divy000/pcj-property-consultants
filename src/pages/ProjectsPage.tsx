
import React, { useEffect, useState } from 'react';
import {
  MapPin,
  ShieldCheck,
  Compass,
  ExternalLink,
  MessageSquareText,
} from 'lucide-react';

import { supabase } from '../lib/supabase';
import { ProjectTrackRecord } from '../types';
import { MountainDivider } from '../components/common/MountainDivider';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { useEnquiryModal } from '../context/EnquiryModalContext';

interface SupabaseProject {
  id: string;
  title: string | null;
  slug: string | null;
  description: string | null;
  location: string | null;
  city: string | null;
  state: string | null;
  images: string[] | null;
  status: string | null;
  is_published: boolean | null;
  year_or_period: string | null;
  role_type: string | null;
  role_description: string | null;
  significance: string | null;
  current_status_note: string | null;
  latitude: number | null;
  longitude: number | null;
  google_maps_query: string | null;
}

type DisplayProject = ProjectTrackRecord & {
  coordinates?: {
    lat: number;
    lng: number;
  };
  googleMapsQuery?: string;
};

const allowedRoleTypes = [
  'Land Identification & Acquisition',
  'Land-Related Work',
  'Land Deal',
  'Plotting & Land Work',
  'Development',
  'Land Sourcing',
] as const;

const getValidRoleType = (
  roleType: string | null
): DisplayProject['roleType'] => {
  if (
    roleType &&
    (allowedRoleTypes as readonly string[]).includes(roleType)
  ) {
    return roleType as DisplayProject['roleType'];
  }

  return 'Land-Related Work';
};

const convertProject = (item: SupabaseProject): DisplayProject => {
  return {
    id: item.id,

    name: item.title || 'Untitled Project',

    location:
      item.location ||
      item.city ||
      'Kumaon, Uttarakhand',

    yearOrPeriod:
      item.year_or_period || 'Historical Project',

    roleType: getValidRoleType(item.role_type),

    roleDescription:
      item.role_description ||
      'Contact PCJ Property Consultants for more information.',

    significance:
      item.significance ||
      item.description ||
      '',

    currentStatusNote:
      item.current_status_note || undefined,

    image:
      item.images?.[0] ||
      '/images/mountain-land.jpg',

    coordinates: {
      lat: item.latitude ?? 0,
      lng: item.longitude ?? 0,
    },

    googleMapsQuery:
      item.google_maps_query ||
      [
        item.location,
        item.city,
        item.state,
      ].filter(Boolean).join(', '),
  };
};

export const ProjectsPage: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  const [projects, setProjects] = useState<DisplayProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError('');

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching projects:', error);

        setError(
          'We could not load projects right now. Please try again later.'
        );

        setProjects([]);
        setLoading(false);
        return;
      }

      const convertedProjects = (
        (data || []) as SupabaseProject[]
      ).map(convertProject);

      setProjects(convertedProjects);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const handleOpenGoogleMaps = (query: string) => {
    const encoded = encodeURIComponent(query);

    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encoded}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const renderProjectCard = (
    proj: DisplayProject,
    mobile = false
  ) => {
    if (mobile) {
      return (
        <div
          key={proj.id}
          className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm p-4 space-y-3"
        >
          <div className="h-48 rounded-xl overflow-hidden relative bg-forest-950">
            <img
              src={proj.image}
              alt={proj.name}
              className="w-full h-full object-cover"
            />

            <span className="absolute top-2.5 left-2.5 text-[10px] font-bold uppercase bg-forest-950/80 text-gold-300 px-2 py-0.5 rounded border border-gold-400">
              {proj.yearOrPeriod}
            </span>
          </div>

          <span className="inline-block text-[10px] font-bold uppercase text-gold-700 bg-gold-50 px-2 py-0.5 rounded">
            {proj.roleType}
          </span>

          <h3 className="font-serif text-xl font-bold text-forest-950">
            {proj.name}
          </h3>

          <p className="text-xs text-stone-500 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-gold-600" />
            {proj.location}
          </p>

          <p className="text-xs text-stone-700 font-medium">
            {proj.roleDescription}
          </p>

          <p className="text-xs text-stone-600 font-light">
            {proj.significance}
          </p>

          {proj.currentStatusNote && (
            <p className="text-xs text-emerald-800 font-medium bg-emerald-50 p-2 rounded">
              {proj.currentStatusNote}
            </p>
          )}

          <div className="pt-2 flex items-center justify-between gap-2">
            <button
              onClick={() =>
                handleOpenGoogleMaps(
                  proj.googleMapsQuery || proj.location
                )
              }
              className="text-xs text-forest-800 underline font-medium flex items-center gap-1"
            >
              <Compass className="w-3 h-3" />
              <span>Google Maps ↗</span>
            </button>

            <button
              onClick={() => openEnquiryModal(null)}
              className="px-3 py-1 rounded bg-forest-900 text-white text-xs font-semibold"
            >
              Enquire
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        key={proj.id}
        className="relative pl-16 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm hover:shadow-luxury transition-all"
      >
        {/* Timeline Node */}
        <div className="absolute left-6 -translate-x-1/2 top-8 w-6 h-6 rounded-full bg-forest-950 border-2 border-gold-400 flex items-center justify-center text-gold-400 shadow">
          <span className="w-2 h-2 rounded-full bg-gold-400"></span>
        </div>

        {/* Image */}
        <div className="lg:col-span-5 h-64 sm:h-72 rounded-2xl overflow-hidden relative bg-forest-950">
          <img
            src={proj.image}
            alt={proj.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-transparent" />

          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-forest-950/80 text-gold-300 px-2.5 py-0.5 rounded border border-gold-400/40">
            {proj.yearOrPeriod}
          </span>

          <span className="absolute bottom-2.5 right-3 text-[10px] bg-black/60 text-ivory-200 px-2 py-0.5 rounded">
            Documented Project
          </span>
        </div>

        {/* Project Details */}
        <div className="lg:col-span-7 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-2.5 py-0.5 rounded-full border border-gold-200">
                {proj.roleType}
              </span>

              <span className="text-xs text-stone-500 flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-gold-600" />
                {proj.location}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
              {proj.name}
            </h3>

            <p className="text-sm sm:text-base font-medium text-forest-900 mt-2">
              {proj.roleDescription}
            </p>

            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed mt-2">
              {proj.significance}
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t border-stone-100">
            {proj.currentStatusNote && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                <span className="font-medium">
                  ⭐ Current Opportunity: {proj.currentStatusNote}
                </span>

                <button
                  onClick={() => openEnquiryModal(null)}
                  className="text-emerald-800 underline font-semibold hover:text-emerald-950"
                >
                  Enquire on Availability
                </button>
              </div>
            )}

            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                onClick={() =>
                  handleOpenGoogleMaps(
                    proj.googleMapsQuery || proj.location
                  )
                }
                className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-forest-950 font-medium bg-ivory-100 hover:bg-ivory-200 px-3 py-1.5 rounded-lg border border-stone-200 transition"
              >
                <Compass className="w-3.5 h-3.5 text-gold-600" />
                <span>View Location in Google Maps</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </button>

              <button
                onClick={() => openEnquiryModal(null)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-forest-900 hover:bg-forest-800 px-4 py-1.5 rounded-lg shadow-sm transition"
              >
                <MessageSquareText className="w-3 h-3 text-gold-400" />
                <span>Consult With Us</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">

      {/* HERO HEADER */}
      <section className="relative bg-forest-950 text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="/images/hridayesh-resort-actual.jpg"
            alt="The Hridayesh Spa Wilderness Resort Dhikuli Jim Corbett"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/80 to-forest-950/60" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold-400 block mb-2">
            Historical Portfolio & Landmark Dealings
          </span>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ivory-50 leading-tight">
            Our Legacy & Track Record
          </h1>

          <MountainDivider light className="my-3" />

          <p className="text-base sm:text-lg text-gold-300 font-serif italic mb-2">
            "Decades of Experience. Landmark Transactions. Lasting Relationships."
          </p>

          <p className="text-sm sm:text-base text-ivory-200/90 font-light max-w-2xl mx-auto leading-relaxed">
            Historical landmark transactions, premier hospitality resort land acquisitions, residential plotting developments, and strategic land sourcing carried out under the leadership of Mr. Prakash Chandra Joshi and PCJ Property Consultancy.
          </p>
        </div>
      </section>

      {/* PROJECT TIMELINE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        <div className="bg-ivory-100/60 p-4 sm:p-6 rounded-2xl border border-gold-300/40 text-xs sm:text-sm text-stone-700 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />

          <div className="space-y-1">
            <p className="font-semibold text-forest-950">
              Documented Landmark Transactions & Exact Geographical Coordinates
            </p>

            <p className="leading-relaxed text-stone-600">
              The projects presented below showcase actual land identification, acquisition, plotting, sourcing, and development activities supervised by Mr. Prakash Chandra Joshi and PCJ Property Consultancy. In accordance with our non-negotiable standard of factual accuracy, each entry identifies the exact project, location, and verified land-related role.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
            <p className="text-stone-600">Loading project portfolio...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-red-200">
            <p className="font-semibold text-red-700">{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
            <p className="font-serif text-2xl text-stone-700">
              No published projects found.
            </p>
            <p className="text-sm text-stone-500 mt-2">
              Please check back soon for updates to our portfolio.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Timeline */}
            <div className="space-y-8 sm:space-y-12 relative before:absolute before:inset-0 before:left-8 before:w-0.5 before:bg-gold-300/40 hidden sm:block">
              {projects.map((proj) => renderProjectCard(proj))}
            </div>

            {/* Mobile Projects */}
            <div className="sm:hidden space-y-6">
              {projects.map((proj) => renderProjectCard(proj, true))}
            </div>
          </>
        )}

        <DisclaimerNotice type="all" />
      </div>
    </div>
  );
};
