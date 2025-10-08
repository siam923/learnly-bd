import { GraduationCap, Menu, Crown, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLearning } from '@/contexts/LearningContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const { currentClass } = useLearning();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    setIsAdmin(data?.role === "admin");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span>LearnHub BD</span>
        </button>

        {currentClass && (
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{currentClass.title}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/subscription")}
            className="hidden md:flex"
          >
            <Crown className="w-4 h-4 mr-2" />
            Subscription
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate("/subscription")}>
                <Crown className="w-4 h-4 mr-2" />
                Subscription
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem onClick={() => navigate("/admin")}>
                  <Shield className="w-4 h-4 mr-2" />
                  Admin Panel
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
