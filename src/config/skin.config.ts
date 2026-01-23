// src/config/skin.config.ts

// Import local logo assets
import dhlLogo from "@/assets/dhl-logo.png";

interface Skin {
  logo: string;
  colors: {
    // Base colors
    background: string;
    foreground: string;

    // Primary colors
    primary: string;
    primaryForeground: string;
    primaryHover?: string;
    primaryActive?: string;

    // Secondary colors
    secondary: string;
    secondaryForeground: string;
    secondaryHover?: string;
    secondaryActive?: string;

    // Accent colors
    accent: string;
    accentForeground: string;

    // Destructive colors
    destructive: string;
    destructiveForeground: string;

    // Status colors
    success: string;
    warning: string;
    error: string;
    info: string;

    // Text colors
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;

    // Background colors
    backgroundSecondary: string;
    backgroundTertiary: string;

    // Border and input
    border: string;
    input: string;
    ring: string;

    // Card
    card: string;
    cardForeground: string;

    // Popover
    popover: string;
    popoverForeground: string;

    // Muted
    muted: string;
    mutedForeground: string;

    // Support colors (brand-specific)
    support?: string;

    // Button states
    buttonHover?: string;
    buttonActive?: string;
    buttonDisabled?: string;
    buttonTextDisabled?: string;
  };

  // Typography
  typography: {
    fontFamily: string;
    fontSizeBase: string;
    lineHeightBase: string;
  };

  // Spacing
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    [key: string]: string;
  };

  // Border radius
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
    [key: string]: string;
  };
}

const skins: Record<string, Skin> = {
  LEAPMILE_UI: {
    logo: "https://leapmile-website.blr1.digitaloceanspaces.com/leapmile.png",
    colors: {
      // Base colors
      background: "#FFFFFF",
      foreground: "#121212",

      // Primary colors
      primary: "#351C75",
      primaryForeground: "#FFFFFF",
      primaryHover: "#2A1760",
      primaryActive: "#1F1147",

      // Secondary colors
      secondary: "#8E7CC3",
      secondaryForeground: "#FFFFFF",
      secondaryHover: "#7D6BAF",
      secondaryActive: "#6C5A9B",

      // Accent colors
      accent: "#8E7CC3",
      accentForeground: "#FFFFFF",

      // Destructive colors
      destructive: "#DC2626",
      destructiveForeground: "#FFFFFF",

      // Status colors
      success: "#16A34A",
      warning: "#F59E0B",
      error: "#DC2626",
      info: "#3B82F6",

      // Text colors
      textPrimary: "#121212",
      textSecondary: "#4B5563",
      textTertiary: "#6B7280",

      // Background colors
      backgroundSecondary: "#F9FAFB",
      backgroundTertiary: "#F3F4F6",

      // Border and input
      border: "#E5E7EB", // Light gray border
      input: "#FFFFFF", // White input background
      ring: "#0A6B71", // Primary color for focus rings

      // Card
      card: "#FFFFFF",
      cardForeground: "#121212",

      // Popover
      popover: "#FFFFFF",
      popoverForeground: "#121212",

      // Muted
      muted: "#F3F4F6",
      mutedForeground: "#6B7280",

      // Support color (brand-specific)
      support: "#351C75",

      // Button states
      buttonHover: "#2A1760",
      buttonActive: "#1F1147",
      buttonDisabled: "#E5E7EB",
      buttonTextDisabled: "#9CA3AF",
    },
    // Typography
    typography: {
      fontFamily: "Inter, system-ui, sans-serif",
      fontSizeBase: "16px",
      lineHeightBase: "1.5",
    },
    // Spacing
    spacing: {
      xs: "0.5rem",
      sm: "0.75rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
    },
    // Border radius
    borderRadius: {
      sm: "0.25rem",
      md: "0.5rem",
      lg: "0.75rem",
      full: "9999px",
    },
  },
  DHL_UI: {
    logo: dhlLogo,
    colors: {
      // Base colors
      background: "#FFFFFF",
      foreground: "#121212",

      // Primary colors
      primary: "#FFCC00",
      primaryForeground: "#000000",
      primaryHover: "#E6B800",
      primaryActive: "#CCA300",

      // Secondary colors
      secondary: "#F5F5F5",
      secondaryForeground: "#000000",
      secondaryHover: "#E5E5E5",
      secondaryActive: "#D4D4D4",

      // Accent colors
      accent: "#FFCC00",
      accentForeground: "#000000",

      // Destructive colors
      destructive: "#D40511",
      destructiveForeground: "#FFFFFF",

      // Status colors
      success: "#16A34A",
      warning: "#F59E0B",
      error: "#D40511",
      info: "#3B82F6",

      // Text colors
      textPrimary: "#000000",
      textSecondary: "#4B5563",
      textTertiary: "#6B7280",

      // Background colors
      backgroundSecondary: "#F8F8F8",
      backgroundTertiary: "#F0F0F0",

      // Border and input
      border: "#E5E7EB", // Light gray border
      input: "#FFFFFF", // White input background
      ring: "#0A6B71", // Primary color for focus rings

      // Card
      card: "#FFFFFF",
      cardForeground: "#121212",

      // Popover
      popover: "#FFFFFF",
      popoverForeground: "#121212",

      // Muted
      muted: "#F3F4F6",
      mutedForeground: "#6B7280",

      // Support color (brand-specific)
      support: "#D40511",

      // Button states
      buttonHover: "#E6B800",
      buttonActive: "#CCA300",
      buttonDisabled: "#F5F5F5",
      buttonTextDisabled: "#9CA3AF",
    },
    // Typography
    typography: {
      fontFamily: '"DHL Sharp", Arial, sans-serif',
      fontSizeBase: "16px",
      lineHeightBase: "1.5",
    },
    // Spacing
    spacing: {
      xs: "0.5rem",
      sm: "0.75rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
    },
    // Border radius
    borderRadius: {
      sm: "0.25rem",
      md: "0.5rem",
      lg: "0.75rem",
      full: "9999px",
    },
  },
  BIAL_UI: {
    logo: "https://leapmile-website.blr1.digitaloceanspaces.com/BIAL.png",
    colors: {
      // Base colors
      background: "#FFFFFF",
      foreground: "#121212",

      // Primary colors
      primary: "#0A6B71",
      primaryForeground: "#FFFFFF",
      primaryHover: "#09575c",
      primaryActive: "#084349",

      // Secondary colors
      secondary: "#4BAAA2",
      secondaryForeground: "#FFFFFF",
      secondaryHover: "#439992",
      secondaryActive: "#3A8882",

      // Accent colors
      accent: "#4BAAA2",
      accentForeground: "#FFFFFF",

      // Destructive colors
      destructive: "#DC2626",
      destructiveForeground: "#FFFFFF",

      // Status colors
      success: "#16A34A",
      warning: "#F59E0B",
      error: "#DC2626",
      info: "#3B82F6",

      // Text colors
      textPrimary: "#121212",
      textSecondary: "#4B5563",
      textTertiary: "#6B7280",

      // Background colors
      backgroundSecondary: "#F9FAFB",
      backgroundTertiary: "#F3F4F6",

      // Border and input
      border: "#E5E7EB",
      input: "#FFFFFF",
      ring: "#0A6B71",

      // Card
      card: "#FFFFFF",
      cardForeground: "#121212",

      // Popover
      popover: "#FFFFFF",
      popoverForeground: "#121212",

      // Muted
      muted: "#F3F4F6",
      mutedForeground: "#6B7280",

      // Support color (brand-specific)
      support: "#4BAAA2",

      // Button states
      buttonHover: "#09575c",
      buttonActive: "#084349",
      buttonDisabled: "#E5E7EB",
      buttonTextDisabled: "#9CA3AF",
    },
    // Typography
    typography: {
      fontFamily: "Inter, system-ui, sans-serif",
      fontSizeBase: "16px",
      lineHeightBase: "1.5",
    },
    // Spacing
    spacing: {
      xs: "0.5rem",
      sm: "0.75rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
    },
    // Border radius
    borderRadius: {
      sm: "0.25rem",
      md: "0.5rem",
      lg: "0.75rem",
      full: "9999px",
    },
  },
  AMS_UI: {
    logo: "https://leapmile-website.blr1.digitaloceanspaces.com/AMS.png",
    colors: {
      // Base colors
      background: "#FFFFFF",
      foreground: "#121212",

      // Primary colors
      primary: "#0A6B71",
      primaryForeground: "#FFFFFF",
      primaryHover: "#09575c",
      primaryActive: "#084349",

      // Secondary colors
      secondary: "#4BAAA2",
      secondaryForeground: "#FFFFFF",
      secondaryHover: "#439992",
      secondaryActive: "#3A8882",

      // Accent colors
      accent: "#4BAAA2",
      accentForeground: "#FFFFFF",

      // Destructive colors
      destructive: "#DC2626",
      destructiveForeground: "#FFFFFF",

      // Status colors
      success: "#16A34A",
      warning: "#F59E0B",
      error: "#DC2626",
      info: "#3B82F6",

      // Text colors
      textPrimary: "#121212",
      textSecondary: "#4B5563",
      textTertiary: "#6B7280",

      // Background colors
      backgroundSecondary: "#F9FAFB",
      backgroundTertiary: "#F3F4F6",

      // Border and input
      border: "#E5E7EB",
      input: "#FFFFFF",
      ring: "#0A6B71",

      // Card
      card: "#FFFFFF",
      cardForeground: "#121212",

      // Popover
      popover: "#FFFFFF",
      popoverForeground: "#121212",

      // Muted
      muted: "#F3F4F6",
      mutedForeground: "#6B7280",

      // Support color (brand-specific)
      support: "#4BAAA2",

      // Button states
      buttonHover: "#09575c",
      buttonActive: "#084349",
      buttonDisabled: "#E5E7EB",
      buttonTextDisabled: "#9CA3AF",
    },
    // Typography
    typography: {
      fontFamily: "Inter, system-ui, sans-serif",
      fontSizeBase: "16px",
      lineHeightBase: "1.5",
    },
    // Spacing
    spacing: {
      xs: "0.5rem",
      sm: "0.75rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
    },
    // Border radius
    borderRadius: {
      sm: "0.25rem",
      md: "0.5rem",
      lg: "0.75rem",
      full: "9999px",
    },
  },
};

export const getSkin = () => {
  const skinName = import.meta.env.VITE_DEPLOYMENT_CSS_SKIN || "DHL_UI";
  return skins[skinName];
};
