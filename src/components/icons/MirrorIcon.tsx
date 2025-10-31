import React from 'react';

type IconProps = {
  className?: string;
  size?: number;
  color?: string;
};

const MirrorIcon: React.FC<IconProps> = ({ className, size = 24, color = '#4f46e5' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
  >
    <defs>
      <linearGradient id="mirror_grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#eef2ff" />
        <stop offset="100%" stopColor="#c7d2fe" />
      </linearGradient>
    </defs>
    <rect x="3" y="4" width="18" height="16" rx="3" fill="url(#mirror_grad)" />
    <rect x="3" y="4" width="18" height="16" rx="3" fill="none" stroke={color} strokeOpacity=".18" />
    <path d="M12 5v14" stroke={color} strokeOpacity=".35" />
    <path d="M6 8l3 2-3 2 3 2-3 2" stroke={color} strokeOpacity=".65" strokeLinecap="round" />
    <path d="M18 8l-3 2 3 2-3 2 3 2" stroke={color} strokeOpacity=".65" strokeLinecap="round" />
  </svg>
);

export default MirrorIcon;


