import React from 'react';
import { MapPin, ArrowUpRight, MessageSquareText, Compass, ExternalLink } from 'lucide-react';
import { Property } from '../../types';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import { Badge } from './Badge';

interface PropertyCardProps {
  property: Property;
  onSelectOnMap?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelectOnMap }) => {
  const { openEnquiryModal, openPropertyDetail } = useEnquiryModal();

  const handleOpenGoogleMaps = (e: React.MouseEvent) => {
    e.stopPropagation();
    const encoded = encodeURIComponent(property.googleMapsQuery);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-gold-400/50 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col h-full">
      {/* Illustrative Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-forest-950">
        <img
          src={property.illustrativeImage}
          alt={property.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent pointer-events-none" />

        {/* Badges on top of image */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <Badge variant="gold" size="sm" className="bg-forest-950/80 text-gold-300 backdrop-blur-md border-gold-400/40">
            {property.categoryLabel}
          </Badge>
          {property.landArea && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/90 text-forest-900 backdrop-blur-md shadow-sm">
              {property.landArea}
            </span>
          )}
        </div>

        {/* Illustrative imagery disclaimer pill */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-ivory-200/90 font-light drop-shadow">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-gold-400" />
            {property.location}
          </span>
          <span className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded text-ivory-300">
            Regional Illustration
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="font-serif text-xl sm:text-2xl text-forest-950 font-semibold group-hover:text-forest-700 transition-colors leading-snug">
            {property.name}
          </h3>
          <p className="text-xs text-gold-700 font-medium tracking-wide mt-1 uppercase">
            {property.subLocation || property.location}
          </p>
        </div>

        <p className="text-sm text-stone-600 font-light leading-relaxed mb-4 line-clamp-3">
          {property.description}
        </p>

        {/* Potential Applications Tags */}
        {property.potentialApplications && property.potentialApplications.length > 0 && (
          <div className="mb-5 pt-3 border-t border-stone-100">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block mb-2">
              Suitable Applications:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {property.potentialApplications.slice(0, 3).map((app, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-ivory-100 text-stone-700 px-2.5 py-0.5 rounded-md border border-stone-200/60"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-stone-100 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Price: <strong className="text-forest-950 font-medium">On Request</strong></span>
            <span className="text-[11px] text-stone-400 italic">Subject to confirmation</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-1">
            {/* View Location / Directions Button */}
            <button
              onClick={handleOpenGoogleMaps}
              title={`View ${property.location} in Google Maps`}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium text-forest-900 bg-ivory-100 hover:bg-ivory-200 border border-stone-200/80 transition-all hover:border-gold-400"
            >
              <Compass className="w-3.5 h-3.5 text-gold-700" />
              <span>View Map</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </button>

            {/* Enquire Now CTA */}
            <button
              onClick={() => openEnquiryModal(property)}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-white bg-forest-900 hover:bg-forest-800 transition-all shadow-sm hover:shadow-gold-glow"
            >
              <MessageSquareText className="w-3.5 h-3.5 text-gold-400" />
              <span>Enquire Now</span>
            </button>
          </div>

          <button
            onClick={() => openPropertyDetail(property)}
            className="w-full text-center text-xs text-stone-500 hover:text-forest-800 hover:underline pt-1 transition-colors flex items-center justify-center gap-1"
          >
            <span>View Full Property Overview</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
