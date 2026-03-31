import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import App from "./App.tsx";
import "./index.css";
import "./scroll-utilities.css";
import ThemeProvider from "./components/ThemeProvider";

// PWA: Guard service worker registration against iframe/preview contexts
const isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
})();

const isPreviewHost =
  window.location.hostname.includes("id-preview--") ||
  window.location.hostname.includes("lovableproject.com");

if (isPreviewHost || isInIframe) {
  // Unregister any existing service workers in preview/iframe contexts
  navigator.serviceWorker?.getRegistrations().then((registrations) => {
    registrations.forEach((r) => r.unregister());
  });
}

// Handle touch events to prevent unwanted behaviors
const handleTouchEvents = () => {
  // Prevent double-tap zoom
  let lastTouchEnd = 0;
  
  const preventZoom = (e: TouchEvent) => {
    const t2 = e.timeStamp;
    const t1 = (e.target as any).lastTouch || t2;
    const dt = t2 - t1;
    if (dt > 0 && dt < 500) {
      e.preventDefault();
    }
    (e.target as any).lastTouch = t2;
  };

  // Prevent double-tap zoom
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });

  // Prevent pinch zoom
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });
};

// Initialize touch events
handleTouchEvents();

// Enable pull-to-refresh on mobile
if ('overscrollBehavior' in document.documentElement.style) {
  document.documentElement.style.overscrollBehaviorY = 'auto';
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
