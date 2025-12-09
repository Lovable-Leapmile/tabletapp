declare global {
  interface Window {
    Capacitor: {
      isNativePlatform: () => boolean;
      Plugins: {
        App: {
          addListener: (eventName: string, listenerFunc: () => void) => void;
          removeAllListeners: (eventName: string) => void;
        };
      };
    };
  }
}

export {};
