import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { getApiUrl } from "@/utils/api";

import { getSkin } from "@/config/skin.config";

const Login = () => {
  const skin = getSkin();
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validate mobile number - must be at least 6 digits for password derivation
    if (!/^\d+$/.test(mobileNumber) || mobileNumber.length < 6) {
      toast.error("Please enter a valid mobile number (at least 6 digits)", {
        duration: 1500,
        id: 'validation-error',
      });
      return;
    }

    // Derive password from last 6 digits
    const password = mobileNumber.slice(-6);

    setIsLoading(true);

    try {
      // Call validation API
      const apiUrl = getApiUrl(`/user/validate?user_phone=${mobileNumber}&password=${password}`);
      console.log("Login API URL:", apiUrl);
      console.log("Attempting to login with phone:", mobileNumber);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok && data.user_name && data.token) {
        // Store user info and auth token from API response
        sessionStorage.setItem("username", data.user_name);
        sessionStorage.setItem("userId", data.user_id?.toString() || "");
        sessionStorage.setItem("authToken", data.token);

        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        console.error("Login failed - Invalid credentials or missing user_name");
        toast.error("Invalid credentials. Please try again.", {
          duration: 1500,
          id: 'login-error',
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your connection and try again.", {
        duration: 1500,
        id: 'connection-error',
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative bg-background overflow-y-auto touch-scroll">
      {/* Technical Warehouse Blueprint Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 login-pattern-overlay" />
        {/* Vignette glow around center */}
        <div className="absolute inset-0 pointer-events-none login-vignette" />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-md space-y-10 sm:space-y-12 animate-fade-in relative z-10">
        {/* Logo */}
        <div className="text-center py-4 sm:py-6">
          <img src={skin.logo} alt="Logo" className="h-12 sm:h-14 mx-auto opacity-95" />
        </div>

        {/* Premium Login Card with Glassmorphism */}
        <div className="relative login-card-shadow">
          {/* Card highlight/lighting effect */}
          <div className="absolute -inset-px rounded-3xl opacity-30 pointer-events-none login-card-highlight" />

          {/* Main Card */}
          <div className="relative bg-white rounded-3xl p-8 sm:p-10 border border-border login-card-inner-shadow">
            {/* iOS-style Biometric Lock Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center login-icon-container">
                <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-icon-accent animate-lock-pulse" strokeWidth={2} />
                {/* Subtle glow */}
                <div className="absolute inset-0 rounded-full opacity-20 login-icon-glow" />
              </div>
            </div>

            {/* Typography */}
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold text-center text-foreground mb-3 tracking-tight login-letter-spacing">
                Welcome Back
              </h2>
              <p className="text-center text-muted-foreground text-base sm:text-lg font-normal">Scan ID Number</p>
            </div>

            {/* Form Elements */}
            <div className="space-y-5">
              {/* Premium Input Field */}
              <div className="relative">
                <Input
                  type="text"
                  placeholder="ID Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                  onKeyPress={handleKeyPress}
                  className="h-14 sm:h-16 text-lg sm:text-xl text-center font-medium bg-background border-border focus:border-grey focus:ring-1 focus:ring-ring transition-all duration-200 rounded-2xl"
                  autoFocus
                  disabled={isLoading}
                />
              </div>

              {/* Premium Button */}
              <Button
                onClick={handleLogin}
                className="w-full h-14 sm:h-16 text-lg sm:text-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl transition-all duration-200 login-button-shadow"
                disabled={isLoading}
              >
                {isLoading ? "Validating..." : "Login"}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-center text-xs sm:text-sm text-foreground font-normal">
            © 2024 All Rights Reserved | Leapmile Logistics Pvt.Ltd
          </p>
          <div className="flex flex-wrap justify-center gap-x-1 text-xs sm:text-sm text-foreground/80">
            <a
              href="https://leapmile.com/terms-and-privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-foreground transition-colors"
            >
              Terms and Condition
            </a>
            <span>&</span>
            <a
              href="https://leapmile.com/terms-and-privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <span>/</span>
            <a
              href="https://leapmile.com/terms-and-privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-foreground transition-colors"
            >
              Cookies Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
