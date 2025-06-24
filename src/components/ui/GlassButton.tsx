import React from 'react';
import { Link } from 'react-router-dom';
import LiquidGlass from 'liquid-glass-react';

interface GlassButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  to?: string;
}

const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  href,
  to
}) => {
  // Base styles for the button content
  const baseStyles = 'font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center whitespace-nowrap';
  
  // Size styles
  const sizeStyles = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4'
  };

  // Variant styles for the inner content
  const variantStyles = {
    primary: 'text-white font-semibold',
    secondary: 'text-gray-900 font-medium',
    ghost: 'text-white font-medium'
  };

  // Liquid glass configuration based on variant
  const glassConfig = {
    primary: {
      displacementScale: 45,
      blurAmount: 0.08,
      saturation: 120,
      aberrationIntensity: 1.5,
      elasticity: 0.25,
      cornerRadius: 8,
      overLight: false
    },
    secondary: {
      displacementScale: 35,
      blurAmount: 0.05,
      saturation: 100,
      aberrationIntensity: 1,
      elasticity: 0.15,
      cornerRadius: 8,
      overLight: true
    },
    ghost: {
      displacementScale: 40,
      blurAmount: 0.1,
      saturation: 90,
      aberrationIntensity: 2,
      elasticity: 0.3,
      cornerRadius: 8,
      overLight: false
    }
  };

  const buttonContent = (
    <div className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );

  // Get the original button class based on variant
  const originalButtonClass = variant === 'primary' ? 'btn-primary' : 
                              variant === 'secondary' ? 'btn-secondary' : 
                              'btn-ghost';

  const glassButton = (
    <LiquidGlass
      {...glassConfig[variant]}
      onClick={onClick}
      className={`${originalButtonClass} ${sizeStyles[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: variant === 'primary' 
          ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(99, 102, 241, 0.95) 50%, rgba(139, 92, 246, 0.95) 100%)'
          : variant === 'secondary'
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.95) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        border: variant === 'ghost' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
        borderRadius: '8px'
      }}
    >
      {children}
    </LiquidGlass>
  );

  // Handle different button types - preserve original structure
  if (href) {
    return (
      <a href={href}>
        {glassButton}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to}>
        {glassButton}
      </Link>
    );
  }

  return glassButton;
};

export default GlassButton; 