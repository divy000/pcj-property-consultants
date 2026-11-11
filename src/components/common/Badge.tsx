import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'forest' | 'ivory' | 'outline';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  className = '',
  size = 'md',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs sm:text-sm';

  const variantClasses = {
    gold: 'bg-gold-500/15 text-gold-700 border border-gold-400/30',
    forest: 'bg-forest-900/10 text-forest-800 border border-forest-800/20',
    ivory: 'bg-white/90 text-stone-800 border border-stone-200/60 shadow-sm',
    outline: 'bg-transparent text-stone-600 border border-stone-300',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full tracking-wide transition-all ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
};
