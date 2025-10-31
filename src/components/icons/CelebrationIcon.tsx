import React from 'react';

type IconProps = {
  className?: string;
  size?: number;
  color?: string;
};

const CelebrationIcon: React.FC<IconProps> = ({ className, size = 48, color = '#F59E0B' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
  >
    <defs>
      <linearGradient id="cele_grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
    </defs>
    <g>
      <path fill="url(#cele_grad)" d="M59 6l-3 2 2-3-3-1-1 3V7l-2 3h-2l1-3-2-2-2 2 1 3-3-1-2 3 2 3 3-1v2l3 2 2-2-1-3h2l2-3z"/>
      <circle cx="45" cy="9" r="6" fill="#FDE68A" opacity=".6" />
      <path d="M25 35L8 56l5-18z" fill="#FDBA74" stroke="#F59E0B" strokeWidth="2"/>
      <path d="M8 56l18-5L25 35z" fill="#FB7185" stroke="#F59E0B" strokeWidth="2"/>
      <path d="M26 36c11 12 18 14 29 9" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round"/>
    </g>
  </svg>
);

export default CelebrationIcon;
