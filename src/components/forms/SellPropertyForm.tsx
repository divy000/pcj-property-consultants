
import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Building2, ShieldCheck, Lock } from 'lucide-react';
import { companyData } from '../../data/company';
import { supabase } from '../../lib/supabase';

interface SellPropertyFormProps {
  className?: string;
}

export const SellPropertyForm: React.FC<SellPropertyFormProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    emailAddress: '',
    propertyLocation: '',
    propertyCategory: 'Land / Plots (Nali / Bigha / Acres)',
    propertyArea: '',
    additionalInformation: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!formData.contactNumber.trim() && !formData.emailAddress.trim()) {
      setErrorMessage('Please provide your contact phone number or email.');
      return;
    }

    if (!formData.propertyLocation.trim()) {
      setErrorMessage('Please state the general property location in Kumaon.');
      return;
    }

    setIsSubmitting(true);

    const propertyMessage = [
      'ENQUIRY TYPE: Selling / Listing a Property',
      `Property Category: ${formData.propertyCategory}`,
      `Property Location: ${formData.propertyLocation.trim()}`,
      formData.propertyArea.trim()
        ? `Property Area: ${formData.propertyArea.trim()}`
        : '',
      formData.additionalInformation.trim()
        ? `Additional Information: ${formData.additionalInformation.trim()}`
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
          phone: formData.contactNumber.trim() || null,
          message: propertyMessage,
        });

      if (error) {
        console.error('Supabase property enquiry submission error:', error);
        throw error;
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Property enquiry submission failed:', error);

      setErrorMessage(
        error instanceof Error
          ? `Your property enquiry could not be submitted: ${error.message}`
          : 'Something went wrong while submitting your property enquiry. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`bg-white rounded-3xl p-8 sm:p-10 border border-gold-300/60 shadow-luxury text-center space-y-4 ${className}`}>
        <div className="w-14 h-14 rounded-full bg-forest-100 border border-forest-300 text-forest-800 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-forest-700" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
          Property Information Received
        </h3>

        <p className="text-sm sm:text-base text-stone-600 max-w-lg mx-auto leading-relaxed">
          Thank you, <strong>{formData.fullName}</strong>. Your property consultation request regarding your asset in <strong>{formData.propertyLocation}</strong> has been successfully submitted.
        </p>

        <div className="bg-ivory-50 p-4 rounded-xl text-xs text-stone-600 border border-gold-200 text-left max-w-md mx-auto space-y-1.5">
          <p className="font-semibold text-forest-900 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-gold-600" />
            Confidential Disposition Advisory
          </p>

          <p>
            PCJ Property Consultants does not publicly broadcast or auction owner properties on public portals. Mr. Prakash Chandra Joshi will review the details and contact you directly to discuss fair market positioning, documentation readiness, and potential verified buyers.
          </p>
        </div>

        <button
          onClick={() => {
            setIsSubmitted(false);
            setErrorMessage('');
            setFormData({
              fullName: '',
              contactNumber: '',
              emailAddress: '',
              propertyLocation: '',
              propertyCategory: 'Land / Plots (Nali / Bigha / Acres)',
              propertyArea: '',
              additionalInformation: '',
            });
          }}
          className="text-xs text-forest-800 font-semibold underline hover:text-forest-950 pt-2 block mx-auto"
        >
          Submit Another Property
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-luxury space-y-5 ${className}`}
    >
      <div className="border-b border-stone-100 pb-4">
        <span className="text-[11px] font-bold uppercase tracking-widest text-gold-600 block mb-1">
          Owner Advisory Services
        </span>

        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-forest-950">
          Sell or Represent Your Property with PCJ
        </h3>

        <p className="text-xs sm:text-sm text-stone-500 font-light mt-1">
          Connect with nearly three decades of regional buyer networks, clear revenue guidance, and discreet transaction facilitation.
        </p>
      </div>

      <div className="p-3 bg-ivory-100/80 rounded-xl text-xs text-stone-600 border border-gold-300/40 flex items-start gap-2.5">
        <Building2 className="w-4 h-4 text-gold-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Consultancy Process:</strong> This is a professional real estate advisory enquiry, not an automated public marketplace listing. All discussions regarding title, valuation, and prospective buyers are handled directly and confidentially by PCJ Property Consultants.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            Owner / Representative Full Name *
          </label>

          <input
            type="text"
            required
            placeholder="e.g. Anand Joshi"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 bg-ivory-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            Contact Phone / Mobile Number *
          </label>

          <input
            type="tel"
            required
            placeholder="+91 98765 43210"
            value={formData.contactNumber}
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 bg-ivory-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            Email Address
          </label>

          <input
            type="email"
            placeholder="owner@domain.com"
            value={formData.emailAddress}
            onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 bg-ivory-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            Property Category *
          </label>

          <select
            value={formData.propertyCategory}
            onChange={(e) => setFormData({ ...formData, propertyCategory: e.target.value })}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 bg-ivory-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition"
          >
            <option value="Land / Plots (Nali / Bigha / Acres)">Land / Plots (Nali / Bigha / Acres)</option>
            <option value="Agricultural Land / Orchard">Agricultural Land / Orchard Estate</option>
            <option value="Luxury Villa / Residential Cottage">Luxury Villa / Mountain Cottage</option>
            <option value="Heritage Property / Colonial Estate">Heritage Property / Colonial Estate</option>
            <option value="Farmhouse / Mountain Homestead">Farmhouse / Mountain Homestead</option>
            <option value="Commercial Land / Building">Commercial Land / Building</option>
            <option value="Resort / Hospitality Venture">Resort / Hospitality Venture</option>
            <option value="Large Land Parcel / Development Acreage">Large Development Parcel</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            Property Location in Kumaon *
          </label>

          <input
            type="text"
            required
            placeholder="e.g. Ranikhet, Mukteshwar, Nainital, Ramgarh, Almora..."
            value={formData.propertyLocation}
            onChange={(e) => setFormData({ ...formData, propertyLocation: e.target.value })}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 bg-ivory-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            Property Area (if known)
          </label>

          <input
            type="text"
            placeholder="e.g. 50 Nali, 2 Acres, 10 Bigha, 5,000 sq ft..."
            value={formData.propertyArea}
            onChange={(e) => setFormData({ ...formData, propertyArea: e.target.value })}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 bg-ivory-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
          Additional Property Information & Title Notes
        </label>

        <textarea
          rows={3}
          placeholder="Briefly describe the road access, views, water/electricity availability, title type (single owner, freehold), or any specific terms..."
          value={formData.additionalInformation}
          onChange={(e) => setFormData({ ...formData, additionalInformation: e.target.value })}
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 bg-ivory-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-gold-glow transition disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Sending Details...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-gold-400" />
              <span>Submit Property for Confidential Review</span>
            </>
          )}
        </button>
      </div>

      <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-forest-700" />
          Direct Representation by Mr. Prakash Chandra Joshi
        </span>

        <span>No upfront public listings</span>
      </div>
    </form>
  );
};
