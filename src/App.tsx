import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BackHandlerProvider } from "@/components/BackHandlerProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SelectInboundBin from "./pages/SelectInboundBin";
import ScanItemToInbound from "./pages/ScanItemToInbound";
import Pickup from "./pages/Pickup";
import SelectPickupBin from "./pages/SelectPickupBin";
import ScanItemToPickup from "./pages/ScanItemToPickup";
import StationView from "./pages/StationView";
import Admin from "./pages/Admin";
import AdminUsers from "./pages/AdminUsers";
import AdminBins from "./pages/AdminBins";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminHistory from "./pages/AdminHistory";
import AdminTestScanner from "./pages/AdminTestScanner";
import AdminScannerManual from "./pages/AdminScannerManual";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Get base path from env, removing trailing slash for BrowserRouter
const getBasename = (): string => {
  const base = import.meta.env.VITE_APP_BASE || "/";
  // Remove trailing slash if present (but keep "/" as is)
  return base === "/" ? "/" : base.replace(/\/$/, "");
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={getBasename()}>
        <BackHandlerProvider>
          <div className="mobile-full-height mobile-viewport no-pull-refresh">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inbound/select-bin" element={<SelectInboundBin />} />
              <Route path="/inbound/scan-items" element={<ScanItemToInbound />} />
              <Route path="/pickup" element={<Pickup />} />
              <Route path="/pickup/select-bin" element={<SelectPickupBin />} />
              <Route path="/pickup/scan-items" element={<ScanItemToPickup />} />
              <Route path="/station-view" element={<StationView />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/bins" element={<AdminBins />} />
              <Route path="/admin/add-product" element={<AdminAddProduct />} />
              <Route path="/admin/history" element={<AdminHistory />} />
              <Route path="/admin/test-scanner" element={<AdminTestScanner />} />
              <Route path="/admin/scanner-manual" element={<AdminScannerManual />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BackHandlerProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
