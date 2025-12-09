import { useNavigate, useLocation } from 'react-router-dom';

export const useBackHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackButton = () => {
    // Get current path
    const currentPath = location.pathname;
    
    // Define root paths where back should exit app
    const rootPaths = ['/login', '/dashboard', '/'];
    
    if (rootPaths.includes(currentPath)) {
      // If on root page, let the app handle back (will exit app)
      return false;
    } else {
      // Otherwise, navigate back
      navigate(-1);
      return true; // Prevent default back behavior
    }
  };

  const setupBackHandler = () => {
    // Add hardware back button listener for Android
    if (window.Capacitor && window.Capacitor.isNativePlatform()) {
      // Use the Capacitor App plugin if available
      if (window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
        window.Capacitor.Plugins.App.addListener('backButton', handleBackButton);
      }
    }
  };

  const removeBackHandler = () => {
    // Remove the listener when component unmounts
    if (window.Capacitor && window.Capacitor.isNativePlatform()) {
      if (window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
        window.Capacitor.Plugins.App.removeAllListeners('backButton');
      }
    }
  };

  return {
    setupBackHandler,
    removeBackHandler,
    handleBackButton
  };
};
