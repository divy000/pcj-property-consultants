
import React, { useEffect, useMemo, useState } from 'react';
import {
  MapPin,
  Filter,
  Search,
} from 'lucide-react';

import { supabase } from '../lib/supabase';
import { Property } from '../types';
import { PropertyCard } from '../components/common/PropertyCard';
import { LandMeasurementGuide } from '../components/common/LandMeasurementGuide';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { MountainDivider } from '../components/common/MountainDivider';

interface SupabaseProperty {
  id: string;
  title: string | null;
  description: string | null;
  property_type: string | null;
  listing_type: string | null;
  price: number | string | null;
  price_label: string | null;
  location: string | null;
  city: string | null;
  state: string | null;
  area: number | string | null;
  area_unit: string | null;
  images: string[] | null;
  featured: boolean | null;
  is_published: boolean | null;

  // Additional details for the original property listings
  sub_location: string | null;
  category_label: string | null;
  land_area: string | null;
  land_area_details: string | null;
  highlight: string | null;
  potential_applications: string[] | null;
  latitude: number | null;
  longitude: number | null;
  google_maps_query: string | null;
}

const getCategory = (
  propertyType: string | null
): Property['category'] => {
  const type = (propertyType || '').toLowerCase();

  if (type.includes('heritage')) return 'Heritage';
  if (type.includes('farm')) return 'Farmhouse';
  if (type.includes('commercial')) return 'Commercial';

  if (type.includes('villa') || type.includes('residential')) {
    return 'Villas';
  }

  return 'Land';
};

const convertProperty = (item: SupabaseProperty): Property => {
  const category = getCategory(item.property_type);

  const locationParts = [
    item.location,
    item.city,
    item.state,
  ].filter(Boolean);

  const fullLocation =
    item.google_maps_query ||
    locationParts.join(', ') ||
    'Kumaon, Uttarakhand';

  const area = item.area
    ? `${item.area}${item.area_unit ? ` ${item.area_unit}` : ''}`
    : undefined;

  return {
    id: item.id,

    name: item.title || 'Untitled Property',

    location:
      item.location ||
      item.city ||
      'Kumaon, Uttarakhand',

    subLocation:
      item.sub_location ||
      item.city ||
      undefined,

    category,

    categoryLabel:
      item.category_label ||
      item.property_type ||
      category,

    landArea:
      item.land_area ||
      area,

    landAreaDetails:
      item.land_area_details ||
      undefined,

    highlight:
      item.highlight ||
      item.price_label ||
      'Price on request',

    description:
      item.description ||
      'Contact PCJ Property Consultants for more information about this property.',

    potentialApplications:
      item.potential_applications || [],

    approxCoordinates: {
      lat: item.latitude ?? 0,
      lng: item.longitude ?? 0,
    },

    googleMapsQuery: fullLocation,

    illustrativeImage:
      item.images?.[0] ||
      '/images/mountain-land.jpg',

    featured: item.featured ?? false,
  };
};

export const PropertiesPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError('');

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        setError(
          'We could not load properties right now. Please try again later.'
        );
        setProperties([]);
        setLoading(false);
        return;
      }

      const convertedProperties = (
        (data || []) as SupabaseProperty[]
      ).map(convertProperty);

      setProperties(convertedProperties);
      setLoading(false);
    };

    fetchProperties();
  }, []);

  const categories = [
    'All',
    'Land',
    'Heritage',
    'Farmhouse',
    'Commercial',
    'Villas',
  ];

  const locations = useMemo(() => {
    const uniqueLocations = Array.from(
      new Set(
        properties
          .map((property) => property.location)
          .filter(Boolean)
      )
    );

    return ['All', ...uniqueLocations];
  }, [properties]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        property.category === selectedCategory;

      const matchesLocation =
        selectedLocation === 'All' ||
        property.location.toLowerCase().includes(
          selectedLocation.toLowerCase()
        );

      const matchesSearch =
        searchQuery.trim() === '' ||
        property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (property.landArea || '').toLowerCase().includes(searchQuery.toLowerCase());

      return (
        matchesCategory &&
        matchesLocation &&
        matchesSearch
      );
    });
  }, [
    properties,
    selectedCategory,
    selectedLocation,
    searchQuery,
  ]);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">

      {/* HERO HEADER */}
      <section className="relative bg-forest-950 text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/mountain-land.jpg"
            alt="Mountain Land Landscape"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/80 to-forest-950/60" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold-400 block mb-2">
            Verified Property Inventory
          </span>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ivory-50 leading-tight">
            Available Properties & Investment Opportunities
          </h1>

          <MountainDivider light className="my-3" />

          <p className="text-sm sm:text-base text-ivory-200/90 font-light max-w-2xl mx-auto leading-relaxed">
            Explore verified land, residential and commercial property opportunities across Kumaon and the Himalayan region of Uttarakhand.
          </p>
        </div>
      </section>

      {/* MAIN INVENTORY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        <LandMeasurementGuide />

        {/* FILTER TOOLBAR */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200/90 shadow-sm space-y-4">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* SEARCH */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

              <input
                type="text"
                placeholder="Search by location, area, name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 bg-ivory-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* RESULTS COUNT */}
            <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3 text-xs text-stone-500">
              <span>
                Showing <strong>{filteredProperties.length}</strong> of{' '}
                <strong>{properties.length}</strong> published properties
              </span>

              {(selectedCategory !== 'All' ||
                selectedLocation !== 'All' ||
                searchQuery !== '') && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedLocation('All');
                    setSearchQuery('');
                  }}
                  className="text-forest-800 font-semibold underline hover:text-forest-950"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* CATEGORY FILTERS */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
            <span className="text-xs font-semibold text-stone-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-gold-600" />
              Category:
            </span>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-forest-900 text-white font-semibold shadow-sm'
                    : 'bg-ivory-100 hover:bg-ivory-200 text-stone-700 border border-stone-200'
                }`}
              >
                {cat === 'All' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          {/* LOCATION FILTERS */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-100">
            <span className="text-xs font-semibold text-stone-500 mr-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gold-600" />
              Location:
            </span>

            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`px-2.5 py-1 rounded-lg text-xs transition ${
                  selectedLocation === loc
                    ? 'bg-gold-500 text-forest-950 font-bold'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border border-stone-200/60'
                }`}
              >
                {loc === 'All' ? 'All Locations' : loc}
              </button>
            ))}
          </div>
        </div>

        {/* PROPERTY GRID */}
        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
            <p className="text-stone-600">
              Loading available properties...
            </p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-red-200">
            <p className="font-semibold text-red-700">{error}</p>
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
            <p className="font-serif text-2xl text-stone-700">
              No published properties found.
            </p>

            <p className="text-sm text-stone-500 max-w-md mx-auto">
              Please check back soon or contact PCJ Property Consultants directly for available opportunities.
            </p>

            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedLocation('All');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-xl bg-forest-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-forest-800 transition"
            >
              Reset All Filters
            </button>
          </div>
        )}

        <DisclaimerNotice type="all" />
      </div>
    </div>
  );
};
