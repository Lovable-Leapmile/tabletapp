import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a hex color string to an HSL string "H S% L%".
 */
export function hexToHsl(hex: string): string {
  if (!hex || typeof hex !== 'string') {
    return "0 0% 0%"; // Default to black if input is invalid
  }

  const sanitizedHex = hex.startsWith('#') ? hex.slice(1) : hex;

  if (!/^[0-9A-F]{6}$/i.test(sanitizedHex)) {
    return "0 0% 0%"; // Default to black if format is invalid
  }

  let r = parseInt(sanitizedHex.substring(0, 2), 16);
  let g = parseInt(sanitizedHex.substring(2, 4), 16);
  let b = parseInt(sanitizedHex.substring(4, 6), 16);

  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
}

/**
 * Calculates the relative luminance of a color (0-1)
 * Used to determine if a color is light or dark
 */
export function getLuminance(hex: string): number {
  if (!hex || typeof hex !== 'string') {
    return 0;
  }

  const sanitizedHex = hex.startsWith('#') ? hex.slice(1) : hex;

  if (!/^[0-9A-F]{6}$/i.test(sanitizedHex)) {
    return 0;
  }

  const r = parseInt(sanitizedHex.substring(0, 2), 16) / 255;
  const g = parseInt(sanitizedHex.substring(2, 4), 16) / 255;
  const b = parseInt(sanitizedHex.substring(4, 6), 16) / 255;

  // Convert RGB to relative luminance
  const [rs, gs, bs] = [r, g, b].map(val => {
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Determines if a color is light (returns true) or dark (returns false)
 */
export function isLightColor(hex: string): boolean {
  return getLuminance(hex) > 0.5;
}

/**
 * Gets appropriate text color (black or white) based on background color brightness
 */
export function getContrastTextColor(backgroundColor: string): string {
  return isLightColor(backgroundColor) ? '#000000' : '#FFFFFF';
}
