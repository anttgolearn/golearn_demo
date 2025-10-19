import React from 'react';

interface IncorrectIconProps {
  size?: number;
  className?: string;
}

export const IncorrectIcon: React.FC<IncorrectIconProps> = ({ 
  size = 24, 
  className = "" 
}) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Red circle background */}
        <circle cx="22" cy="22" r="22" fill="#ef4444" />
        {/* White X */}
        <path
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m15.75 8.25-7.5 7.5m7.5 0-7.5-7.5"
        />
      </svg>
    </div>
  );
};

export default IncorrectIcon;
