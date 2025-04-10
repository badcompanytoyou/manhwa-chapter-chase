
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'next-themes';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  linkTo?: string;
  variant?: 'full' | 'compact';
  background?: 'white' | 'green' | 'transparent';
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md',
  linkTo,
  variant = 'full',
  background = 'transparent'
}) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';
  
  const sizeClasses = {
    sm: variant === 'full' ? 'w-24' : 'w-16',
    md: variant === 'full' ? 'w-32' : 'w-24',
    lg: variant === 'full' ? 'w-48' : 'w-32'
  };

  const backgroundClasses = {
    white: 'bg-white p-2 rounded',
    green: 'bg-[#b3ff49] p-2 rounded',
    transparent: ''
  };

  // For now, use the same logos for both themes
  // When new dark theme logos are provided, we'll update this logic
  const logoSrc = variant === 'full' 
    ? "/lovable-uploads/59c75a81-a316-487d-95d2-a804b0103a0a.png" 
    : "/lovable-uploads/975310e0-6263-4c67-a5e9-529456a1e657.png";

  const LogoContent = (
    <div className={backgroundClasses[background]}>
      <img 
        src={logoSrc}
        alt="Manhwa Lover" 
        className={`${sizeClasses[size]}`}
      />
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="inline-block">
        {LogoContent}
      </Link>
    );
  }

  return LogoContent;
};

export default Logo;
