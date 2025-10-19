import React from 'react';

type QuizButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'error' 
  | 'disabled';

interface QuizButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: QuizButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  testId?: string;
}

export const QuizButton: React.FC<QuizButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'lg',
  className = '',
  testId = 'quiz-button',
}) => {
  const baseClasses = "font-bold transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg min-h-[36px] min-w-[120px]",
    md: "px-6 py-3 text-base rounded-xl min-h-[40px] min-w-[140px]",
    lg: "px-8 py-4 text-lg rounded-xl min-h-[44px] min-w-[175px]",
  };

  const variantClasses = {
    primary: disabled 
      ? "bg-gray-300 text-gray-500" 
      : "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: disabled
      ? "bg-gray-200 text-gray-400 border border-gray-300"
      : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-400",
    success: disabled
      ? "bg-gray-300 text-gray-500"
      : "bg-green-600 hover:bg-green-700 text-white",
    error: disabled
      ? "bg-gray-300 text-gray-500"
      : "bg-red-600 hover:bg-red-700 text-white",
    disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
  };

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || variant === 'disabled'}
      data-testid={testId}
    >
      {children}
    </button>
  );
};

export default QuizButton;
