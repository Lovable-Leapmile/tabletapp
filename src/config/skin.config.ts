// Multi-skin configuration for the application
// Controlled via VITE_DEPLOYMENT_CSS_SKIN environment variable

export type SkinType = 'LEAPMILE_UI' | 'DHL_UI' | 'BIAL_UI' | 'AMS_UI';

export interface SkinColors {
  // HSL values without hsl() wrapper for CSS variables
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  background: string;
  foreground: string;
  accent: string;
  accentForeground: string;
  muted: string;
  mutedForeground: string;
  card: string;
  cardForeground: string;
  border: string;
  ring: string;
  destructive: string;
  destructiveForeground: string;
  // Additional skin-specific colors
  headerBackground: string;
  headerBorder: string;
  headerText: string;
  loginBackground: string;
}

export interface SkinConfig {
  name: string;
  logoUrl: string;
  colors: SkinColors;
}

// Convert hex to HSL values (returns "h s% l%" format)
const hexToHsl = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0 0% 0%';
  
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};

// DHL UI - Default theme (current theme)
const DHL_SKIN: SkinConfig = {
  name: 'DHL Supply Chain',
  logoUrl: 'https://kombijdhl.nl/wp-content/uploads/2024/04/DHL_Supply_Chain_logo_rgb_BG.png',
  colors: {
    primary: '48 100% 50%', // DHL Yellow
    primaryForeground: '0 0% 20%',
    secondary: '0 0% 96%',
    secondaryForeground: '0 0% 20%',
    background: '0 0% 98%',
    foreground: '0 0% 20%',
    accent: '48 100% 50%',
    accentForeground: '0 0% 20%',
    muted: '0 0% 94%',
    mutedForeground: '0 0% 45%',
    card: '0 0% 100%',
    cardForeground: '0 0% 20%',
    border: '0 0% 90%',
    ring: '48 100% 50%',
    destructive: '355 98% 43%', // DHL Red
    destructiveForeground: '0 0% 100%',
    headerBackground: '48 100% 50%', // Yellow header
    headerBorder: '355 98% 43%', // Red border
    headerText: '355 98% 43%', // Red text
    loginBackground: '48 100% 50%', // Yellow login bg
  },
};

// LEAPMILE UI
const LEAPMILE_SKIN: SkinConfig = {
  name: 'Leapmile',
  logoUrl: 'https://leapmile-website.blr1.digitaloceanspaces.com/leapmile.png',
  colors: {
    primary: hexToHsl('#351C75'), // Purple primary
    primaryForeground: '0 0% 100%',
    secondary: hexToHsl('#8E7CC3'), // Light purple
    secondaryForeground: '0 0% 100%',
    background: '0 0% 100%', // White
    foreground: hexToHsl('#121212'), // Dark text
    accent: hexToHsl('#351C75'),
    accentForeground: '0 0% 100%',
    muted: '0 0% 96%',
    mutedForeground: '0 0% 45%',
    card: '0 0% 100%',
    cardForeground: hexToHsl('#121212'),
    border: '0 0% 90%',
    ring: hexToHsl('#351C75'),
    destructive: '0 84% 60%',
    destructiveForeground: '0 0% 100%',
    headerBackground: hexToHsl('#351C75'), // Purple header
    headerBorder: hexToHsl('#8E7CC3'), // Light purple border
    headerText: '0 0% 100%', // White text on purple
    loginBackground: hexToHsl('#351C75'), // Purple login bg
  },
};

// BIAL UI
const BIAL_SKIN: SkinConfig = {
  name: 'BIAL Airport',
  logoUrl: 'https://www.airport-suppliers.com/wp-content/uploads/2021/11/Kempegowda_International_Airport_Bengaluru_Logo.svg.png',
  colors: {
    primary: hexToHsl('#0A6B71'), // Teal primary
    primaryForeground: '0 0% 100%',
    secondary: hexToHsl('#4BAAA2'), // Light teal
    secondaryForeground: '0 0% 100%',
    background: '0 0% 100%', // White
    foreground: hexToHsl('#121212'),
    accent: hexToHsl('#0A6B71'),
    accentForeground: '0 0% 100%',
    muted: '0 0% 96%',
    mutedForeground: '0 0% 45%',
    card: '0 0% 100%',
    cardForeground: hexToHsl('#121212'),
    border: '0 0% 90%',
    ring: hexToHsl('#0A6B71'),
    destructive: '0 84% 60%',
    destructiveForeground: '0 0% 100%',
    headerBackground: hexToHsl('#0A6B71'), // Teal header
    headerBorder: hexToHsl('#4BAAA2'), // Light teal border
    headerText: '0 0% 100%', // White text
    loginBackground: hexToHsl('#0A6B71'), // Teal login bg
  },
};

// AMS UI
const AMS_SKIN: SkinConfig = {
  name: 'AMS',
  logoUrl: 'https://oemfile.informamarkets-info.com/FileUpload/2024MTV_37144/20240603133615187.png',
  colors: {
    primary: hexToHsl('#D40029'), // Red primary
    primaryForeground: '0 0% 100%',
    secondary: hexToHsl('#121C3F'), // Dark blue
    secondaryForeground: '0 0% 100%',
    background: hexToHsl('#E6E7E8'), // Light grey bg
    foreground: hexToHsl('#121212'),
    accent: hexToHsl('#D40029'),
    accentForeground: '0 0% 100%',
    muted: hexToHsl('#6D6E71'), // Support grey
    mutedForeground: '0 0% 100%',
    card: '0 0% 100%',
    cardForeground: hexToHsl('#121212'),
    border: '0 0% 85%',
    ring: hexToHsl('#D40029'),
    destructive: hexToHsl('#D40029'),
    destructiveForeground: '0 0% 100%',
    headerBackground: hexToHsl('#121C3F'), // Dark blue header
    headerBorder: hexToHsl('#D40029'), // Red border
    headerText: '0 0% 100%', // White text
    loginBackground: hexToHsl('#121C3F'), // Dark blue login bg
  },
};

// Skin registry
const SKINS: Record<SkinType, SkinConfig> = {
  DHL_UI: DHL_SKIN,
  LEAPMILE_UI: LEAPMILE_SKIN,
  BIAL_UI: BIAL_SKIN,
  AMS_UI: AMS_SKIN,
};

// Get current skin from environment variable
export const getCurrentSkinType = (): SkinType => {
  const skinEnv = import.meta.env.VITE_DEPLOYMENT_CSS_SKIN as string;
  if (skinEnv && skinEnv in SKINS) {
    return skinEnv as SkinType;
  }
  return 'DHL_UI'; // Default fallback
};

// Get current skin configuration
export const getCurrentSkin = (): SkinConfig => {
  return SKINS[getCurrentSkinType()];
};

// Get logo URL for current skin
export const getLogoUrl = (): string => {
  return getCurrentSkin().logoUrl;
};

// Get skin name
export const getSkinName = (): string => {
  return getCurrentSkin().name;
};

// Check if current skin is DHL (for backward compatibility with yellow theme)
export const isDhlSkin = (): boolean => {
  return getCurrentSkinType() === 'DHL_UI';
};

// Apply skin CSS variables to document root
export const applySkinStyles = (): void => {
  const skin = getCurrentSkin();
  const root = document.documentElement;
  
  // Apply all color variables
  Object.entries(skin.colors).forEach(([key, value]) => {
    const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    root.style.setProperty(cssVarName, value);
  });
};

export default SKINS;
