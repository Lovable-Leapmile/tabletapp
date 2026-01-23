import { ArrowLeft, LogOut, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getSkin } from "@/config/skin.config";

interface AppBarProps {
  title: string;
  showBack?: boolean;
  username?: string;
  showHomeIcon?: boolean;
  onBack?: () => void;
}

export const AppBar = ({ title, showBack = false, username = "John Doe", showHomeIcon = false, onBack }: AppBarProps) => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const skin = getSkin();
  
  // Get border color based on UI type
  const getBorderColor = () => {
    const skinName = import.meta.env.VITE_DEPLOYMENT_CSS_SKIN || 'DHL_UI';
    if (skinName === 'DHL_UI') {
      return skin.colors.support || skin.colors.destructive; // Red for DHL
    }
    return skin.colors.secondary; // Secondary color for other UIs
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const headerRef = useRef<HTMLHeadElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      document.documentElement.style.setProperty('--app-bar-height', `${height}px`);
    }
  }, []);

  return (
    <>
      {/* Safe area for mobile screens */}
      <div className="fixed top-0 left-0 right-0 h-[env(safe-area-inset-top)] bg-primary z-50" />
      
      <header 
        ref={headerRef} 
        className="bg-primary shadow-soft fixed top-[env(safe-area-inset-top)] left-0 right-0 z-50 border-b"
        style={{ borderBottomColor: getBorderColor(), borderBottomWidth: '2px' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-3">
            {/* Top section - User ID */}
            <div className="flex justify-center">
              <div className="bg-primary-foreground/10 px-6 py-2 rounded-full">
                <p className="text-xs sm:text-sm font-normal text-primary-foreground">
                  User – {username}
                </p>
              </div>
            </div>

            {/* Bottom section - Title and Icons */}
            <div className="flex items-center justify-between">
              {/* Left - Back button */}
              <div className="flex items-center gap-3">
                {showBack && (
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={handleBack}
                    className="bg-card hover:bg-card/80 transition-colors p-4 min-w-[56px] min-h-[56px] rounded-lg shadow-sm active:scale-95"
                  >
                    <ArrowLeft className="h-8 w-8 text-secondary" />
                  </Button>
                )}
                {/* Hidden spacer button for centering when no back button */}
                {!showBack && (
                  <Button
                    variant="ghost"
                    size="lg"
                    disabled
                    className="opacity-0 pointer-events-none invisible p-4 min-w-[56px] min-h-[56px] rounded-lg shadow-sm"
                  >
                    <ArrowLeft className="h-8 w-8 opacity-0" />
                  </Button>
                )}
              </div>

              {/* Center - Title */}
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center gap-2">
                  {showHomeIcon && (
                    <Home className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground flex-shrink-0" />
                  )}
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary-foreground leading-none">
                    {title}
                  </h1>
                </div>
              </div>

              {/* Right - Logout */}
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handleLogoutClick}
                  className="bg-card hover:bg-card/80 transition-colors p-4 min-w-[56px] min-h-[56px] rounded-lg shadow-sm active:scale-95"
                >
                  <LogOut className="h-8 w-8 text-foreground/80 hover:text-foreground transition-colors" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <AlertDialogContent className="text-center">
          <AlertDialogHeader className="text-center">
            <AlertDialogTitle className="text-foreground text-center">Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription className="text-foreground/80 text-center">
              Are you sure you want to logout? You will need to scan your identification number again to access the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-2">
            <AlertDialogCancel className="flex-1">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogoutConfirm}
              className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
