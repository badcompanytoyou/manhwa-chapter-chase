
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  linkTo?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md',
  linkTo 
}) => {
  const sizeClasses = {
    sm: 'w-24',
    md: 'w-32',
    lg: 'w-48'
  };

  const LogoContent = (
    <img 
      src="/lovable-uploads/59c75a81-a316-487d-95d2-a804b0103a0a.png" 
      alt="Manhwa Lover" 
      className={`${sizeClasses[size]}`}
    />
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
