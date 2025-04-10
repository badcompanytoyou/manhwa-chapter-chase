
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onFinish, 
  duration = 2000 
}) => {
  const [visible, setVisible] = useState(true);
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onFinish]);

  if (!visible) return null;

  // For now, use the same logo for both themes
  // When new dark theme logos are provided, we'll update this
  const logoSrc = "/lovable-uploads/59c75a81-a316-487d-95d2-a804b0103a0a.png";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-[#1a1a1a] z-50">
      <div className="w-64 sm:w-80 md:w-96 animate-pulse-gentle">
        <img 
          src={logoSrc}
          alt="Manhwa Lover" 
          className="w-full"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
