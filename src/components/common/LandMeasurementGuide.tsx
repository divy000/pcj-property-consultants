import React, { useState } from 'react';
import { Ruler, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export const LandMeasurementGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white/80 border border-gold-300/40 rounded-xl overflow-hidden shadow-sm transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 sm:px-6 py-3.5 flex items-center justify-between text-left hover:bg-ivory-100/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-forest-900/5 flex items-center justify-center text-forest-800">
            <Ruler className="w-4 h-4 text-gold-600" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-medium text-forest-950 flex items-center gap-2">
              Kumaon Mountain Land Units Explained (Nali & Bigha)
              <span className="text-xs font-normal text-gold-700 bg-gold-50 px-2 py-0.5 rounded-full border border-gold-200">
                Quick Guide
              </span>
            </h4>
            <p className="text-xs text-stone-500 hidden sm:block">
              Understanding Uttarakhand land terminology for outstation and institutional investors
            </p>
          </div>
        </div>
        <div className="text-stone-400">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-4 sm:px-6 pb-5 pt-2 border-t border-gold-200/40 bg-ivory-50/50">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm mt-2">
            <div className="bg-white p-3.5 rounded-lg border border-stone-200">
              <span className="text-gold-700 font-semibold uppercase tracking-wider text-[11px] block mb-1">
                Hill Unit
              </span>
              <p className="font-serif text-lg font-bold text-forest-950">1 Nali</p>
              <p className="text-stone-600 mt-1">
                = <strong>2,160 sq. ft.</strong> (approx. 240 sq. yards / 200.7 sq. meters)
              </p>
              <p className="text-[11px] text-stone-500 mt-1.5">
                Standard land measurement unit across the Kumaon hills.
              </p>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-stone-200">
              <span className="text-gold-700 font-semibold uppercase tracking-wider text-[11px] block mb-1">
                Acre Equivalent
              </span>
              <p className="font-serif text-lg font-bold text-forest-950">1 Acre = 20 Nali</p>
              <p className="text-stone-600 mt-1">
                = <strong>43,560 sq. ft.</strong> (approx. 4,047 sq. meters)
              </p>
              <p className="text-[11px] text-stone-500 mt-1.5">
                A 100 Nali holding equals approximately 5 full acres.
              </p>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-stone-200">
              <span className="text-gold-700 font-semibold uppercase tracking-wider text-[11px] block mb-1">
                Foothill / Plain Unit
              </span>
              <p className="font-serif text-lg font-bold text-forest-950">1 Bigha (Corbett / Terai)</p>
              <p className="text-stone-600 mt-1">
                = <strong>~6,800 to 9,000 sq. ft.</strong> (approx. 3.1 to 4.1 Nali)
              </p>
              <p className="text-[11px] text-stone-500 mt-1.5">
                Utilized predominantly in the Ramnagar, Corbett, and foothill belts.
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-stone-500">
            <Sparkles className="w-3.5 h-3.5 text-gold-600 shrink-0" />
            <span>
              PCJ Property Consultants provides complete boundary verification, revenue demarcation, and title clearance assistance for all acquisitions.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
