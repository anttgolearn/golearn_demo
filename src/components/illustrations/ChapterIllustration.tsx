import React from 'react';

type ChapterIllustrationProps = {
  className?: string;
  width?: number;
  height?: number;
  variant?: 'greetings' | 'family' | 'numbers' | 'emotions' | 'default';
};

const palette: Record<string, { a: string; b: string; accent: string }> = {
  greetings: { a: '#dbeafe', b: '#bfdbfe', accent: '#2563eb' },
  family: { a: '#e0e7ff', b: '#c7d2fe', accent: '#4f46e5' },
  numbers: { a: '#dcfce7', b: '#bbf7d0', accent: '#16a34a' },
  emotions: { a: '#ffe4e6', b: '#fecdd3', accent: '#e11d48' },
  default: { a: '#f3f4f6', b: '#e5e7eb', accent: '#6b7280' },
};

const ChapterIllustration: React.FC<ChapterIllustrationProps> = ({ className, width = 160, height = 160, variant = 'default' }) => {
  const colors = palette[variant] || palette.default;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 160"
      width={width}
      height={height}
      className={className}
    >
      <defs>
        <linearGradient id={`chap_grad_${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colors.a} />
          <stop offset="100%" stopColor={colors.b} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="160" height="160" rx="16" fill={`url(#chap_grad_${variant})`} />
      <g opacity=".12">
        <circle cx="128" cy="28" r="18" fill={colors.accent} />
        <circle cx="28" cy="130" r="12" fill={colors.accent} />
        <circle cx="142" cy="118" r="8" fill={colors.accent} />
        <circle cx="42" cy="24" r="7" fill={colors.accent} />
      </g>
      <g>
        <rect x="20" y="36" width="120" height="74" rx="12" fill="#fff" />
        <rect x="20" y="114" width="60" height="10" rx="5" fill={colors.accent} opacity=".25" />
        <rect x="20" y="130" width="92" height="8" rx="4" fill={colors.accent} opacity=".18" />
        <circle cx="56" cy="72" r="10" fill={colors.a} />
        <circle cx="80" cy="72" r="10" fill={colors.a} />
        <circle cx="104" cy="72" r="10" fill={colors.a} />
        <path d="M36 92c24 10 64 10 88 0" fill="none" stroke={colors.accent} strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
};

export default ChapterIllustration;


