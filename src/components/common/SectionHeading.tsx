import React from 'react';
import { MountainDivider } from './MountainDivider';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  return (
    <div className={`flex flex-col max-w-3xl mb-12 sm:mb-16 ${alignmentClasses} ${className}`}>
      {eyebrow && (
        <span
          className={`text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 ${
            light ? 'text-gold-300' : 'text-forest-700'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight ${
          light ? 'text-ivory-50' : 'text-forest-950'
        }`}
      >
        {title}
      </h2>
      <MountainDivider light={light} className="my-2" />
      {subtitle && (
        <p
          className={`text-base sm:text-lg leading-relaxed max-w-2xl font-light ${
            light ? 'text-ivory-200' : 'text-stone-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
