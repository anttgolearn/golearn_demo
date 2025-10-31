import React from 'react';

type IconProps = {
  className?: string;
  size?: number;
  color?: string;
};

const InfoIcon: React.FC<IconProps> = ({ className, size = 24, color = '#3b82f6' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
  >
    <defs>
      <linearGradient id="info_grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#bfdbfe" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#info_grad)" />
    <circle cx="12" cy="12" r="10" fill="#fff" opacity="0.08" />
    <circle cx="12" cy="8" r="1.4" fill="#ffffff" />
    <rect x="11" y="10.2" width="2" height="6.2" rx="1" fill="#ffffff" />
    <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeOpacity=".12" />
  </svg>
);

export default InfoIcon;


