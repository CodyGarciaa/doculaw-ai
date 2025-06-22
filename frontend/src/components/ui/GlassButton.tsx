import React from 'react';
import { Link } from 'react-router-dom';

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
  // Base glass effect styles
  const baseStyles = 'relative overflow-hidden font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center whitespace-nowrap backdrop-blur-sm border';
  
  // Size styles
  const sizeStyles = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4'
  };

  // Variant styles with glass morphism effect
  const variantStyles = {
    primary: 'text-white font-semibold bg-gradient-to-br from-blue-500/90 to-purple-600/90 border-white/20 hover:from-blue-400/95 hover:to-purple-500/95 shadow-lg shadow-blue-500/25',
    secondary: 'text-gray-900 font-medium bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200/30 hover:from-white/90 hover:to-gray-50/90 shadow-lg shadow-gray-500/10',
    ghost: 'text-white font-medium bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:from-white/20 hover:to-white/10 shadow-lg shadow-black/10'
  };

  // Glass shine effect overlay
  const shineOverlay = (
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
  );

  const buttonClasses = `group ${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl active:scale-95'}`;

  const buttonContent = (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {shineOverlay}
      <span className="relative z-10">{children}</span>
    </button>
  );

  // Handle different button types
  if (href) {
    return (
      <a href={href} className="inline-block">
        <div className={buttonClasses.replace('button', 'div')}>
          {shineOverlay}
          <span className="relative z-10">{children}</span>
        </div>
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className="inline-block">
        <div className={buttonClasses.replace('button', 'div')}>
          {shineOverlay}
          <span className="relative z-10">{children}</span>
        </div>
      </Link>
    );
  }

  return buttonContent;
};

export default GlassButton; 