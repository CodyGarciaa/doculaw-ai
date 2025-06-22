import React from 'react';

interface ScrollIndicatorProps {
  scrollPercentage: number;
  isVisible: boolean;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ scrollPercentage, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
      {/* Scroll position indicator */}
      <div
        className="absolute left-0 w-1 bg-legal-500 opacity-75 transition-all duration-200 rounded-r"
        style={{
          top: `${scrollPercentage}%`,
          height: '20px',
          transform: 'translateY(-50%)',
        }}
      />
      
      {/* Visual connection line */}
      <div
        className="absolute right-0 w-1 bg-legal-500 opacity-75 transition-all duration-200 rounded-l"
        style={{
          top: `${scrollPercentage}%`,
          height: '20px',
          transform: 'translateY(-50%)',
        }}
      />
      
      {/* Horizontal connection line */}
      <div
        className="absolute w-full h-0.5 bg-legal-500 opacity-30 transition-all duration-200"
        style={{
          top: `${scrollPercentage}%`,
          transform: 'translateY(-50%)',
        }}
      />
    </div>
  );
};

export default ScrollIndicator; 