import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import dhlLogo from "@/assets/dhl-logo.png";
import { Lock } from "lucide-react";
import { getApiUrl } from "@/utils/api";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validate mobile number - must be at least 6 digits for password derivation
    if (!/^\d+$/.test(mobileNumber) || mobileNumber.length < 6) {
      toast.error("Please enter a valid mobile number (at least 6 digits)");
      return;
    }

    // Derive password from last 6 digits
    const password = mobileNumber.slice(-6);

    setIsLoading(true);
    
    try {
      // Call validation API
      const apiUrl = getApiUrl(`/user/validate?user_phone=${mobileNumber}&password=${password}`);
      console.log('Login API URL:', apiUrl);
      console.log('Attempting to login with phone:', mobileNumber);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok && data.user_name) {
        // Store user info and auth token in session
        sessionStorage.setItem("username", data.user_name);
        sessionStorage.setItem("userId", data.user_id?.toString() || "");
        sessionStorage.setItem("authToken", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2wiOiJhZG1pbiIsImV4cCI6MTkyMTY2MzgyNH0.hYv8hPzpQbGzAl0QXoIWddeF4gk9wPfPqwRMDTE4zas");
        
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        console.error('Login failed - Invalid credentials or missing user_name');
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  return <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#FFCC00] via-[#FFD633] to-[#FFCC00] relative overflow-hidden">
      {/* Technical Warehouse Blueprint Pattern */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='480' height='480' viewBox='0 0 480 480' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M60 0 L0 0 L0 60' fill='none' stroke='%23171717' stroke-width='0.5' opacity='0.12'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='480' height='480' fill='url(%23grid)'/%3E%3Cg stroke='%23171717' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cg stroke-width='2' opacity='0.3'%3E%3Cpath d='M0 60 L480 60'/%3E%3Cpath d='M0 120 L480 120'/%3E%3Cpath d='M0 180 L480 180'/%3E%3Cpath d='M0 240 L480 240'/%3E%3Cpath d='M0 300 L480 300'/%3E%3Cpath d='M0 360 L480 360'/%3E%3Cpath d='M0 420 L480 420'/%3E%3Cpath d='M60 0 L60 480'/%3E%3Cpath d='M120 0 L120 480'/%3E%3Cpath d='M180 0 L180 480'/%3E%3Cpath d='M240 0 L240 480'/%3E%3Cpath d='M300 0 L300 480'/%3E%3Cpath d='M360 0 L360 480'/%3E%3Cpath d='M420 0 L420 480'/%3E%3C/g%3E%3Cg stroke-width='2.5' opacity='0.5'%3E%3Cpath d='M30 30 L90 30 L90 90 L30 90 Z'/%3E%3Cpath d='M30 30 L30 90'/%3E%3Cpath d='M60 30 L60 90'/%3E%3Cpath d='M90 30 L90 90'/%3E%3Cpath d='M30 60 L90 60'/%3E%3C/g%3E%3Cg stroke-width='2' opacity='0.4'%3E%3Cpath d='M150 30 L210 30 L210 90 L150 90 Z'/%3E%3Cpath d='M150 45 L210 45'/%3E%3Cpath d='M150 60 L210 60'/%3E%3Cpath d='M150 75 L210 75'/%3E%3C/g%3E%3Cg stroke-width='2.5' opacity='0.5'%3E%3Ccircle cx='270' cy='60' r='20'/%3E%3Cpath d='M270 40 L270 80'/%3E%3Cpath d='M250 60 L290 60'/%3E%3Ccircle cx='270' cy='60' r='8'/%3E%3Cpath d='M270 52 L270 68'/%3E%3Cpath d='M262 60 L278 60'/%3E%3C/g%3E%3Cg stroke-width='2' opacity='0.4'%3E%3Cpath d='M330 30 L390 30 L390 90 L330 90 Z'/%3E%3Cpath d='M330 45 L390 45'/%3E%3Cpath d='M330 60 L390 60'/%3E%3Cpath d='M330 75 L390 75'/%3E%3Cpath d='M345 30 L345 90'/%3E%3Cpath d='M360 30 L360 90'/%3E%3Cpath d='M375 30 L375 90'/%3E%3C/g%3E%3Cg stroke-width='2.5' opacity='0.5'%3E%3Cpath d='M30 150 L30 210'/%3E%3Cpath d='M50 150 L50 210'/%3E%3Cpath d='M30 150 L50 150'/%3E%3Cpath d='M30 170 L50 170'/%3E%3Cpath d='M30 190 L50 190'/%3E%3Cpath d='M30 210 L50 210'/%3E%3C/g%3E%3Cg stroke-width='2' opacity='0.3'%3E%3Cpath d='M90 150 L150 150'/%3E%3Cpath d='M145 145 L150 150 L145 155'/%3E%3Cpath d='M90 180 L150 180'/%3E%3Cpath d='M145 175 L150 180 L145 185'/%3E%3C/g%3E%3Cg stroke-width='2' opacity='0.3'%3E%3Cpath d='M30 270 Q60 260 90 270 T150 270'/%3E%3Cpath d='M30 300 Q60 290 90 300 T150 300'/%3E%3C/g%3E%3Cg stroke-width='2.5' opacity='0.5'%3E%3Ccircle cx='270' cy='150' r='6'/%3E%3Cpath d='M270 144 L270 180'/%3E%3Cpath d='M270 180 L300 210'/%3E%3Cpath d='M270 180 L240 210'/%3E%3Cpath d='M300 210 L310 205'/%3E%3Cpath d='M240 210 L230 205'/%3E%3C/g%3E%3Cg stroke-width='2' opacity='0.4'%3E%3Cpath d='M330 150 L390 150'/%3E%3Cpath d='M330 155 L390 155'/%3E%3Cpath d='M345 150 L345 155'/%3E%3Cpath d='M360 150 L360 155'/%3E%3Cpath d='M375 150 L375 155'/%3E%3C/g%3E%3Cg stroke-width='2' opacity='0.3'%3E%3Cpath d='M330 150 Q360 140 390 150'/%3E%3Cpath d='M330 180 Q360 170 390 180'/%3E%3C/g%3E%3Cg stroke-width='2.5' opacity='0.5'%3E%3Cpath d='M150 270 L210 270 L210 330 L150 330 Z'/%3E%3Cpath d='M150 270 L150 330'/%3E%3Cpath d='M210 270 L210 330'/%3E%3Cpath d='M165 270 L165 330'/%3E%3Cpath d='M180 270 L180 330'/%3E%3Cpath d='M195 270 L195 330'/%3E%3Cpath d='M150 285 L210 285'/%3E%3Cpath d='M150 300 L210 300'/%3E%3Cpath d='M150 315 L210 315'/%3E%3C/g%3E%3Cg stroke-width='2' opacity='0.3'%3E%3Cpath d='M270 270 Q300 260 330 270 T390 270'/%3E%3Cpath d='M270 300 Q300 290 330 300 T390 300'/%3E%3C/g%3E%3Cg stroke-width='2.5' opacity='0.5'%3E%3Cpath d='M30 330 L30 390'/%3E%3Cpath d='M50 330 L50 390'/%3E%3Cpath d='M30 330 L50 330'/%3E%3Cpath d='M30 350 L50 350'/%3E%3Cpath d='M30 370 L50 370'/%3E%3Cpath d='M30 390 L50 390'/%3E%3C/g%3E%3Cg stroke-width='2' opacity='0.3'%3E%3Ccircle cx='90' cy='360' r='3'/%3E%3Ccircle cx='120' cy='360' r='3'/%3E%3Ccircle cx='150' cy='360' r='3'/%3E%3Ccircle cx='180' cy='360' r='3'/%3E%3Ccircle cx='210' cy='360' r='3'/%3E%3Ccircle cx='240' cy='360' r='3'/%3E%3Ccircle cx='270' cy='360' r='3'/%3E%3Ccircle cx='300' cy='360' r='3'/%3E%3Ccircle cx='330' cy='360' r='3'/%3E%3Ccircle cx='360' cy='360' r='3'/%3E%3Ccircle cx='390' cy='360' r='3'/%3E%3Ccircle cx='90' cy='390' r='3'/%3E%3Ccircle cx='120' cy='390' r='3'/%3E%3Ccircle cx='150' cy='390' r='3'/%3E%3Ccircle cx='180' cy='390' r='3'/%3E%3Ccircle cx='210' cy='390' r='3'/%3E%3Ccircle cx='240' cy='390' r='3'/%3E%3Ccircle cx='270' cy='390' r='3'/%3E%3Ccircle cx='300' cy='390' r='3'/%3E%3Ccircle cx='330' cy='390' r='3'/%3E%3Ccircle cx='360' cy='390' r='3'/%3E%3Ccircle cx='390' cy='390' r='3'/%3E%3C/g%3E%3Cg stroke-width='1' opacity='0.25'%3E%3Cpath d='M45 30 L45 35'/%3E%3Cpath d='M45 85 L45 90'/%3E%3Cpath d='M30 60 L35 60'/%3E%3Cpath d='M85 60 L90 60'/%3E%3Cpath d='M165 30 L165 35'/%3E%3Cpath d='M165 85 L165 90'/%3E%3Cpath d='M150 60 L155 60'/%3E%3Cpath d='M205 60 L210 60'/%3E%3Cpath d='M30 165 L35 165'/%3E%3Cpath d='M45 165 L50 165'/%3E%3Cpath d='M30 195 L35 195'/%3E%3Cpath d='M45 195 L50 195'/%3E%3Cpath d='M30 225 L35 225'/%3E%3Cpath d='M45 225 L50 225'/%3E%3Cpath d='M150 285 L155 285'/%3E%3Cpath d='M150 300 L155 300'/%3E%3Cpath d='M150 315 L155 315'/%3E%3Cpath d='M205 285 L210 285'/%3E%3Cpath d='M205 300 L210 300'/%3E%3Cpath d='M205 315 L210 315'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '480px 480px',
            opacity: '0.4',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 75%)',
          }}
        />
        {/* Vignette glow around center */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 45%, transparent 0%, transparent 55%, rgba(0,0,0,0.03) 70%, rgba(0,0,0,0.08) 100%)',
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-md space-y-10 sm:space-y-12 animate-fade-in relative z-10">
        {/* Logo */}
        <div className="text-center">
          <img src={dhlLogo} alt="DHL Supply Chain" className="h-14 sm:h-18 mx-auto opacity-95" />
        </div>

        {/* Premium Login Card with Glassmorphism */}
        <div 
          className="relative"
          style={{
            filter: 'drop-shadow(0 20px 60px rgba(0, 0, 0, 0.15)) drop-shadow(0 8px 25px rgba(0, 0, 0, 0.1))',
          }}
        >
          {/* Card highlight/lighting effect */}
          <div 
            className="absolute -inset-px rounded-3xl opacity-30 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
              borderRadius: '1.5rem',
            }}
          />
          
          {/* Main Card */}
          <div 
            className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/50"
            style={{
              boxShadow: `
                0 1px 0 0 rgba(255, 255, 255, 0.8) inset,
                0 20px 60px -12px rgba(0, 0, 0, 0.25),
                0 8px 25px -8px rgba(0, 0, 0, 0.15)
              `,
            }}
          >
            {/* iOS-style Biometric Lock Icon */}
        <div className="flex justify-center mb-8">
              <div 
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,248,248,0.9) 100%)',
                  boxShadow: `
                    0 2px 8px rgba(0, 0, 0, 0.1),
                    0 1px 0 rgba(255, 255, 255, 0.8) inset
                  `,
                }}
              >
                <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-gray-700 animate-lock-pulse" strokeWidth={2} />
                {/* Subtle glow */}
                <div 
                  className="absolute inset-0 rounded-full opacity-20"
                  style={{
                    background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%)',
                  }}
                />
          </div>
        </div>

            {/* Typography */}
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-900 mb-3 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              Welcome Back
            </h2>
              <p className="text-center text-gray-500 text-base sm:text-lg font-normal">
              Scan ID Number
            </p>
          </div>

            {/* Form Elements */}
            <div className="space-y-5">
              {/* Premium Input Field */}
              <div className="relative">
            <Input 
              type="text" 
              placeholder="ID Number" 
              value={mobileNumber} 
              onChange={e => setMobileNumber(e.target.value.replace(/\D/g, ""))} 
              onKeyPress={handleKeyPress} 
                  className="h-14 sm:h-16 text-lg sm:text-xl text-center font-medium bg-gray-50/80 border-gray-200/80 focus:border-[#FFCC00] focus:ring-2 focus:ring-[#FFCC00]/20 focus:bg-white transition-all duration-200 rounded-2xl" 
                  style={{
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05) inset, 0 1px 0 rgba(255, 255, 255, 0.8)',
                  }}
              autoFocus 
              disabled={isLoading}
            />
              </div>

              {/* Premium Button */}
            <Button 
              onClick={handleLogin} 
                className="w-full h-14 sm:h-16 text-lg sm:text-xl font-semibold bg-[#FFCC00] hover:bg-[#FFD633] text-gray-900 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl"
                style={{
                  boxShadow: '0 4px 14px rgba(255, 204, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.3) inset',
                }}
              disabled={isLoading}
            >
              {isLoading ? "Validating..." : "Login"}
            </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-gray-400 font-normal">
          Powered by <span className="font-medium text-gray-600">leapmile</span> © 2025
        </p>
      </div>
    </div>;
};
export default Login;