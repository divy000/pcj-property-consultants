import React from 'react';
import { Info, ShieldAlert } from 'lucide-react';
import { companyData } from '../../data/company';

interface DisclaimerNoticeProps {
  type?: 'property' | 'imagery' | 'general' | 'all';
  className?: string;
  compact?: boolean;
}

export const DisclaimerNotice: React.FC<DisclaimerNoticeProps> = ({
  type = 'property',
  className = '',
  compact = false,
}) => {
  if (compact) {
    return (
      <div className={`flex items-start gap-2 text-xs text-stone-500 bg-ivory-100/80 p-2.5 rounded-lg border border-gold-300/30 ${className}`}>
        <Info className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {companyData.disclaimers.propertyConfirmation}
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-ivory-100 to-ivory-50 border border-gold-300/40 rounded-xl p-4 sm:p-5 text-stone-600 ${className}`}>
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm space-y-1.5 leading-relaxed">
          <p className="font-semibold text-forest-900 tracking-wide">
            Official Advisory & Factual Transparency
          </p>
          {(type === 'property' || type === 'all') && (
            <p>
              <strong className="text-stone-800">Availability:</strong> {companyData.disclaimers.propertyConfirmation}
            </p>
          )}
          {(type === 'imagery' || type === 'all') && (
            <p>
              <strong className="text-stone-800">Visual Presentation:</strong> {companyData.disclaimers.illustrativeImagery}
            </p>
          )}
          {type === 'all' && (
            <p>
              <strong className="text-stone-800">Geographical Scope:</strong> {companyData.disclaimers.approximateLocations}
            </p>
          )}
          {type === 'all' && (
            <p>
              <strong className="text-stone-800">Scope of Work:</strong> {companyData.disclaimers.noRentalServices}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
