import React from 'react';

type IllustrationProps = {
  className?: string;
  width?: number;
  height?: number;
};

const LessonPlaceholder: React.FC<IllustrationProps> = ({ className, width = 400, height = 400 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 400 400"
    width={width}
    height={height}
    className={className}
  >
    <defs>
      <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#dbeafe" />
        <stop offset="100%" stopColor="#bfdbfe" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="400" height="400" rx="24" fill="url(#grad)"/>
    <g opacity="0.09">
      <circle cx="320" cy="80" r="56" fill="#2563eb" />
      <circle cx="64" cy="300" r="36" fill="#1d4ed8" />
      <circle cx="340" cy="320" r="24" fill="#60a5fa" />
      <circle cx="100" cy="84" r="20" fill="#93c5fd" />
    </g>
    <g>
      <rect x="64" y="120" width="272" height="160" rx="16" fill="#ffffff" />
      <rect x="64" y="296" width="140" height="16" rx="8" fill="#3b82f6" opacity="0.25" />
      <rect x="64" y="320" width="220" height="12" rx="6" fill="#3b82f6" opacity="0.2" />
    </g>
    <g>
      <path d="M160 184c8-20 24-36 44-40 36-8 72 24 68 60-4 36-36 60-76 56-20-2-36-10-48-24" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="2" />
      <circle cx="152" cy="214" r="10" fill="#60a5fa" />
      <circle cx="188" cy="206" r="10" fill="#60a5fa" />
      <circle cx="220" cy="206" r="10" fill="#60a5fa" />
      <circle cx="252" cy="214" r="10" fill="#60a5fa" />
    </g>
  </svg>
);

export default LessonPlaceholder;


