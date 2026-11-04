import React from 'react';

export const TomatoGraphic: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="tomGrad1" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#ff6b6b" />
        <stop offset="60%" stopColor="#e02424" />
        <stop offset="100%" stopColor="#9b1c1c" />
      </radialGradient>
      <radialGradient id="tomGrad2" cx="35%" cy="30%" r="55%">
        <stop offset="0%" stopColor="#ff7675" />
        <stop offset="70%" stopColor="#d63031" />
        <stop offset="100%" stopColor="#741a1a" />
      </radialGradient>
      <radialGradient id="sliceGrad" cx="50%" cy="50%" r="50%">
        <stop offset="60%" stopColor="#ff4d4f" />
        <stop offset="85%" stopColor="#cf1322" />
        <stop offset="100%" stopColor="#820014" />
      </radialGradient>
      <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.18" />
      </filter>
    </defs>
    {/* Shadow */}
    <ellipse cx="100" cy="175" rx="75" ry="14" fill="#000" opacity="0.12" />
    
    {/* Left Tomato */}
    <g filter="url(#shadow)">
      <circle cx="70" cy="115" r="50" fill="url(#tomGrad1)" />
      {/* Specular highlight */}
      <ellipse cx="55" cy="85" rx="14" ry="7" transform="rotate(-30 55 85)" fill="#fff" opacity="0.45" />
      <circle cx="48" cy="100" r="4" fill="#fff" opacity="0.3" />
    </g>

    {/* Right Tomato */}
    <g filter="url(#shadow)">
      <circle cx="135" cy="120" r="46" fill="url(#tomGrad2)" />
      <ellipse cx="125" cy="95" rx="12" ry="6" transform="rotate(-25 125 95)" fill="#fff" opacity="0.4" />
    </g>

    {/* Front Tomato Slice */}
    <g transform="translate(65, 125) rotate(-12)">
      <ellipse cx="38" cy="28" rx="36" ry="24" fill="url(#sliceGrad)" stroke="#ff7875" strokeWidth="2.5" />
      {/* Seeds and internal chambers */}
      <ellipse cx="26" cy="22" rx="8" ry="5" fill="#a8071a" />
      <circle cx="25" cy="21" r="2" fill="#ffd666" />
      <ellipse cx="50" cy="24" rx="8" ry="5" fill="#a8071a" />
      <circle cx="49" cy="23" r="2" fill="#ffd666" />
      <ellipse cx="38" cy="36" rx="9" ry="5" fill="#a8071a" />
      <circle cx="38" cy="35" r="2" fill="#ffd666" />
    </g>

    {/* Green calyx and vine stems */}
    <g fill="#2b8a3e" stroke="#237804" strokeWidth="1.5" strokeLinejoin="round">
      {/* Left Calyx */}
      <path d="M70 65 C68 55 62 48 56 46 C64 50 67 58 70 65 Z" fill="#389e0d" />
      <path d="M70 65 C74 54 82 48 88 47 C81 52 76 58 70 65 Z" fill="#2b8a3e" />
      <path d="M70 65 C60 62 50 64 44 68 C52 66 62 66 70 65 Z" fill="#237804" />
      <path d="M70 65 C78 63 88 66 94 70 C86 67 76 66 70 65 Z" fill="#389e0d" />
      {/* Main stem */}
      <path d="M70 65 Q72 45 78 35" stroke="#389e0d" strokeWidth="4" strokeLinecap="round" fill="none" />
      
      {/* Right Calyx */}
      <path d="M135 74 C132 64 126 58 120 56 C128 60 131 68 135 74 Z" fill="#389e0d" />
      <path d="M135 74 C140 65 148 60 154 59 C147 64 142 69 135 74 Z" fill="#2b8a3e" />
      <path d="M135 74 Q136 60 142 50" stroke="#389e0d" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </g>
  </svg>
);

export const OnionGraphic: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="onionGrad" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#d946ef" />
        <stop offset="40%" stopColor="#a21caf" />
        <stop offset="85%" stopColor="#701a75" />
        <stop offset="100%" stopColor="#4a044e" />
      </radialGradient>
      <radialGradient id="onionSmallGrad" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#e879f9" />
        <stop offset="50%" stopColor="#c026d3" />
        <stop offset="100%" stopColor="#581c87" />
      </radialGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="100" cy="172" rx="70" ry="12" fill="#000" opacity="0.12" />

    {/* Back small onion */}
    <g transform="translate(110, 85)">
      <path
        d="M20 0 C40 10 50 35 50 55 C50 78 35 90 20 90 C5 90 -10 78 -10 55 C-10 35 0 10 20 0 Z"
        fill="url(#onionSmallGrad)"
      />
      {/* Root tuft */}
      <path d="M18 90 Q20 100 22 105 M20 90 Q16 100 14 104" stroke="#d4b185" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* Main front onion */}
    <g>
      <path
        d="M80 35 C115 50 130 85 130 115 C130 152 105 168 80 168 C55 168 30 152 30 115 C30 85 45 50 80 35 Z"
        fill="url(#onionGrad)"
      />
      {/* Onion skin striping texture */}
      <path d="M80 35 Q105 90 105 160" stroke="#f0abfc" strokeWidth="1.2" opacity="0.35" fill="none" />
      <path d="M80 35 Q120 95 120 135" stroke="#f0abfc" strokeWidth="1.2" opacity="0.35" fill="none" />
      <path d="M80 35 Q55 90 55 160" stroke="#f0abfc" strokeWidth="1.2" opacity="0.35" fill="none" />
      <path d="M80 35 Q40 95 40 135" stroke="#f0abfc" strokeWidth="1.2" opacity="0.35" fill="none" />
      
      {/* Specular gloss */}
      <ellipse cx="60" cy="90" rx="12" ry="30" transform="rotate(-25 60 90)" fill="#fff" opacity="0.25" />

      {/* Top dried neck */}
      <path d="M80 35 Q82 20 85 12 Q78 18 76 34" fill="#a16207" stroke="#78350f" strokeWidth="1.5" />
      <path d="M83 15 Q86 6 92 2" stroke="#65a30d" strokeWidth="2.5" strokeLinecap="round" />

      {/* Bottom root fibers */}
      <path d="M78 168 Q75 180 72 186 M80 168 Q80 182 82 188 M83 168 Q87 180 89 185" stroke="#d4b185" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

export const PotatoGraphic: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="potGrad1" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="35%" stopColor="#eab308" />
        <stop offset="80%" stopColor="#ca8a04" />
        <stop offset="100%" stopColor="#854d0e" />
      </radialGradient>
      <radialGradient id="potGrad2" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#fef9c3" />
        <stop offset="40%" stopColor="#facc15" />
        <stop offset="85%" stopColor="#a16207" />
        <stop offset="100%" stopColor="#713f12" />
      </radialGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="100" cy="170" rx="75" ry="12" fill="#000" opacity="0.12" />

    {/* Back Potato */}
    <g transform="translate(90, 80) rotate(15)">
      <ellipse cx="40" cy="35" rx="42" ry="32" fill="url(#potGrad2)" />
      {/* Eyes */}
      <ellipse cx="30" cy="25" rx="3" ry="1.5" fill="#713f12" opacity="0.5" />
      <ellipse cx="55" cy="40" rx="4" ry="2" fill="#713f12" opacity="0.5" />
    </g>

    {/* Front Main Potato */}
    <g transform="translate(25, 80) rotate(-8)">
      <path
        d="M25 45 C25 20 50 15 80 18 C110 20 125 35 125 60 C125 85 105 102 75 102 C45 102 25 80 25 45 Z"
        fill="url(#potGrad1)"
      />
      {/* Subtle highlight */}
      <ellipse cx="55" cy="38" rx="28" ry="14" fill="#fff" opacity="0.22" />
      {/* Potato eyes / dots */}
      <ellipse cx="45" cy="42" rx="4" ry="2" fill="#78350f" opacity="0.6" />
      <ellipse cx="80" cy="35" rx="3" ry="1.5" fill="#78350f" opacity="0.6" />
      <ellipse cx="95" cy="65" rx="4" ry="2" fill="#78350f" opacity="0.6" />
      <ellipse cx="50" cy="75" rx="3.5" ry="1.8" fill="#78350f" opacity="0.6" />
      <ellipse cx="70" cy="60" rx="2.5" ry="1.2" fill="#78350f" opacity="0.5" />
    </g>
  </svg>
);

export const CarrotGraphic: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="carrotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fb923c" />
        <stop offset="40%" stopColor="#f97316" />
        <stop offset="85%" stopColor="#ea580c" />
        <stop offset="100%" stopColor="#c2410c" />
      </linearGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="100" cy="172" rx="65" ry="10" fill="#000" opacity="0.12" />

    {/* Green leafy tops */}
    <g stroke="#15803d" strokeWidth="3" strokeLinecap="round">
      <path d="M65 50 Q50 30 35 20 M50 35 Q40 28 32 35 M58 40 Q45 42 40 50" />
      <path d="M75 45 Q70 20 65 10 M72 28 Q60 22 55 28 M73 22 Q78 16 85 18" />
      <path d="M82 48 Q95 25 110 15 M90 32 Q100 28 108 34 M94 38 Q105 40 112 48" />
    </g>

    {/* Main Carrot Body */}
    <g transform="translate(60, 45) rotate(24)">
      <path
        d="M10 0 C25 -2 38 -2 50 0 C48 40 38 90 28 135 C27 138 25 138 24 135 C18 90 12 40 10 0 Z"
        fill="url(#carrotGrad)"
      />
      {/* Natural horizontal ridges */}
      <path d="M14 20 Q30 24 45 20" stroke="#c2410c" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 42 Q30 46 42 43" stroke="#c2410c" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 68 Q30 71 39 69" stroke="#c2410c" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M22 95 Q29 98 35 96" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Specular edge highlight */}
      <path d="M15 15 Q20 65 24 110" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
    </g>
  </svg>
);

export const FarmBasketIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="basketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#d97706" />
        <stop offset="60%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>
      <linearGradient id="basketRim" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    
    {/* Ground shadow */}
    <ellipse cx="160" cy="225" rx="120" ry="14" fill="#000" opacity="0.15" />

    {/* Overflowing fresh vegetables behind basket rim */}
    {/* Cabbage/Greens */}
    <circle cx="105" cy="115" r="32" fill="#15803d" />
    <path d="M90 100 Q105 110 120 95" stroke="#86efac" strokeWidth="2.5" fill="none" />
    <path d="M85 115 Q105 125 125 115" stroke="#86efac" strokeWidth="2.5" fill="none" />

    {/* Eggplant */}
    <path d="M190 85 C210 90 225 110 220 130 C215 145 195 150 180 135 C170 120 175 95 190 85 Z" fill="#581c87" />
    <ellipse cx="205" cy="85" rx="8" ry="4" fill="#15803d" />

    {/* Red Tomatoes */}
    <circle cx="140" cy="120" r="26" fill="#ef4444" />
    <circle cx="175" cy="125" r="24" fill="#dc2626" />
    <circle cx="132" cy="112" r="6" fill="#fff" opacity="0.4" />
    <circle cx="168" cy="118" r="5" fill="#fff" opacity="0.4" />

    {/* Yellow Bell Pepper */}
    <circle cx="215" cy="120" r="22" fill="#eab308" />

    {/* Carrots sticking out */}
    <g transform="translate(60, 80) rotate(-35)">
      <path d="M0 0 L14 -4 L8 45 Z" fill="#ea580c" />
      <path d="M5 -15 L7 0 M12 -12 L10 0" stroke="#16a34a" strokeWidth="2" />
    </g>
    <g transform="translate(230, 95) rotate(30)">
      <path d="M0 0 L12 -3 L6 40 Z" fill="#f97316" />
      <path d="M6 -12 L6 0 M10 -10 L8 0" stroke="#16a34a" strokeWidth="2" />
    </g>

    {/* Basket Body */}
    <path
      d="M60 140 C65 200 90 220 160 220 C230 220 255 200 260 140 Z"
      fill="url(#basketGrad)"
    />

    {/* Woven basket texture lines */}
    <path d="M80 145 C85 190 100 215 160 215" stroke="#78350f" strokeWidth="3" opacity="0.4" fill="none" />
    <path d="M240 145 C235 190 220 215 160 215" stroke="#78350f" strokeWidth="3" opacity="0.4" fill="none" />
    <path d="M68 165 C100 175 220 175 252 165" stroke="#fef3c7" strokeWidth="2.5" opacity="0.3" fill="none" />
    <path d="M78 190 C110 200 210 200 242 190" stroke="#fef3c7" strokeWidth="2.5" opacity="0.3" fill="none" />

    {/* Basket Rim */}
    <ellipse cx="160" cy="140" rx="104" ry="15" fill="url(#basketRim)" stroke="#78350f" strokeWidth="2.5" />
  </svg>
);

export const DOORS_FRESH_LOGO_URL = '/assets/aistudio/Doors__991a8f46.png';

export interface DoorsFreshLogoProps {
  className?: string;
  withText?: boolean;
  variant?: 'image' | 'badge' | 'icon' | 'banner';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  subtitle?: string;
  dark?: boolean;
}

/**
 * Doors Fresh Brand Logo component featuring the official brand identity:
 * "Doors Fresh" with doorway typography and fresh organic leaf accents.
 */
export const DoorsFreshLogo: React.FC<DoorsFreshLogoProps> = ({
  className = '',
  withText = false,
  variant = 'badge',
  size = 'md',
  subtitle = 'Fresh Farm to Your Door',
  dark = false,
}) => {
  // Dimension presets
  const sizeClasses = {
    xs: 'h-5',
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-12',
    xl: 'h-16',
  }[size];

  if (variant === 'icon') {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${className || 'w-10 h-10'}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Rounded background */}
          <rect width="100" height="100" rx="24" fill="#052e16" />
          <rect x="2" y="2" width="96" height="96" rx="22" stroke="#22c55e" strokeWidth="2.5" strokeOpacity="0.4" />
          
          {/* Stylized Double Doorway Leaf Motif */}
          {/* Left Door Frame */}
          <path d="M22 28 H46 V72 H22 Z" fill="#15803d" />
          {/* Open Door Swinging in 3D */}
          <path d="M46 28 L30 35 V77 L46 72 Z" fill="#22c55e" stroke="#86efac" strokeWidth="1.5" />
          {/* Door Handle */}
          <circle cx="34" cy="56" r="2.5" fill="#fef08a" />
          
          {/* Right Frame & Sprout Leaf */}
          <path d="M52 28 H76 V72 H52 Z" fill="#166534" />
          {/* Fresh Sprout Leaf on top */}
          <path
            d="M48 28 C48 16 62 10 74 12 C72 26 58 32 48 28 Z"
            fill="#84cc16"
          />
          {/* Leaf vein */}
          <path d="M52 25 Q64 18 70 14" stroke="#d9f99d" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Fresh Swoop underline */}
          <path
            d="M20 84 Q50 82 78 88"
            stroke="#a3e635"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'image') {
    return (
      <img
        src={DOORS_FRESH_LOGO_URL}
        alt="Doors Fresh"
        className={`${sizeClasses} w-auto object-contain ${className}`}
      />
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`flex flex-col items-start ${className}`}>
        <div className={`inline-flex items-center ${dark ? 'bg-white/95 px-4 py-2 rounded-2xl shadow-sm' : ''}`}>
          <img
            src={DOORS_FRESH_LOGO_URL}
            alt="Doors Fresh"
            className="h-12 sm:h-14 w-auto object-contain drop-shadow-2xs"
          />
        </div>
        {withText && (
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-white bg-emerald-700 px-2 py-0.5 rounded-md shadow-2xs">
              Agri-Tech
            </span>
            <span className="text-xs font-semibold text-emerald-800 tracking-tight">
              {subtitle}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Default / Badge variant: Clean presentation of the authentic Doors Fresh logo
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div
        className={`flex items-center justify-center shrink-0 ${
          dark
            ? 'bg-white/95 px-3 py-1.5 rounded-xl shadow-xs border border-white/80'
            : 'bg-white px-2.5 py-1 rounded-xl border border-emerald-100 shadow-2xs'
        }`}
      >
        <img
          src={DOORS_FRESH_LOGO_URL}
          alt="Doors Fresh"
          className={`${sizeClasses} w-auto object-contain max-h-full`}
        />
      </div>
      {withText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Agri-Tech
            </span>
          </div>
          <span className="text-[10px] text-emerald-800 font-medium tracking-tight mt-1">
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );
};

// Backwards-compatible alias for existing components
export const WishoreLogo = DoorsFreshLogo;
