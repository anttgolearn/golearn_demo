import React from 'react';

type IconProps = {
  className?: string;
  size?: number;
  color?: string;
};

const StrongIcon: React.FC<IconProps> = ({ className, size = 48, color = '#ef4444' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
  >
    <defs>
      <linearGradient id="arm_grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fecaca" />
        <stop offset="100%" stopColor="#fca5a5" />
      </linearGradient>
    </defs>
    <g>
      <path d="M28 36c0-6 8-18 20-16s12 20 8 27c-4 7-24 17-32 5-5.59-8.384-2.431-16 4-16z" fill="url(#arm_grad)" stroke={color} strokeOpacity=".25" strokeWidth="2" />
      <ellipse cx="36" cy="56" rx="16" ry="6" fill={color} opacity=".10" />
      <rect x="14" y="38" width="16" height="14" rx="7" fill="url(#arm_grad)" stroke={color} strokeOpacity=".25" strokeWidth="2" />
      <ellipse cx="22" cy="50" rx="8" ry="3" fill="#ef4444" opacity=".08"/>
    </g>
  </svg>
);

export default StrongIcon;
