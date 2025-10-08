import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CheckCircle2, Crown, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Subscription = () => {
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showBkashDialog, setShowBkashDialog] = useState(false);
  const [bkashNumber, setBkashNumber] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      setSubscription(data);
    } catch (error: any) {
      toast.error("Failed to load subscription");
    } finally {
      setLoading(false);
    }
  };

  const handleBkashPayment = async () => {
    if (!bkashNumber || bkashNumber.length !== 11) {
      toast.error("Please enter a valid 11-digit bKash number");
      return;
    }

    setProcessing(true);

    try {
      // Mock bKash payment - In production, this would call bKash API
      await new Promise(resolve => setTimeout(resolve, 2000));

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Update subscription status
      const { error } = await supabase
        .from("subscriptions")
        .update({
          status: "active",
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast.success("Payment successful! Your subscription is now active.");
      setShowBkashDialog(false);
      setBkashNumber("");
      fetchSubscription();
    } catch (error: any) {
      toast.error(error.message || "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const isActive = subscription?.status === "active";
  const isTrial = subscription?.status === "trial";
  const trialEndsAt = subscription?.trial_ends_at ? new Date(subscription.trial_ends_at) : null;
  const daysLeft = trialEndsAt ? Math.ceil((trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            ← Back to Dashboard
          </Button>
        </div>

        <div className="space-y-6">
          {/* Current Status */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Your Subscription</CardTitle>
                  <CardDescription>Manage your subscription and billing</CardDescription>
                </div>
                {isActive && <Crown className="w-8 h-8 text-accent" />}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant={isActive ? "default" : isTrial ? "secondary" : "destructive"} className="text-base px-3 py-1">
                  {isActive ? "Active" : isTrial ? "Free Trial" : "Inactive"}
                </Badge>
                {isTrial && daysLeft > 0 && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{daysLeft} days left in trial</span>
                  </div>
                )}
              </div>

              {!isActive && (
                <div className="pt-4">
                  <Button onClick={() => setShowBkashDialog(true)} className="w-full sm:w-auto">
                    Subscribe with bKash
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Plan Details */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Access Plan</CardTitle>
              <CardDescription>Full access to all courses and features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">৳299</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <ul className="space-y-3">
                {[
                  "Access to all courses",
                  "Interactive simulations",
                  "Video lessons",
                  "Progress tracking",
                  "AI learning assistant",
                  "Mobile-friendly"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* bKash Payment Dialog */}
      <Dialog open={showBkashDialog} onOpenChange={setShowBkashDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pay with bKash</DialogTitle>
            <DialogDescription>
              Enter your bKash number to complete the payment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium">Payment Amount</p>
              <p className="text-3xl font-bold">৳299</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bkash-number">bKash Number</Label>
              <Input
                id="bkash-number"
                type="tel"
                placeholder="01XXXXXXXXX"
                value={bkashNumber}
                onChange={(e) => setBkashNumber(e.target.value)}
                maxLength={11}
              />
              <p className="text-xs text-muted-foreground">
                Enter your 11-digit bKash mobile number
              </p>
            </div>
            <Button
              onClick={handleBkashPayment}
              disabled={processing || bkashNumber.length !== 11}
              className="w-full"
            >
              {processing ? "Processing..." : "Confirm Payment"}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              This is a mock payment for demonstration purposes
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Subscription;
