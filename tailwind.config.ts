import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary) / 0.9)",
          active: "hsl(var(--primary) / 0.8)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          hover: "hsl(var(--secondary) / 0.9)",
          active: "hsl(var(--secondary) / 0.8)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          hover: "hsl(var(--destructive) / 0.9)",
          active: "hsl(var(--destructive) / 0.8)",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground, white))",
          hover: "hsl(var(--success) / 0.9)",
          active: "hsl(var(--success) / 0.8)",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground, white))",
          hover: "hsl(var(--warning) / 0.9)",
          active: "hsl(var(--warning) / 0.8)",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--error-foreground, white))",
          hover: "hsl(var(--error) / 0.9)",
          active: "hsl(var(--error) / 0.8)",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground, white))",
          hover: "hsl(var(--info) / 0.9)",
          active: "hsl(var(--info) / 0.8)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          hover: "hsl(var(--card) / 0.9)",
          active: "hsl(var(--card) / 0.8)",
        },
        support: {
          DEFAULT: "hsl(var(--support, var(--destructive)))",
          foreground: "hsl(var(--support-foreground, var(--destructive-foreground)))",
        },
        "icon-accent": {
          DEFAULT: "hsl(var(--icon-accent, var(--destructive)))",
          foreground: "hsl(var(--icon-accent-foreground, var(--destructive-foreground)))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-in": {
          from: {
            transform: "translateX(-100%)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        "scan-pulse": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.5",
          },
        },
        "robot-work": {
          "0%, 100%": {
            transform: "translateY(0) rotate(0deg)",
          },
          "25%": {
            transform: "translateY(-8px) rotate(-5deg)",
          },
          "50%": {
            transform: "translateY(-4px) rotate(0deg)",
          },
          "75%": {
            transform: "translateY(-8px) rotate(5deg)",
          },
        },
        "package-float": {
          "0%, 100%": {
            transform: "translateY(0) scale(1)",
            opacity: "0.6",
          },
          "50%": {
            transform: "translateY(-10px) scale(1.1)",
            opacity: "1",
          },
        },
        "shuttle-move": {
          "0%": {
            transform: "translateX(-40px)",
          },
          "50%": {
            transform: "translateX(40px)",
          },
          "100%": {
            transform: "translateX(-40px)",
          },
        },
        "parcel-pickup": {
          "0%, 20%": {
            transform: "translateY(0) scale(1)",
            opacity: "1",
          },
          "30%, 70%": {
            transform: "translateY(-20px) scale(0.8)",
            opacity: "0.8",
          },
          "80%, 100%": {
            transform: "translateY(0) scale(1)",
            opacity: "1",
          },
        },
        "parcel-shelf": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "25%, 75%": {
            opacity: "0.3",
            transform: "scale(0.9)",
          },
        },
        "autonomous-pulse": {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "scale(1.05)",
            opacity: "0.9",
          },
        },
        "autonomous-glow": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.1)",
          },
          "50%": {
            boxShadow: "0 0 20px 5px rgba(0, 0, 0, 0.15)",
          },
        },
        "lock-pulse": {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "scale(1.05)",
            opacity: "0.9",
          },
        },
        "shuttle-operate": {
          "0%": {
            transform: "translateX(-50px) translateY(0)",
          },
          "20%": {
            transform: "translateX(-30px) translateY(-5px)",
          },
          "40%": {
            transform: "translateX(0) translateY(0)",
          },
          "60%": {
            transform: "translateX(30px) translateY(-5px)",
          },
          "80%": {
            transform: "translateX(50px) translateY(0)",
          },
          "100%": {
            transform: "translateX(-50px) translateY(0)",
          },
        },
        "plate-rotate": {
          "0%, 40%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(90deg)",
          },
          "60%": {
            transform: "rotate(180deg)",
          },
          "70%": {
            transform: "rotate(270deg)",
          },
          "80%, 100%": {
            transform: "rotate(360deg)",
          },
        },
        "item-pickup": {
          "0%, 15%": {
            transform: "translateY(0) scale(1)",
            opacity: "1",
          },
          "25%": {
            transform: "translateY(-15px) scale(0.9)",
            opacity: "0.9",
          },
          "35%, 65%": {
            transform: "translateY(-25px) scale(0.8)",
            opacity: "0.7",
          },
          "75%": {
            transform: "translateY(-15px) scale(0.9)",
            opacity: "0.9",
          },
          "85%, 100%": {
            transform: "translateY(0) scale(1)",
            opacity: "1",
          },
        },
        "item-storage": {
          "0%, 30%": {
            opacity: "0",
            transform: "scale(0.8)",
          },
          "40%": {
            opacity: "0.5",
            transform: "scale(0.9)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "60%": {
            opacity: "0.8",
            transform: "scale(0.95)",
          },
          "70%, 100%": {
            opacity: "0",
            transform: "scale(0.8)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "scan-pulse": "scan-pulse 1.5s ease-in-out infinite",
        "robot-work": "robot-work 3s ease-in-out infinite",
        "package-float": "package-float 2s ease-in-out infinite",
        "shuttle-move": "shuttle-move 4s ease-in-out infinite",
        "parcel-pickup": "parcel-pickup 4s ease-in-out infinite",
        "parcel-shelf": "parcel-shelf 4s ease-in-out infinite",
        "autonomous-pulse": "autonomous-pulse 2s ease-in-out infinite",
        "autonomous-glow": "autonomous-glow 2s ease-in-out infinite",
        "lock-pulse": "lock-pulse 2s ease-in-out infinite",
        "shuttle-operate": "shuttle-operate 6s ease-in-out infinite",
        "plate-rotate": "plate-rotate 6s ease-in-out infinite",
        "item-pickup": "item-pickup 6s ease-in-out infinite",
        "item-storage": "item-storage 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
