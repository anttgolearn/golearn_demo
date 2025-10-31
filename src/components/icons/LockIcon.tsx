import React from 'react';

type IconProps = {
  className?: string;
  size?: number;
  color?: string;
};

const LockIcon: React.FC<IconProps> = ({ className, size = 24, color = '#ffffff' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
  >
    <defs>
      <linearGradient id="lock_grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e0e7ff" />
        <stop offset="100%" stopColor="#c7d2fe" />
      </linearGradient>
    </defs>
    <rect x="4" y="10" width="16" height="10" rx="3" fill="url(#lock_grad)" opacity=".25" />
    <rect x="4" y="10" width="16" height="10" rx="3" fill="none" stroke={color} strokeOpacity=".85" strokeWidth="1.6" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke={color} strokeOpacity=".85" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="15" r="1.3" fill={color} />
  </svg>
);

export default LockIcon;


