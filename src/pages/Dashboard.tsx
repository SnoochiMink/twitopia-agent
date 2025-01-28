import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkUser();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate("/auth");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0A0A1B] text-white relative">
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <DashboardHeader />
            <DashboardStats />
            <DashboardContent />
          </div>
        </div>
      </div>
      <Link to="/">
        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-6 left-6 bg-white/5 hover:bg-white/10 text-white rounded-full p-3"
        >
          <House className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
};

export default Dashboard;