
import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { companyData } from '../../data/company';
import { supabase } from '../../lib/supabase';

interface GeneralEnquiryFormProps {
  initialType?: string;
  className?: string;
}

export const GeneralEnquiryForm: React.FC<GeneralEnquiryFormProps> = ({
  initialType = 'Buying a Property',
  className = '',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    enquiryType: initialType,
    preferredLocation: '',
    message: '',
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

    if (!formData.phoneNumber.trim() && !formData.emailAddress.trim()) {
      setErrorMessage('Please provide either your phone number or email address.');
      return;
    }

    setIsSubmitting(true);

    const enquiryMessage = [
      `Enquiry Type: ${formData.enquiryType}`,
      formData.preferredLocation.trim()
        ? `Preferred Location: ${formData.preferredLocation.trim()}`
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
        console.error('Supabase enquiry submission error:', error);
        throw error;
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Enquiry submission failed:', error);

      setErrorMessage(
        error instanceof Error
          ? `Your enquiry could not be submitted: ${error.message}`
          : 'Something went wrong while submitting your enquiry. Please try again.'
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
          Enquiry Received with Thanks
        </h3>

        <p className="text-sm sm:text-base text-stone-600 max-w-lg mx-auto leading-relaxed">
          Thank you, <strong>{formData.fullName}</strong>. Your consultation enquiry has been successfully submitted. Mr. Prakash Chandra Joshi or our consultancy team will respond promptly.
        </p>

        <div className="bg-ivory-50 p-4 rounded-xl text-xs text-stone-600 border border-gold-200 text-left max-w-md mx-auto space-y-1">
          <p className="font-semibold text-forest-900">Direct Email Confirmation:</p>
          <p>
            Official Consultancy Email:{' '}
            <a href={`mailto:${companyData.contact.email}`} className="text-gold-700 font-medium underline">
              {companyData.contact.email}
            </a>
          </p>
        </div>

        <button
          onClick={() => {
            setIsSubmitted(false);
            setErrorMessage('');
            setFormData({
              fullName: '',
              phoneNumber: '',
              emailAddress: '',
              enquiryType: initialType,
              preferredLocation: '',
              message: '',
            });
          }}
          className="text-xs text-forest-800 font-semibold underline hover:text-forest-950 pt-2 block mx-auto"
        >
          Submit Another Consultation Request
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
          Direct Advisory Channel
        </span>

        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-forest-950">
          Request a Confidential Consultation
        </h3>

        <p className="text-xs sm:text-sm text-stone-500 font-light mt-1">
          Whether you are exploring land acquisition, luxury cottages, or hospitality development in Kumaon.
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
            Full Name *
          </label>

          <input
            type="text"
            required
            placeholder="e.g. Vikramaditya Rawat"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 bg-ivory-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            Phone / Mobile Number *
          </label>

          <input
            type="tel"
            required
            placeholder="+91 98765 43210"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
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
            placeholder="name@domain.com"
            value={formData.emailAddress}
            onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 bg-ivory-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            Enquiry Type
          </label>

          <select
            value={formData.enquiryType}
            onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 bg-ivory-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition"
          >
            <option value="Buying a Property">Buying a Property</option>
            <option value="Selling a Property">Selling a Property Through PCJ</option>
            <option value="Land Enquiry">Land Enquiry (Nali / Bigha Parcels)</option>
            <option value="Villa or Residential Property Enquiry">Villa / Residential Cottage Enquiry</option>
            <option value="Commercial Property Enquiry">Commercial Property Enquiry</option>
            <option value="Resort or Hospitality Property Enquiry">Resort / Hospitality Opportunity</option>
            <option value="General Consultation">General Property Consultation</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
          Preferred Location in Kumaon
        </label>

        <input
          type="text"
          placeholder="e.g. Nainital, Ranikhet, Mukteshwar, Sheetla, Kausani, Corbett..."
          value={formData.preferredLocation}
          onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 bg-ivory-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
          Your Message & Particular Requirements
        </label>

        <textarea
          rows={4}
          placeholder="Share your specific criteria, preferred terrain/elevation, intended property use, or timeline..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
              <span>Submitting Enquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-gold-400" />
              <span>Submit Consultation Request</span>
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 pt-2 gap-2">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-forest-700" />
          Strictly Confidential • Factual Guidance Guaranteed
        </span>

        <span>
          Official Email:{' '}
          <a href={`mailto:${companyData.contact.email}`} className="text-gold-700 underline font-medium">
            {companyData.contact.email}
          </a>
        </span>
      </div>
    </form>
  );
};
