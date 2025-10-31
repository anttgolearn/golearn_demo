import React from 'react';

type IconProps = {
  className?: string;
  size?: number;
  color?: string;
};

const HandIcon: React.FC<IconProps> = ({ className, size = 48, color = '#f59e0b' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
  >
    <defs>
      <linearGradient id="hand_grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="100%" stopColor="#fcd34d" />
      </linearGradient>
    </defs>
    <g>
      <rect x="25" y="10" width="14" height="36" rx="7" fill="url(#hand_grad)" stroke={color} strokeOpacity=".25" />
      <rect x="12" y="20" width="11" height="28" rx="6" fill="url(#hand_grad)" stroke={color} strokeOpacity=".25" />
      <rect x="41" y="20" width="11" height="28" rx="6" fill="url(#hand_grad)" stroke={color} strokeOpacity=".25" />
      <ellipse cx="32" cy="54" rx="16" ry="6" fill={color} opacity=".12" />
    </g>
  </svg>
);

export default HandIcon;
