import React from 'react';
import { X, MapPin, Compass, MessageSquareText, ShieldAlert, CheckCircle, ExternalLink } from 'lucide-react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import { Badge } from '../common/Badge';

export const PropertyDetailModal: React.FC = () => {
  const { selectedPropertyDetail, closePropertyDetail, openEnquiryModal } = useEnquiryModal();

  if (!selectedPropertyDetail) return null;

  const property = selectedPropertyDetail;

  const handleOpenGoogleMaps = () => {
    const encoded = encodeURIComponent(property.googleMapsQuery);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleEnquireFromDetail = () => {
    const propToEnquire = property;
    closePropertyDetail();
    openEnquiryModal(propToEnquire);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-forest-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gold-300/60 overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={closePropertyDetail}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-forest-950/70 text-white hover:bg-forest-950 transition backdrop-blur-sm"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-forest-950">
          <img
            src={property.illustrativeImage}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-transparent" />

          {/* Overlay info */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="gold" size="sm" className="bg-forest-950/90 text-gold-300 border-gold-400">
                {property.categoryLabel}
              </Badge>
              {property.landArea && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/95 text-forest-900 shadow">
                  Area: {property.landArea}
                </span>
              )}
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold leading-tight">
              {property.name}
            </h3>
            <p className="text-xs sm:text-sm text-gold-300 flex items-center gap-1.5 mt-1">
              <MapPin className="w-4 h-4 text-gold-400" />
              {property.location} {property.subLocation && `(${property.subLocation})`}
            </p>
          </div>
        </div>

        {/* Detail Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Key Facts Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-ivory-50 p-4 rounded-2xl border border-gold-200/60 text-xs">
            <div>
              <span className="text-stone-400 block uppercase font-semibold text-[10px]">Location</span>
              <span className="font-semibold text-forest-950 text-sm">{property.location}</span>
            </div>
            <div>
              <span className="text-stone-400 block uppercase font-semibold text-[10px]">Land Area</span>
              <span className="font-semibold text-forest-950 text-sm">
                {property.landArea || 'On Request'}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block uppercase font-semibold text-[10px]">Category</span>
              <span className="font-semibold text-forest-950 text-sm">{property.category}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
              Property Overview & Significance
            </h4>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-light">
              {property.description}
            </p>
          </div>

          {/* Potential Applications */}
          {property.potentialApplications && property.potentialApplications.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
                Potential Investment & Development Applications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {property.potentialApplications.map((app, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 bg-ivory-100/60 p-2.5 rounded-xl border border-stone-200">
                    <CheckCircle className="w-4 h-4 text-forest-700 shrink-0" />
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strictly Factual Disclaimer */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <span>Official Verification Notice</span>
            </div>
            <p className="leading-relaxed text-stone-600">
              Property information and availability are subject to direct confirmation by PCJ Property Consultants. Detailed revenue documents, site surveys, and ownership transfer structures are presented confidentially during formal consultation.
            </p>
          </div>

          {/* CTA Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleOpenGoogleMaps}
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl border border-stone-300 text-stone-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 hover:bg-stone-50 transition"
            >
              <Compass className="w-4 h-4 text-gold-600" />
              <span>Open Locality in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </button>

            <button
              onClick={handleEnquireFromDetail}
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-gold-glow transition"
            >
              <MessageSquareText className="w-4 h-4 text-gold-400" />
              <span>Enquire with Consultant</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
