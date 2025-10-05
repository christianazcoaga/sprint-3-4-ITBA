import React from 'react';

const Logo = ({ size = 'medium', variant = 'default', className = '' }) => {
  const sizeClasses = {
    small: 'logo-small',
    medium: 'logo-medium',
    large: 'logo-large',
    xlarge: 'logo-xlarge'
  };

  const variantClasses = {
    default: 'logo-default',
    white: 'logo-white',
    dark: 'logo-dark',
    colored: 'logo-colored'
  };

  return (
    <div className={`logo-container ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      <img 
        src="/images/logo.svg" 
        alt="Hermanos Jota Logo" 
        className="logo-img"
      />
      <span className="logo-text">Hermanos Jota</span>
    </div>
  );
};

export default Logo;
