import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar } from "@/components/AppBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Package, AlertTriangle, Minus, Plus, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
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

interface OverflowSlot {
  id: number;
  slot_id: string;
  slot_name: string;
  slot_status: string;
  tray_id: string;
  comment: string;
  created_at: string;
  updated_at: string;
}

interface TrayItem {
  id: number;
  tray_id: string;
  tray_status: string;
  item_id: string | null;
  item_description: string | null;
  available_quantity: number;
  tray_weight: number;
  inbound_date: string | null;
}

type ViewState = "slots" | "loading-unblock" | "items";

const TrayOverflow = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username") || "Guest";
  const authToken = sessionStorage.getItem("authToken");

  const [viewState, setViewState] = useState<ViewState>("slots");
  const [slots, setSlots] = useState<OverflowSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<OverflowSlot | null>(null);
  const [trayItems, setTrayItems] = useState<TrayItem[]>([]);
  const [pickQuantities, setPickQuantities] = useState<Record<string, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPickConfirm, setShowPickConfirm] = useState(false);
  const [itemToPick, setItemToPick] = useState<TrayItem | null>(null);
  const [orderId, setOrderId] = useState<string>("");

  // Fetch overflow slots
  useEffect(() => {
    fetchOverflowSlots();
  }, []);

  const fetchOverflowSlots = async () => {
    if (!authToken) {
      toast.error("Authentication required. Please login again.");
      navigate("/");
      return;
    }

    try {
      setIsLoadingSlots(true);
      const response = await fetch(
        getApiUrl("/robotmanager/slots?tags=station&slot_status=inactive&order_by_field=updated_at&order_by_type=DESC"),
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok && data.records && Array.isArray(data.records)) {
        setSlots(data.records);
      } else {
        setSlots([]);
      }
    } catch (error) {
      console.error("Error fetching overflow slots:", error);
      toast.error("Failed to load overflow slots.");
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const extractOrderId = (payload: any): string | null => {
    const id = payload?.id ?? payload?.record_id ?? payload?.records?.[0]?.id;
    return id !== undefined && id !== null ? id.toString() : null;
  };

  const checkExistingOrder = async (trayId: string): Promise<string | null> => {
    if (!authToken) return null;
    try {
      const response = await fetch(
        getApiUrl(`/nanostore/orders?tray_id=${trayId}&tray_status=tray_ready_to_use&order_by_field=updated_at&order_by_type=DESC`),
        { method: "GET", headers: { accept: "application/json", Authorization: `Bearer ${authToken}` } }
      );
      if (response.status === 404) return null;
      const data = await response.json();
      if (data.records && Array.isArray(data.records) && data.records.length > 0) {
        return extractOrderId(data.records[0]);
      }
      return null;
    } catch {
      return null;
    }
  };

  const handleSlotClick = async (slot: OverflowSlot) => {
    if (!authToken) return;

    setSelectedSlot(slot);
    setViewState("loading-unblock");

    try {
      // Step 1: Unblock the slot
      const unblockResponse = await fetch(
        getApiUrl(`/robotmanager/unblock?slot_id=${slot.slot_id}`),
        { method: "PATCH", headers: { accept: "application/json", Authorization: `Bearer ${authToken}` } }
      );
      if (!unblockResponse.ok) throw new Error(`Failed to unblock slot: ${unblockResponse.status}`);

      // Step 2: Check for existing active order
      const existingOrderId = await checkExistingOrder(slot.tray_id);
      if (existingOrderId) {
        setOrderId(existingOrderId);
      } else {
        // Create new order
        const userId = sessionStorage.getItem("userId") || "";
        const orderResponse = await fetch(
          getApiUrl(`/nanostore/orders?tray_id=${slot.tray_id}&user_id=${userId}&auto_complete_time=1000`),
          { method: "POST", headers: { accept: "application/json", Authorization: `Bearer ${authToken}` } }
        );
        if (!orderResponse.ok) throw new Error(`Failed to create order: ${orderResponse.status}`);

        const orderData = await orderResponse.json();
        const createdOrderId = extractOrderId(orderData);
        if (!createdOrderId) {
          throw new Error("Order was created but no order_id was returned by API.");
        }
        setOrderId(createdOrderId);
      }

      // Step 3: Fetch tray items
      await fetchTrayItems(slot.tray_id);
      setViewState("items");
    } catch (error) {
      console.error("Error processing slot:", error);
      toast.error("Failed to process tray overflow. Please try again.");
      setViewState("slots");
    }
  };

  const fetchTrayItems = async (trayId: string) => {
    if (!authToken) return;

    try {
      const response = await fetch(
        getApiUrl(`/nanostore/trays_for_order?in_station=true&tray_id=${trayId}&like=false&num_records=10&offset=0&order_flow=fifo`),
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch tray items: ${response.status}`);
      }

      const data = await response.json();
      if (data.records && Array.isArray(data.records)) {
        setTrayItems(data.records);
        // Initialize pick quantities to 0
        const quantities: Record<string, number> = {};
        data.records.forEach((item: TrayItem) => {
          const key = item.item_id || item.id.toString();
          quantities[key] = 0;
        });
        setPickQuantities(quantities);
      }
    } catch (error) {
      console.error("Error fetching tray items:", error);
      toast.error("Failed to load tray items.");
    }
  };

  const getItemKey = (item: TrayItem) => item.item_id || item.id.toString();

  const handleQuantityChange = (item: TrayItem, delta: number) => {
    const key = getItemKey(item);
    setPickQuantities((prev) => {
      const maxQty = item.available_quantity || 0;
      const current = prev[key] || 0;
      const newVal = Math.max(0, Math.min(maxQty, current + delta));
      return { ...prev, [key]: newVal };
    });
  };

  const handlePickItem = (item: TrayItem) => {
    const key = getItemKey(item);
    const qty = pickQuantities[key] || 0;
    if (qty <= 0) {
      toast.error("Please select a quantity to pick.");
      return;
    }
    setItemToPick(item);
    setShowPickConfirm(true);
  };

  const confirmPick = async () => {
    if (!itemToPick || !authToken) return;
    if (!orderId) {
      toast.error("Order ID missing. Please reopen the tray overflow slot.");
      return;
    }

    const qty = pickQuantities[getItemKey(itemToPick)] || 0;
    setIsProcessing(true);

    try {
      const today = new Date().toISOString().split("T")[0];
      const negativeQty = -Math.abs(qty);
      const encodedItemId = encodeURIComponent(itemToPick.item_id || "");
      const response = await fetch(
        getApiUrl(`/nanostore/transaction?order_id=${orderId}&item_id=${encodedItemId}&transaction_item_quantity=${negativeQty}&transaction_type=outbound&transaction_date=${today}`),
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        console.error("Transaction response:", responseData);
        throw new Error(`Transaction failed: ${response.status} - ${responseData.message || ""}`);
      }

      toast.success(`Picked ${qty} of ${itemToPick.item_id || "item"} successfully!`);

      // Refresh items list
      if (selectedSlot) {
        await fetchTrayItems(selectedSlot.tray_id);
      }
    } catch (error) {
      console.error("Error creating pickup transaction:", error);
      toast.error("Failed to process pickup. Please try again.");
    } finally {
      setIsProcessing(false);
      setShowPickConfirm(false);
      setItemToPick(null);
    }
  };

  const handleRelease = async () => {
    if (!authToken) return;
    if (!orderId) {
      toast.error("Order ID missing. Please reopen the tray overflow slot.");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch(
        getApiUrl(`/nanostore/orders/complete?record_id=${orderId}`),
        { method: "PATCH", headers: { accept: "application/json", Authorization: `Bearer ${authToken}` } }
      );
      const releaseData = await response.json();
      if (!response.ok) {
        console.error("Release response:", releaseData);
        throw new Error(`Failed to release: ${response.status} - ${releaseData.message || ""}`);
      }
      toast.success(`Order #${orderId} released successfully!`);
      setViewState("slots");
      setSelectedSlot(null);
      setTrayItems([]);
      setOrderId("");
      fetchOverflowSlots();
    } catch (error) {
      console.error("Error releasing order:", error);
      toast.error("Failed to release order.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    if (viewState === "items") {
      setViewState("slots");
      setSelectedSlot(null);
      setTrayItems([]);
      fetchOverflowSlots();
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background mobile-app-bar-padding overflow-y-auto touch-scroll">
      <AppBar
        title={viewState === "items" ? `Tray ${selectedSlot?.tray_id || ""} Items` : "Tray Overflow"}
        showBack
        username={username}
        onBack={handleBack}
      />

      <main className="mobile-content-padding py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* SLOTS LIST VIEW */}
          {viewState === "slots" && (
            <>
              {isLoadingSlots ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="text-center space-y-4">
                    <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                    <p className="text-lg text-muted-foreground">Loading overflow trays...</p>
                  </div>
                </div>
              ) : slots.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {slots.map((slot, index) => (
                    <Card
                      key={slot.id}
                      onClick={() => handleSlotClick(slot)}
                      className="p-5 sm:p-6 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] bg-card border-border animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">Slot</span>
                          <span className="text-sm text-muted-foreground">{slot.slot_name}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Package className="h-5 w-5 text-primary" />
                          <span className="text-xl font-bold text-primary">{slot.tray_id}</span>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          Slot ID: {slot.slot_id}
                        </div>

                        {slot.comment && (
                          <div className="flex items-center gap-2 mt-1">
                            <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
                            <span className="text-sm font-semibold text-destructive">{slot.comment}</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center space-y-6 px-4 min-h-[400px] flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                    <Package className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">No Overflow Trays</h2>
                  <p className="text-muted-foreground">No inactive station slots found.</p>
                </div>
              )}
            </>
          )}

          {/* LOADING / UNBLOCKING VIEW */}
          {viewState === "loading-unblock" && (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                <p className="text-lg text-muted-foreground">Processing tray overflow...</p>
                <p className="text-sm text-muted-foreground">Unblocking slot & creating order</p>
              </div>
            </div>
          )}

          {/* TRAY ITEMS VIEW */}
          {viewState === "items" && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    Tray: <span className="text-primary">{selectedSlot?.tray_id}</span>
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{trayItems.length} item(s)</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleRelease}
                      disabled={isProcessing || !orderId}
                    >
                      {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Release"}
                    </Button>
                  </div>
                </div>
                {orderId && (
                  <p className="text-xs text-muted-foreground mb-1">Order ID: #{orderId}</p>
                )}
                {selectedSlot?.comment && (
                  <p className="text-sm font-semibold text-destructive">{selectedSlot.comment}</p>
                )}
              </div>

              {trayItems.length > 0 ? (
                <div className="space-y-3">
                  {trayItems.map((item) => (
                    <Card key={item.id} className="p-4 bg-card border-border">
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Item ID</p>
                            <p className="text-base font-semibold text-foreground">
                              {item.item_id || "N/A"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Available Qty</p>
                            <p className="text-xl font-bold text-primary">{item.available_quantity}</p>
                          </div>
                        </div>

                        {item.item_description && (
                          <p className="text-sm text-muted-foreground">{item.item_description}</p>
                        )}

                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <div>Status: <span className="text-foreground">{item.tray_status}</span></div>
                          <div>Weight: <span className="text-foreground">{item.tray_weight}g</span></div>
                          {item.inbound_date && (
                            <div>Inbound: <span className="text-foreground">{item.inbound_date}</span></div>
                          )}
                        </div>

                        {/* Pick controls */}
                        {item.available_quantity > 0 && (
                          <div className="flex items-center justify-between pt-2 border-t border-border">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleQuantityChange(item.id, -1); }}
                                disabled={!pickQuantities[item.id]}
                                className="p-2 rounded-full bg-muted hover:bg-accent disabled:opacity-30 transition-colors"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="text-lg font-bold text-foreground min-w-[2rem] text-center">
                                {pickQuantities[item.id] || 0}
                              </span>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleQuantityChange(item.id, 1); }}
                                disabled={(pickQuantities[item.id] || 0) >= item.available_quantity}
                                className="p-2 rounded-full bg-muted hover:bg-accent disabled:opacity-30 transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <Button
                              onClick={(e) => { e.stopPropagation(); handlePickItem(item); }}
                              disabled={!pickQuantities[item.id] || isProcessing}
                              className="h-10 px-6"
                            >
                              {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Pick"}
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">No items in this tray</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Pick Confirmation Dialog */}
      <AlertDialog open={showPickConfirm} onOpenChange={setShowPickConfirm}>
        <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Confirm Pickup</AlertDialogTitle>
            <AlertDialogDescription className="text-foreground space-y-2">
              <p>
                Pick <span className="font-bold text-primary">{pickQuantities[itemToPick?.id || 0] || 0}</span> unit(s) of{" "}
                <span className="font-bold">{itemToPick?.item_id || "item"}</span> from tray{" "}
                <span className="font-bold text-primary">{selectedSlot?.tray_id}</span>?
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-2">
            <AlertDialogCancel
              disabled={isProcessing}
              className="flex-1 h-11 border border-border bg-card text-foreground"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmPick}
              disabled={isProcessing}
              className="flex-1 h-11 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isProcessing ? "Processing..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TrayOverflow;
