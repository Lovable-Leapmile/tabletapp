import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar } from "@/components/AppBar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Package, ArrowUp, ArrowDown, AlertTriangle, Info, History, UserCog, Users, Plus, Camera, BookOpen, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getApiUrl } from "@/utils/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username") || "Guest";
  const [adminOpen, setAdminOpen] = useState(true);
  const [stationTrayCount, setStationTrayCount] = useState<number | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) return;
    const headers = { accept: "application/json", Authorization: `Bearer ${token}` };

    const fetchCounts = async () => {
      try {
        const [activeRes, inprogressRes] = await Promise.all([
          fetch(getApiUrl("/nanostore/trays?tray_status=active&order_by_field=updated_at&order_by_type=ASC"), { headers }),
          fetch(getApiUrl(`/nanostore/orders?tray_status=inprogress&user_id=${sessionStorage.getItem("userId") || ""}&order_by_field=updated_at&order_by_type=ASC`), { headers }),
        ]);
        let total = 0;
        if (activeRes.ok) {
          const d = await activeRes.json();
          total += d.count || d.rowcount || 0;
        }
        if (inprogressRes.ok) {
          const d = await inprogressRes.json();
          total += d.count || d.rowcount || 0;
        }
        setStationTrayCount(total);
      } catch (e) {
        console.error("Failed to fetch station tray counts:", e);
      }
    };
    fetchCounts();
  }, []);

  // Custom tray icons with arrows
  const InboundTrayIcon = () => (
    <div className="relative">
      <Package className="w-10 h-10 sm:w-12 sm:h-12 text-icon-accent" />
      <ArrowDown className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 text-icon-accent bg-card rounded-full p-1 animate-bounce" />
    </div>
  );

  const PickupTrayIcon = () => (
    <div className="relative">
      <Package className="w-10 h-10 sm:w-12 sm:h-12 text-icon-accent" />
      <ArrowUp className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 text-success bg-card rounded-full p-1 animate-bounce" />
    </div>
  );

  const adminOptions = [
    { title: "Bin", icon: Package, path: "/admin/bins" },
    { title: "Users", icon: Users, path: "/admin/users" },
    { title: "Add Product", icon: Plus, path: "/admin/add-product" },
    { title: "History", icon: History, path: "/admin/history" },
    { title: "Test Scanner", icon: Camera, path: "/admin/test-scanner" },
    { title: "Scanner Manual", icon: BookOpen, path: "/admin/scanner-manual" },
  ];

  return (
    <div className="mobile-full-height flex flex-col bg-background overflow-hidden">
      <AppBar title="Dashboard" username={username} showHomeIcon showLogo showProfile />

      <main className="flex-1 overflow-y-auto touch-scroll no-pull-refresh mobile-app-bar-padding">
        <div className="container mx-auto mobile-content-padding py-2 sm:py-4">
          <div className="max-w-4xl mx-auto">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground text-center mb-6 sm:mb-8">
              Select an Operation
            </h2>

            {/* Primary buttons - Inbound & Pickup */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
              <Card
                onClick={() => navigate("/inbound/select-bin")}
                className="p-6 sm:p-8 cursor-pointer transition-smooth active:scale-[0.98] bg-primary/30 border border-primary/40 shadow-md animate-fade-in animation-delay-0"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-card rounded-2xl flex items-center justify-center">
                    <InboundTrayIcon />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                    Inbound
                  </h3>
                </div>
              </Card>

              <Card
                onClick={() => navigate("/pickup")}
                className="p-6 sm:p-8 cursor-pointer transition-smooth active:scale-[0.98] bg-primary/30 border border-primary/40 shadow-md animate-fade-in animation-delay-1"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-card rounded-2xl flex items-center justify-center">
                    <PickupTrayIcon />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                    Pickup
                  </h3>
                </div>
              </Card>
            </div>

            {/* Secondary buttons - Tray Overflow, Station View, History */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
              {[
                { title: "Tray Overflow", icon: AlertTriangle, path: "/tray-overflow", delay: "animation-delay-2" },
                { title: "Station View", icon: Info, path: "/station-view", delay: "animation-delay-3" },
                { title: "History", icon: History, path: "/admin/history", delay: "animation-delay-4" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.title}
                    onClick={() => navigate(item.path)}
                    className={`p-4 sm:p-6 cursor-pointer transition-smooth active:scale-[0.98] bg-card border-border shadow-sm animate-fade-in ${item.delay}`}
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-muted rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-icon-accent" />
                      </div>
                      <h3 className="text-sm sm:text-base font-medium text-foreground">
                        {item.title}
                      </h3>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Admin Dropdown */}
            <Collapsible open={adminOpen} onOpenChange={setAdminOpen}>
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between bg-muted rounded-xl px-5 py-3 cursor-pointer transition-smooth active:scale-[0.99] shadow-sm border border-border">
                  <div className="flex items-center gap-2">
                    <UserCog className="w-5 h-5 text-icon-accent" />
                    <span className="text-base sm:text-lg font-semibold text-foreground">Admin</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-icon-accent transition-transform duration-200 ${adminOpen ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {adminOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <Card
                        key={option.title}
                        onClick={() => navigate(option.path)}
                        className="p-3 sm:p-4 cursor-pointer transition-smooth active:scale-[0.98] bg-card border-border shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-icon-accent flex-shrink-0" />
                          <span className="text-sm sm:text-base font-medium text-foreground truncate">
                            {option.title}
                          </span>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Dashboard;
