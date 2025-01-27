import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

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
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0A0A1B] text-white">
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
    </div>
  );
};

export default Dashboard;