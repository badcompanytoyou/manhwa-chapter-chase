
import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onFinish, 
  duration = 2000 
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onFinish]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
      <div className="w-64 sm:w-80 md:w-96 animate-pulse-gentle">
        <img 
          src="/lovable-uploads/59c75a81-a316-487d-95d2-a804b0103a0a.png" 
          alt="Manhwa Lover" 
          className="w-full"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
