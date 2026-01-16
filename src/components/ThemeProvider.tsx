// src/components/ThemeProvider.tsx

import React, { useEffect } from 'react';
import { getSkin } from '../config/skin.config';
import { hexToHsl, getContrastTextColor, isLightColor } from '@/lib/utils';

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const applyTheme = () => {
      const skin = getSkin();
      const root = document.documentElement;

      const applyColor = (variable: string, color: string | undefined) => {
        if (!color) return; // Skip if color is undefined
        // If color starts with '#', convert it from HEX to HSL. Otherwise, assume it's already an HSL string.
        const value = color.startsWith('#') ? hexToHsl(color) : color;
        root.style.setProperty(variable, value);
      };

      // Base colors
      applyColor('--background', skin.colors.background);
      applyColor('--foreground', skin.colors.foreground);
      
      // Primary colors
      applyColor('--primary', skin.colors.primary);
      applyColor('--primary-foreground', skin.colors.primaryForeground);
      applyColor('--primary-hover', skin.colors.primaryHover || skin.colors.primary);
      applyColor('--primary-active', skin.colors.primaryActive || skin.colors.primary);
      
      // Secondary colors
      applyColor('--secondary', skin.colors.secondary);
      applyColor('--secondary-foreground', skin.colors.secondaryForeground);
      applyColor('--secondary-hover', skin.colors.secondaryHover || skin.colors.secondary);
      applyColor('--secondary-active', skin.colors.secondaryActive || skin.colors.secondary);
      
      // Accent colors
      applyColor('--accent', skin.colors.accent);
      applyColor('--accent-foreground', skin.colors.accentForeground);
      
      // Destructive colors
      applyColor('--destructive', skin.colors.destructive);
      applyColor('--destructive-foreground', skin.colors.destructiveForeground);
      
      // Status colors
      applyColor('--success', skin.colors.success);
      applyColor('--warning', skin.colors.warning);
      applyColor('--error', skin.colors.error);
      applyColor('--info', skin.colors.info);
      
      // Text colors
      applyColor('--text-primary', skin.colors.textPrimary);
      applyColor('--text-secondary', skin.colors.textSecondary);
      applyColor('--text-tertiary', skin.colors.textTertiary);
      
      // Background colors
      applyColor('--background-secondary', skin.colors.backgroundSecondary);
      applyColor('--background-tertiary', skin.colors.backgroundTertiary);
      
      // Border and input
      applyColor('--border', skin.colors.border);
      applyColor('--input', skin.colors.input);
      applyColor('--ring', skin.colors.ring);
      
      // Card
      applyColor('--card', skin.colors.card);
      applyColor('--card-foreground', skin.colors.cardForeground);
      
      // Popover
      applyColor('--popover', skin.colors.popover);
      applyColor('--popover-foreground', skin.colors.popoverForeground);
      
      // Muted
      applyColor('--muted', skin.colors.muted);
      applyColor('--muted-foreground', skin.colors.mutedForeground);
      
      // Support colors (brand-specific)
      if (skin.colors.support) {
        applyColor('--support', skin.colors.support);
        applyColor('--support-foreground', getContrastTextColor(skin.colors.support));
      }

      // Dynamic text colors based on background
      applyColor('--dynamic-text-on-primary', getContrastTextColor(skin.colors.primary));
      applyColor('--dynamic-text-on-secondary', getContrastTextColor(skin.colors.secondary));
      applyColor('--dynamic-text-on-background', getContrastTextColor(skin.colors.background));
      
      // Icon colors - use destructive/support for accent icons, or primary if appropriate
      const iconAccentColor = skin.colors.support || skin.colors.destructive || skin.colors.error;
      applyColor('--icon-accent', iconAccentColor);
      applyColor('--icon-accent-foreground', getContrastTextColor(iconAccentColor));
    };

    // Apply theme immediately
    applyTheme();

    // Watch for changes in the environment variable (for development)
    const checkInterval = setInterval(() => {
      applyTheme();
    }, 1000);

    return () => clearInterval(checkInterval);
  }, []);

  return <>{children}</>;
};

export default ThemeProvider;
