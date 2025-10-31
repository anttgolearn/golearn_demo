import React from 'react';

type IllustrationProps = {
  className?: string;
  width?: number;
  height?: number;
};

const VideoPlaceholder: React.FC<IllustrationProps> = ({ className, width = 200, height = 120 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 120"
    width={width}
    height={height}
    className={className}
  >
    <rect x="0" y="0" width="200" height="120" rx="12" fill="#eef2ff" />
    <rect x="10" y="10" width="180" height="80" rx="10" fill="#c7d2fe" />
    <circle cx="26" cy="102" r="6" fill="#a5b4fc" />
    <rect x="40" y="96" width="120" height="12" rx="6" fill="#a5b4fc" opacity="0.6" />
    <polygon points="96,34 136,55 96,76" fill="#ffffff" />
  </svg>
);

export default VideoPlaceholder;


