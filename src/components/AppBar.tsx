import { ArrowLeft, LogOut, Home, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useCallback } from "react";
import { getApiUrl } from "@/utils/api";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getSkin } from "@/config/skin.config";

interface AppBarProps {
  title: string;
  showBack?: boolean;
  username?: string;
  showHomeIcon?: boolean;
  showLogo?: boolean;
  showProfile?: boolean;
  onBack?: () => void;
}

export const AppBar = ({ title, showBack = false, username = "John Doe", showHomeIcon = false, showLogo = true, showProfile = false, onBack }: AppBarProps) => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const skin = getSkin();
  
  const getBorderColor = () => {
    const skinName = import.meta.env.VITE_DEPLOYMENT_CSS_SKIN || 'DHL_UI';
    if (skinName === 'DHL_UI') {
      return skin.colors.support || skin.colors.destructive;
    }
    return skin.colors.secondary;
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
      <div className="fixed top-0 left-0 right-0 h-[env(safe-area-inset-top)] bg-primary z-50" />
      
      <header 
        ref={headerRef} 
        className="bg-primary shadow-soft fixed top-[env(safe-area-inset-top)] left-0 right-0 z-50 border-b touch-none"
        style={{ borderBottomColor: getBorderColor(), borderBottomWidth: '2px' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-1.5">
          <div className="flex flex-col gap-2">
            {/* Top section - Logo centered (if showLogo) or User ID */}
            {showLogo ? (
              <div className="flex items-center justify-between">
                <div className="w-[56px]" /> {/* spacer */}
                <img 
                  src={skin.logo} 
                  alt="Logo" 
                  className="h-10 sm:h-12 object-contain"
                />
                <div className="flex items-center gap-2">
                  {showProfile && (
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => setShowProfileDialog(true)}
                      className="bg-card hover:bg-card/80 transition-colors p-3 min-w-[48px] min-h-[48px] rounded-lg shadow-sm active:scale-95"
                    >
                      <User className="h-7 w-7 text-icon-accent" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={handleLogoutClick}
                    className="bg-card hover:bg-card/80 transition-colors p-3 min-w-[48px] min-h-[48px] rounded-lg shadow-sm active:scale-95"
                  >
                    <LogOut className="h-7 w-7 text-icon-accent" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="bg-primary-foreground/10 px-6 py-2 rounded-full">
                  <p className="text-xs sm:text-sm font-normal text-primary-foreground">
                    User – {username}
                  </p>
                </div>
              </div>
            )}

            {/* Bottom section - Title and Icons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {showBack && (
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={handleBack}
                    className="bg-card hover:bg-card/80 transition-colors p-4 min-w-[56px] min-h-[56px] rounded-lg shadow-sm active:scale-95"
                  >
                    <ArrowLeft className="h-8 w-8 text-icon-accent" />
                  </Button>
                )}
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

              {/* Right - Logout (only if not showLogo, since logout is already in top row) */}
              {!showLogo && (
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={handleLogoutClick}
                    className="bg-card hover:bg-card/80 transition-colors p-4 min-w-[56px] min-h-[56px] rounded-lg shadow-sm active:scale-95"
                  >
                    <LogOut className="h-8 w-8 text-icon-accent hover:text-icon-accent/80 transition-colors" />
                  </Button>
                </div>
              )}
              {showLogo && (
                <div className="opacity-0 pointer-events-none invisible p-4 min-w-[56px] min-h-[56px]" />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Profile Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader className="sr-only">
            <DialogTitle>User Profile</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-muted-foreground" />
            </div>
            <p className="text-xl font-semibold text-foreground">{username}</p>
            <p className="text-sm text-muted-foreground">{sessionStorage.getItem("userEmail") || sessionStorage.getItem("userPhone") || ""}</p>
            <span className="px-4 py-1 rounded-full border border-border text-sm font-medium text-foreground bg-muted">
              {sessionStorage.getItem("userRole") || "User"}
            </span>
            <button
              onClick={() => { setShowProfileDialog(false); handleLogoutClick(); }}
              className="flex items-center gap-2 mt-2 text-destructive hover:text-destructive/80 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Log Out</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>

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
