import React from 'react';

type IconProps = {
  className?: string;
  size?: number;
  color?: string; // primary color override
};

const CheckCircleIcon: React.FC<IconProps> = ({ className, size = 20, color = '#16a34a' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
  >
    <defs>
      <linearGradient id="check_grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#86efac" />
        <stop offset="100%" stopColor="#22c55e" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#check_grad)" />
    <circle cx="12" cy="12" r="10" fill="#fff" opacity="0.08" />
    <path d="M8 12.5l2.3 2.4L16.5 9.2" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeOpacity=".12" />
  </svg>
);

export default CheckCircleIcon;


