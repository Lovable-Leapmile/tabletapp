import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import App from "./App.tsx";
import "./index.css";
import "./scroll-utilities.css";
import ThemeProvider from "./components/ThemeProvider";

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

// Request fullscreen on mobile devices
const requestFullScreen = () => {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen().catch(err => {
      console.log(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else if ((elem as any).webkitRequestFullscreen) { /* Safari */
    (elem as any).webkitRequestFullscreen();
  } else if ((elem as any).msRequestFullscreen) { /* IE11 */
    (elem as any).msRequestFullscreen();
  }
};

// Attempt fullscreen on user interaction
const handleFirstUserInteraction = () => {
  ['click', 'touchstart'].forEach(event => {
    document.addEventListener(event, () => {
      requestFullScreen();
    }, { once: true });
  });
};

// Initialize fullscreen on user interaction
handleFirstUserInteraction();

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
