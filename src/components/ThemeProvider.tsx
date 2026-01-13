import { useEffect, createContext, useContext, ReactNode } from 'react';
import { getCurrentSkin, getCurrentSkinType, SkinConfig, SkinType } from '@/config/skin.config';

interface ThemeContextValue {
  skin: SkinConfig;
  skinType: SkinType;
  isDhlTheme: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const skin = getCurrentSkin();
  const skinType = getCurrentSkinType();
  const isDhlTheme = skinType === 'DHL_UI';

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply all color CSS variables
    root.style.setProperty('--primary', skin.colors.primary);
    root.style.setProperty('--primary-foreground', skin.colors.primaryForeground);
    root.style.setProperty('--secondary', skin.colors.secondary);
    root.style.setProperty('--secondary-foreground', skin.colors.secondaryForeground);
    root.style.setProperty('--background', skin.colors.background);
    root.style.setProperty('--foreground', skin.colors.foreground);
    root.style.setProperty('--accent', skin.colors.accent);
    root.style.setProperty('--accent-foreground', skin.colors.accentForeground);
    root.style.setProperty('--muted', skin.colors.muted);
    root.style.setProperty('--muted-foreground', skin.colors.mutedForeground);
    root.style.setProperty('--card', skin.colors.card);
    root.style.setProperty('--card-foreground', skin.colors.cardForeground);
    root.style.setProperty('--border', skin.colors.border);
    root.style.setProperty('--ring', skin.colors.ring);
    root.style.setProperty('--destructive', skin.colors.destructive);
    root.style.setProperty('--destructive-foreground', skin.colors.destructiveForeground);
    
    // Apply skin-specific variables
    root.style.setProperty('--header-background', skin.colors.headerBackground);
    root.style.setProperty('--header-border', skin.colors.headerBorder);
    root.style.setProperty('--header-text', skin.colors.headerText);
    root.style.setProperty('--login-background', skin.colors.loginBackground);
  }, [skin]);

  return (
    <ThemeContext.Provider value={{ skin, skinType, isDhlTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
