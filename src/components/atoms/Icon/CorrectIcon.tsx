import React from 'react';

interface CorrectIconProps {
  size?: number;
  className?: string;
}

export const CorrectIcon: React.FC<CorrectIconProps> = ({ 
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
        {/* Green circle background */}
        <circle cx="22" cy="22" r="22" fill="#22c55e" />
        {/* White checkmark */}
        <path
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 22.714 19.2 27 29 17"
        />
      </svg>
    </div>
  );
};

export default CorrectIcon;
