import React from 'react';

type IconProps = {
  className?: string;
  size?: number;
  color?: string;
};

const XCircleIcon: React.FC<IconProps> = ({ className, size = 20, color = '#ef4444' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
  >
    <defs>
      <linearGradient id="x_grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fecaca" />
        <stop offset="100%" stopColor="#f87171" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#x_grad)" />
    <circle cx="12" cy="12" r="10" fill="#fff" opacity="0.08" />
    <path d="M9 9l6 6M15 9l-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeOpacity=".12" />
  </svg>
);

export default XCircleIcon;


