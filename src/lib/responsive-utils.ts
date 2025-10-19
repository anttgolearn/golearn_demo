// Responsive utility functions for consistent scaling across components

export const getResponsiveDimensions = () => {
  // Standard dimensions that scale consistently across screen sizes
  return {
    // Container dimensions
    containerMaxWidth: 'max-w-4xl',
    containerPadding: 'px-4',
    
    // Video/Media dimensions
    videoHeight: 'h-64', // 256px - consistent across all video elements
    videoAspectRatio: 'aspect-[4/3]',
    
    // Button dimensions
    buttonPadding: 'px-8 py-5',
    buttonTextSize: 'text-lg',
    buttonHeight: 'h-16',
    
    // Card dimensions
    cardPadding: 'px-6 py-4',
    cardBorderRadius: 'rounded-xl',
    cardBorder: 'border-2',
    
    // Icon dimensions
    iconSize: 'w-12 h-12',
    iconSizeSmall: 'w-8 h-8',
    
    // Text dimensions
    headingSize: 'text-xl',
    bodyTextSize: 'text-lg',
    labelTextSize: 'text-sm',
    
    // Spacing
    sectionSpacing: 'mb-8',
    elementSpacing: 'gap-6',
    gridGap: 'gap-4',
    
    // Grid layouts
    gridCols: 'grid-cols-1 sm:grid-cols-2',
    gridColsSingle: 'grid-cols-1',
  };
};

export const getConsistentClasses = (component: 'container' | 'video' | 'button' | 'card' | 'text') => {
  const dims = getResponsiveDimensions();
  
  switch (component) {
    case 'container':
      return `${dims.containerMaxWidth} mx-auto ${dims.containerPadding}`;
    
    case 'video':
      return `w-full ${dims.videoHeight} ${dims.cardBorderRadius} ${dims.cardBorder}`;
    
    case 'button':
      return `${dims.buttonPadding} ${dims.buttonHeight} ${dims.cardBorderRadius} ${dims.buttonTextSize} font-bold transition-all duration-200 hover:scale-105 active:scale-95`;
    
    case 'card':
      return `${dims.cardPadding} ${dims.cardBorderRadius} ${dims.cardBorder}`;
    
    case 'text':
      return `${dims.headingSize} font-bold`;
    
    default:
      return '';
  }
};

// Responsive breakpoint utilities
export const responsiveClasses = {
  // Mobile first approach
  mobile: {
    container: 'w-full px-4',
    grid: 'grid-cols-1',
    text: 'text-lg',
    spacing: 'gap-4 mb-6',
  },
  
  // Tablet and up
  tablet: {
    container: 'sm:w-full sm:px-6',
    grid: 'sm:grid-cols-2',
    text: 'sm:text-xl',
    spacing: 'sm:gap-6 sm:mb-8',
  },
  
  // Desktop
  desktop: {
    container: 'lg:max-w-4xl lg:mx-auto',
    grid: 'lg:grid-cols-2',
    text: 'lg:text-2xl',
    spacing: 'lg:gap-8 lg:mb-10',
  },
};

// Animation utilities for consistent transitions
export const animationClasses = {
  fadeIn: 'animate-fade-in',
  scale: 'hover:scale-105 active:scale-95',
  smooth: 'transition-all duration-200',
  bounce: 'hover:scale-110 active:scale-95',
};

// Color scheme utilities
export const colorClasses = {
  correct: {
    bg: 'bg-green-50',
    border: 'border-green-500',
    text: 'text-green-700',
    button: 'bg-green-600 hover:bg-green-700',
  },
  incorrect: {
    bg: 'bg-red-50',
    border: 'border-red-500',
    text: 'text-red-700',
    button: 'bg-red-600 hover:bg-red-700',
  },
  neutral: {
    bg: 'bg-gray-50',
    border: 'border-gray-300',
    text: 'text-gray-700',
    button: 'bg-blue-600 hover:bg-blue-700',
  },
};
