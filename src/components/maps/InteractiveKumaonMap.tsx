
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { Property, KumaonLocation } from '../../types';
import { ProjectTrackRecord } from '../../types';
import { supabase } from '../../lib/supabase';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

import {
  Navigation,
  Compass,
  Info,
} from 'lucide-react';

interface InteractiveKumaonMapProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  highlightedPropertyId?: string;
  showAllLocations?: boolean;
  className?: string;
}

interface DatabaseProperty {
  id: string;
  title: string;
  property_type: string | null;
  listing_type: string | null;
  location: string | null;
  sub_location: string | null;
  category_label: string | null;
  land_area: string | null;
  land_area_details: string | null;
  highlight: string | null;
  description: string | null;
  potential_applications: string[] | null;
  latitude: number | null;
  longitude: number | null;
  google_maps_query: string | null;
  images: string[] | null;
  featured: boolean | null;
}

interface DatabaseProject {
  id: string;
  title: string;
  location: string | null;
  year_or_period: string | null;
  role_type: string | null;
  role_description: string | null;
  significance: string | null;
  current_status_note: string | null;
  latitude: number | null;
  longitude: number | null;
  google_maps_query: string | null;
  images: string[] | null;
}

interface DatabaseLocation {
  id: string;
  name: string;
  district: string | null;
  altitude: string | null;
  tagline: string | null;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  has_available_properties: boolean | null;
  associated_properties: string[] | null;
  highlights: string[] | null;
  image_url: string | null;
}

const escapeHtml = (value: unknown): string => {
  return String(value ?? '').replace(/[&<>"']/g, (character) => {
    const replacements: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };

    return replacements[character];
  });
};

const getPropertyCategory = (
  propertyType: string | null
): Property['category'] => {
  const value = (propertyType || 'Land').toLowerCase();

  if (value.includes('heritage')) return 'Heritage';
  if (value.includes('farmhouse')) return 'Farmhouse';
  if (value.includes('commercial')) return 'Commercial';
  if (value.includes('villa')) return 'Villas';

  return 'Land';
};

export const InteractiveKumaonMap: React.FC<InteractiveKumaonMapProps> = ({
  initialCenter = [29.5000, 79.4200],
  initialZoom = 10,
  highlightedPropertyId,
  showAllLocations = true,
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const { openEnquiryModal } = useEnquiryModal();

  const [activeFilter, setActiveFilter] = useState<
    'all' | 'properties' | 'projects' | 'destinations'
  >('all');

  const [properties, setProperties] = useState<Property[]>([]);
  const [projects, setProjects] = useState<
    (ProjectTrackRecord & {
      coordinates: { lat: number; lng: number };
      googleMapsQuery: string;
    })[]
  >([]);
  const [locations, setLocations] = useState<KumaonLocation[]>([]);

  // 1. Fetch all map data from Supabase
  useEffect(() => {
    let isMounted = true;

    const fetchMapData = async () => {
      const [
        propertiesResult,
        projectsResult,
        locationsResult,
      ] = await Promise.all([
        supabase
          .from('properties')
          .select('*')
          .eq('is_published', true),

        supabase
          .from('projects')
          .select('*')
          .eq('is_published', true),

        supabase
          .from('locations')
          .select('*')
          .eq('is_active', true),
      ]);

      if (propertiesResult.error) {
        console.error(
          'Error fetching map properties:',
          propertiesResult.error
        );
      }

      if (projectsResult.error) {
        console.error(
          'Error fetching map projects:',
          projectsResult.error
        );
      }

      if (locationsResult.error) {
        console.error(
          'Error fetching map locations:',
          locationsResult.error
        );
      }

      if (
        propertiesResult.error ||
        projectsResult.error ||
        locationsResult.error
      ) {
        return;
      }

      if (!isMounted) return;

      // Convert Supabase properties into the existing Property format
      const propertyRows = (propertiesResult.data || []) as DatabaseProperty[];

      const formattedProperties: Property[] = propertyRows.map((item) => ({
        id: item.id,
        name: item.title,
        location: item.location || 'Kumaon, Uttarakhand',
        subLocation: item.sub_location || undefined,
        category: getPropertyCategory(item.property_type),
        categoryLabel:
          item.category_label || item.property_type || 'Property',
        landArea: item.land_area || undefined,
        landAreaDetails: item.land_area_details || undefined,
        highlight: item.highlight || '',
        description: item.description || '',
        potentialApplications: item.potential_applications || [],
        approxCoordinates: {
          lat: Number(item.latitude) || 0,
          lng: Number(item.longitude) || 0,
        },
        googleMapsQuery:
          item.google_maps_query ||
          item.location ||
          'Kumaon, Uttarakhand',
        illustrativeImage:
          item.images?.[0] || '/images/mountain-land.jpg',
        featured: item.featured || false,
      }));

      setProperties(formattedProperties);

      // Convert Supabase projects into the existing project format
      const projectRows = (projectsResult.data || []) as DatabaseProject[];

      const formattedProjects = projectRows.map((item) => ({
        id: item.id,
        name: item.title,
        location: item.location || 'Kumaon, Uttarakhand',
        yearOrPeriod: item.year_or_period || 'Project',
        roleType: (
          item.role_type || 'Land-Related Work'
        ) as ProjectTrackRecord['roleType'],
        roleDescription: item.role_description || '',
        significance: item.significance || '',
        currentStatusNote: item.current_status_note || undefined,
        image: item.images?.[0] || '/images/mountain-land.jpg',
        coordinates: {
          lat: Number(item.latitude) || 0,
          lng: Number(item.longitude) || 0,
        },
        googleMapsQuery:
          item.google_maps_query ||
          item.location ||
          'Kumaon, Uttarakhand',
      }));

      setProjects(formattedProjects);

      // Convert Supabase locations into the existing KumaonLocation format
      const locationRows = (locationsResult.data || []) as DatabaseLocation[];

      const formattedLocations: KumaonLocation[] = locationRows.map(
        (item) => ({
          id: item.id,
          name: item.name,
          district: item.district || 'Kumaon',
          altitude: item.altitude || undefined,
          tagline: item.tagline || '',
          description: item.description || '',
          coordinates: {
            lat: Number(item.latitude) || 0,
            lng: Number(item.longitude) || 0,
          },
          hasAvailableProperties:
            item.has_available_properties || false,
          associatedProperties: item.associated_properties || [],
          highlights: item.highlights || [],
          image: item.image_url || '/images/mountain-land.jpg',
        })
      );

      setLocations(formattedLocations);
    };

    fetchMapData();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      minZoom: 8,
      maxZoom: 17,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);

    markersLayerRef.current = layerGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  // 3. Populate markers whenever Supabase data or filters change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = markersLayerRef.current;

    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    // PROPERTY MARKERS
    if (activeFilter === 'all' || activeFilter === 'properties') {
      properties.forEach((prop) => {
        const { lat, lng } = prop.approxCoordinates;

        if (!lat || !lng) return;

        const isHighlighted = prop.id === highlightedPropertyId;

        const propertyIcon = L.divIcon({
          className: 'custom-property-pin',
          html: `
            <div class="relative flex items-center justify-center cursor-pointer group">
              <span class="absolute w-8 h-8 rounded-full bg-gold-400/40 animate-ping"></span>
              <div class="relative w-8 h-8 rounded-full bg-forest-950 border-2 ${
                isHighlighted ? 'border-white scale-125' : 'border-gold-400'
              } flex items-center justify-center text-gold-300 shadow-xl transition-transform hover:scale-110">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
              </div>
              <span class="absolute -bottom-5 whitespace-nowrap text-[10px] font-semibold bg-forest-950 text-gold-200 px-1.5 py-0.5 rounded shadow border border-gold-500/30">
                ${escapeHtml(prop.location.split(',')[0])}
              </span>
            </div>
          `,
          iconSize: [32, 40],
          iconAnchor: [16, 20],
          popupAnchor: [0, -22],
        });

        const popupContent = document.createElement('div');
        popupContent.className = 'p-3 max-w-xs';

        popupContent.innerHTML = `
          <div class="space-y-2">
            <div class="h-28 w-full rounded-lg overflow-hidden relative mb-1.5">
              <img src="${escapeHtml(prop.illustrativeImage)}" alt="${escapeHtml(prop.name)}" class="w-full h-full object-cover" />
              <span class="absolute top-1.5 left-1.5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-gold-500 text-forest-950 rounded">
                ${escapeHtml(prop.categoryLabel)}
              </span>
            </div>
            <h4 class="font-serif text-base font-bold text-forest-950 leading-tight">
              ${escapeHtml(prop.name)}
            </h4>
            <p class="text-xs text-stone-600 flex items-center gap-1">
              📍 <strong>Location:</strong> ${escapeHtml(prop.location)}
            </p>
            ${
              prop.landArea
                ? `<p class="text-xs text-forest-900">📏 <strong>Area:</strong> ${escapeHtml(prop.landArea)}</p>`
                : ''
            }
            <div class="pt-2 border-t border-stone-200 flex items-center gap-2">
              <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                prop.googleMapsQuery
              )}" target="_blank" rel="noopener noreferrer"
                class="flex-1 text-center text-xs py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium rounded transition">
                Directions ↗
              </a>
              <button data-action="enquire"
                class="flex-1 text-center text-xs py-1.5 px-2 bg-forest-900 hover:bg-forest-800 text-white font-semibold rounded shadow transition">
                Enquire
              </button>
            </div>
          </div>
        `;

        const marker = L.marker([lat, lng], {
          icon: propertyIcon,
          title: prop.name,
        }).addTo(layerGroup);

        marker.bindPopup(popupContent);

        marker.on('popupopen', (event) => {
          const button = event.popup
            .getElement()
            ?.querySelector<HTMLButtonElement>('[data-action="enquire"]');

          if (button) {
            button.onclick = () => openEnquiryModal(prop);
          }
        });
      });
    }

    // PROJECT MARKERS
    if (activeFilter === 'all' || activeFilter === 'projects') {
      projects.forEach((proj) => {
        const { lat, lng } = proj.coordinates;

        if (!lat || !lng) return;

        const projectIcon = L.divIcon({
          className: 'custom-project-pin',
          html: `
            <div class="relative flex items-center justify-center cursor-pointer group">
              <div class="w-8 h-8 rounded-full bg-emerald-800 border-2 border-gold-300 flex items-center justify-center text-gold-200 shadow-xl transition-transform hover:scale-110">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <span class="absolute -bottom-5 whitespace-nowrap text-[9px] font-bold bg-emerald-950 text-emerald-200 px-1.5 py-0.5 rounded shadow border border-emerald-600/40">
                ${escapeHtml(proj.name.split('—')[0].substring(0, 16))}...
              </span>
            </div>
          `,
          iconSize: [32, 40],
          iconAnchor: [16, 20],
          popupAnchor: [0, -22],
        });

        const popupContent = document.createElement('div');
        popupContent.className = 'p-3 max-w-xs';

        popupContent.innerHTML = `
          <div class="space-y-1.5">
            <div class="h-24 w-full rounded-lg overflow-hidden relative mb-1">
              <img src="${escapeHtml(proj.image)}" alt="${escapeHtml(proj.name)}" class="w-full h-full object-cover" />
              <span class="absolute top-1 left-1 px-2 py-0.5 text-[9px] font-bold uppercase bg-forest-950/90 text-gold-300 rounded border border-gold-400/40">
                ${escapeHtml(proj.yearOrPeriod)}
              </span>
            </div>
            <span class="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
              🏆 Completed Project: ${escapeHtml(proj.roleType)}
            </span>
            <h4 class="font-serif text-base font-bold text-forest-950 leading-tight">
              ${escapeHtml(proj.name)}
            </h4>
            <p class="text-xs text-stone-600">
              📍 ${escapeHtml(proj.location)}
            </p>
            <p class="text-[11px] text-stone-600 font-light line-clamp-2">
              ${escapeHtml(proj.roleDescription)}
            </p>
            <div class="pt-2 border-t border-stone-200 flex items-center justify-between">
              <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                proj.googleMapsQuery || proj.location
              )}" target="_blank" rel="noopener noreferrer"
                class="text-xs text-forest-800 hover:text-forest-950 font-semibold underline">
                Open in Google Maps ↗
              </a>
              <button data-action="consult" class="text-xs bg-forest-900 text-white px-2.5 py-1 rounded">
                Consult
              </button>
            </div>
          </div>
        `;

        const marker = L.marker([lat, lng], {
          icon: projectIcon,
          title: proj.name,
        }).addTo(layerGroup);

        marker.bindPopup(popupContent);

        marker.on('popupopen', (event) => {
          const button = event.popup
            .getElement()
            ?.querySelector<HTMLButtonElement>('[data-action="consult"]');

          if (button) {
            button.onclick = () => openEnquiryModal(null);
          }
        });
      });
    }

    // KUMAON DESTINATION MARKERS
    if (
      (activeFilter === 'all' || activeFilter === 'destinations') &&
      showAllLocations
    ) {
      locations.forEach((loc) => {
        const { lat, lng } = loc.coordinates;

        if (!lat || !lng) return;

        const destIcon = L.divIcon({
          className: 'custom-dest-pin',
          html: `
            <div class="relative flex items-center justify-center cursor-pointer group">
              <div class="w-6 h-6 rounded-full bg-ivory-100 border-2 border-forest-800 flex items-center justify-center text-forest-800 shadow-md hover:scale-110 transition">
                <span class="w-2 h-2 rounded-full bg-forest-700"></span>
              </div>
              <span class="absolute -bottom-4 whitespace-nowrap text-[9px] font-medium bg-white/95 text-stone-800 px-1 rounded shadow-sm border border-stone-300">
                ${escapeHtml(loc.name)}
              </span>
            </div>
          `,
          iconSize: [24, 28],
          iconAnchor: [12, 14],
          popupAnchor: [0, -16],
        });

        const popupContent = document.createElement('div');
        popupContent.className = 'p-3 max-w-xs';

        popupContent.innerHTML = `
          <div class="space-y-1.5">
            <div class="h-20 w-full rounded-lg overflow-hidden relative mb-1">
              <img src="${escapeHtml(loc.image)}" alt="${escapeHtml(loc.name)}" class="w-full h-full object-cover" />
            </div>
            <span class="text-[10px] font-semibold text-forest-800 tracking-wider uppercase">
              ${escapeHtml(loc.district)} • ${escapeHtml(loc.altitude || 'Kumaon')}
            </span>
            <h4 class="font-serif text-base font-bold text-forest-950">
              ${escapeHtml(loc.name)}
            </h4>
            <p class="text-xs text-stone-600">
              ${escapeHtml(loc.tagline)}
            </p>
            <div class="pt-2 flex justify-end">
              <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                loc.name + ', Kumaon, Uttarakhand, India'
              )}" target="_blank" rel="noopener noreferrer"
                class="text-xs text-forest-800 hover:text-forest-950 font-medium underline">
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        `;

        const marker = L.marker([lat, lng], {
          icon: destIcon,
          title: loc.name,
        }).addTo(layerGroup);

        marker.bindPopup(popupContent);
      });
    }
  }, [
    activeFilter,
    highlightedPropertyId,
    showAllLocations,
    properties,
    projects,
    locations,
    openEnquiryModal,
  ]);

  // 4. Reset map view
  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(initialCenter, initialZoom, {
        animate: true,
      });
    }
  };

  return (
    <div className={`relative flex flex-col rounded-2xl overflow-hidden border border-stone-300 shadow-luxury bg-ivory-100 ${className}`}>
      {/* Top Map Filter Controls */}
      <div className="bg-forest-950 text-ivory-100 px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-forest-800/80 z-20">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-gold-400" />
          <span className="font-serif text-base sm:text-lg font-medium text-white">
            Kumaon Geographical Property Navigator
          </span>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-full font-medium transition ${
              activeFilter === 'all'
                ? 'bg-gold-500 text-forest-950 font-semibold'
                : 'text-ivory-200 hover:bg-forest-800'
            }`}
          >
            All Points
          </button>

          <button
            onClick={() => setActiveFilter('properties')}
            className={`px-3 py-1 rounded-full font-medium transition flex items-center gap-1 ${
              activeFilter === 'properties'
                ? 'bg-gold-500 text-forest-950 font-semibold'
                : 'text-ivory-200 hover:bg-forest-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-gold-400"></span>
            {properties.length} Properties
          </button>

          <button
            onClick={() => setActiveFilter('projects')}
            className={`px-3 py-1 rounded-full font-medium transition flex items-center gap-1 ${
              activeFilter === 'projects'
                ? 'bg-gold-500 text-forest-950 font-semibold'
                : 'text-ivory-200 hover:bg-forest-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            {projects.length} Projects
          </button>

          <button
            onClick={() => setActiveFilter('destinations')}
            className={`px-3 py-1 rounded-full font-medium transition ${
              activeFilter === 'destinations'
                ? 'bg-gold-500 text-forest-950 font-semibold'
                : 'text-ivory-200 hover:bg-forest-800'
            }`}
          >
            Regional Towns
          </button>

          <button
            onClick={handleResetView}
            title="Reset Map Center"
            className="p-1.5 rounded-full text-gold-400 hover:text-white hover:bg-forest-800 transition ml-1"
          >
            <Navigation className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Leaflet Map Canvas */}
      <div
        ref={mapContainerRef}
        className="w-full h-[450px] sm:h-[550px] relative z-10"
      />

      {/* Map Footer Disclaimer */}
      <div className="bg-ivory-50 px-4 py-2.5 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2 z-20">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-gold-600 shrink-0" />
          <span>
            <strong>Geographical Accuracy:</strong> Approximate property
            coordinates and documented locations shown. Property site
            inspections are conducted by appointment.
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-forest-950 border border-gold-400 inline-block"></span>
            Property
          </span>

          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-800 border border-gold-300 inline-block"></span>
            Completed Project
          </span>

          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-forest-700 inline-block"></span>
            Town Hub
          </span>
        </div>
      </div>
    </div>
  );
};
