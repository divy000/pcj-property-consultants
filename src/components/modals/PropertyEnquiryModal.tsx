
import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  AlertCircle,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import { companyData } from '../../data/company';
import { supabase } from '../../lib/supabase';

export const PropertyEnquiryModal: React.FC = () => {
  const { isOpen, closeEnquiryModal, selectedProperty } = useEnquiryModal();

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    enquiryType: 'Buying a Property',
    preferredLocation: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (selectedProperty) {
      setFormData((prev) => ({
        ...prev,
        enquiryType: 'Property-Specific Enquiry',
        preferredLocation: selectedProperty.location,
        message: `I am interested in receiving verified details, land documentation status, and scheduling an appointment regarding: "${selectedProperty.name}" (${selectedProperty.location}${
          selectedProperty.landArea ? `, Area: ${selectedProperty.landArea}` : ''
        }).`,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        enquiryType: 'Buying a Property',
        preferredLocation: '',
        message: '',
      }));
    }

    setIsSubmitted(false);
    setErrorMessage('');
  }, [selectedProperty, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!formData.phoneNumber.trim() && !formData.emailAddress.trim()) {
      setErrorMessage(
        'Please provide either a phone number or an email address so we can contact you.'
      );
      return;
    }

    setIsSubmitting(true);

    const enquiryMessage = [
      `Enquiry Type: ${formData.enquiryType}`,
      formData.preferredLocation.trim()
        ? `Preferred Location: ${formData.preferredLocation.trim()}`
        : '',
      selectedProperty
        ? `Property Name: ${selectedProperty.name}`
        : '',
      formData.message.trim()
        ? `Message: ${formData.message.trim()}`
        : '',
    ]
      .filter(Boolean)
      .join('\n\n');

    try {
      const { error } = await supabase
        .from('property_inquiries')
        .insert({
          name: formData.fullName.trim(),
          email: formData.emailAddress.trim() || null,
          phone: formData.phoneNumber.trim() || null,
          message: enquiryMessage || null,
        });

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Property enquiry submission failed:', error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to submit your enquiry. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppMessageUrl = () => {
    const text = selectedProperty
      ? `Hello Mr. Prakash Chandra Joshi, I am interested in consulting regarding "${selectedProperty.name}" in ${selectedProperty.location}.`
      : `Hello Mr. Prakash Chandra Joshi, I would like to schedule a real estate consultation regarding properties in Kumaon.`;

    return `https://wa.me/918126201735?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-forest-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-ivory-50 rounded-2xl shadow-2xl border border-gold-300/60 overflow-hidden my-8">
        <div className="bg-forest-950 text-white p-5 sm:p-6 relative border-b border-gold-500/30">
          <button
            onClick={closeEnquiryModal}
            className="absolute top-4 right-4 p-2 text-ivory-200 hover:text-white rounded-full hover:bg-forest-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-400 block mb-1">
            PCJ Property Consultants • Kumaon (Est. 1996)
          </span>

          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ivory-50">
            {selectedProperty
              ? 'Property Consultation Enquiry'
              : 'Direct Property Consultation'}
          </h3>

          <p className="text-xs sm:text-sm text-ivory-200/80 font-light mt-1">
            Connect directly with lead real estate consultant Mr. Prakash Chandra Joshi.
          </p>

          <div className="mt-4 pt-3 border-t border-forest-800/80 flex items-center justify-between text-xs">
            <a
              href={`tel:${companyData.contact.phoneCallable}`}
              className="flex items-center gap-1.5 text-gold-300 hover:text-white transition font-medium"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {companyData.contact.phoneDisplay}</span>
            </a>

            <a
              href={getWhatsAppMessageUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {selectedProperty && (
            <div className="mt-3 p-3 rounded-xl bg-forest-900/90 border border-gold-400/40 flex items-center gap-3">
              <img
                src={selectedProperty.illustrativeImage}
                alt={selectedProperty.name}
                className="w-14 h-12 rounded-lg object-cover border border-gold-400/40"
              />

              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-gold-300 uppercase tracking-wider block">
                  Referenced Property
                </span>

                <p className="font-serif text-sm font-semibold text-white truncate">
                  {selectedProperty.name}
                </p>

                <p className="text-xs text-ivory-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-gold-400" />
                  {selectedProperty.location}
                  {selectedProperty.landArea && ` • ${selectedProperty.landArea}`}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-forest-100 border border-forest-300 text-forest-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-forest-700" />
              </div>

              <h4 className="font-serif text-2xl font-bold text-forest-950">
                Enquiry Recorded Successfully
              </h4>

              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Your enquiry regarding{' '}
                <strong>{selectedProperty?.name || 'Kumaon properties'}</strong> has been registered.
              </p>

              <div className="bg-ivory-100 p-4 rounded-xl text-xs text-stone-600 border border-gold-300/40 text-left max-w-md mx-auto space-y-2">
                <p className="font-semibold text-forest-900">
                  Official Correspondence Details:
                </p>

                <p>
                  Direct Phone:{' '}
                  <a
                    href={`tel:${companyData.contact.phoneCallable}`}
                    className="text-forest-950 font-bold underline"
                  >
                    {companyData.contact.phoneDisplay}
                  </a>
                </p>

                <p>
                  Consultancy Email:{' '}
                  <a
                    href={`mailto:${companyData.contact.email}`}
                    className="text-gold-700 underline font-medium"
                  >
                    {companyData.contact.email}
                  </a>
                </p>

                <p className="text-[11px] text-stone-500">
                  Mr. Prakash Chandra Joshi or our consultancy team will reach out directly to discuss verified property records and site visit arrangements.
                </p>
              </div>

              <button
                onClick={closeEnquiryModal}
                className="mt-4 px-6 py-2.5 rounded-xl bg-forest-900 text-white font-medium text-sm hover:bg-forest-800 transition"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Rawat"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Phone / Mobile Number *
                  </label>

                  <input
                    type="tel"
                    required
                    placeholder="+91 81262 01735"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="pcjpropertyconsultants23@gmail.com"
                    value={formData.emailAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, emailAddress: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Enquiry Type
                  </label>

                  <select
                    value={formData.enquiryType}
                    onChange={(e) =>
                      setFormData({ ...formData, enquiryType: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                  >
                    <option value="Property-Specific Enquiry">Property-Specific Enquiry</option>
                    <option value="Buying a Property">Buying a Property</option>
                    <option value="Land Enquiry">Land Enquiry (Nali / Bigha)</option>
                    <option value="Villa or Residential Property Enquiry">Villa / Residential Enquiry</option>
                    <option value="Commercial Property Enquiry">Commercial Property Enquiry</option>
                    <option value="Resort or Hospitality Property Enquiry">Resort / Hospitality Opportunity</option>
                    <option value="Selling a Property">Selling a Property Through PCJ</option>
                    <option value="General Consultation">General Property Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Preferred Location / Destination in Kumaon
                </label>

                <input
                  type="text"
                  placeholder="e.g. Nainital, Ranikhet, Mukteshwar, Sheetla, Corbett, Marchula..."
                  value={formData.preferredLocation}
                  onChange={(e) =>
                    setFormData({ ...formData, preferredLocation: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Enquiry Details & Specific Requirements
                </label>

                <textarea
                  rows={3}
                  placeholder="Describe your property interests, target budget bracket, or questions regarding land titles and site visits..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-gold-glow transition disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-gold-400" />
                      <span>Submit Property Enquiry</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-forest-700" />
                  Direct Phone: {companyData.contact.phoneDisplay}
                </span>

                <span>Email: {companyData.contact.email}</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
