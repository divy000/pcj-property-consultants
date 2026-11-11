import React from 'react';

interface MountainDividerProps {
  light?: boolean;
  className?: string;
}

export const MountainDivider: React.FC<MountainDividerProps> = ({ light = false, className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 py-3 select-none ${className}`}>
      <span className={`h-px w-12 sm:w-20 ${light ? 'bg-gold-400/40' : 'bg-gold-500/30'}`} />
      <div className="flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rotate-45 ${light ? 'bg-gold-300' : 'bg-gold-600'}`} />
        <svg
          className={`w-5 h-4 ${light ? 'text-gold-300' : 'text-gold-600'}`}
          viewBox="0 0 24 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 14L8 4L13 11L17 6L22 14H2Z" />
        </svg>
        <span className={`w-1.5 h-1.5 rotate-45 ${light ? 'bg-gold-300' : 'bg-gold-600'}`} />
      </div>
      <span className={`h-px w-12 sm:w-20 ${light ? 'bg-gold-400/40' : 'bg-gold-500/30'}`} />
    </div>
  );
};
