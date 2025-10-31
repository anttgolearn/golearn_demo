import React from 'react';

type IconProps = {
  className?: string;
  size?: number;
  color?: string;
};

const WarningIcon: React.FC<IconProps> = ({ className, size = 24, color = '#f59e0b' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
  >
    <defs>
      <linearGradient id="warn_grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
    </defs>
    <path d="M12.94 3.78l8.16 14.12a1.5 1.5 0 0 1-1.3 2.25H4.2a1.5 1.5 0 0 1-1.3-2.25L11.06 3.78a1.5 1.5 0 0 1 1.88 0z" fill="url(#warn_grad)" stroke={color} strokeOpacity=".2" />
    <rect x="11" y="8.5" width="2" height="7" rx="1" fill="#7c2d12" opacity=".8" />
    <circle cx="12" cy="17.3" r="1.2" fill="#7c2d12" opacity=".9" />
  </svg>
);

export default WarningIcon;


