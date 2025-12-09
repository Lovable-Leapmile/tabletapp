import { useEffect } from 'react';
import { useBackHandler } from '@/utils/backHandler';

interface BackHandlerProviderProps {
  children: React.ReactNode;
}

export const BackHandlerProvider = ({ children }: BackHandlerProviderProps) => {
  const { setupBackHandler, removeBackHandler } = useBackHandler();

  useEffect(() => {
    // Only setup back handler on native platforms (Android/iOS)
    if (window.Capacitor && window.Capacitor.isNativePlatform()) {
      setupBackHandler();
      
      return () => {
        removeBackHandler();
      };
    }
  }, [setupBackHandler, removeBackHandler]);

  return <>{children}</>;
};
