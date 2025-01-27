import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Database,
  Lock,
  HardDrive,
  Zap,
  FileJson,
  GitBranch,
  Settings,
  Users,
  Terminal,
  BookOpen,
  Boxes,
  LogOut,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const stats = [
    {
      title: "Database",
      icon: Database,
      requests: "REST Requests",
      count: 0,
    },
    {
      title: "Auth",
      icon: Lock,
      requests: "Auth Requests",
      count: 1,
    },
    {
      title: "Storage",
      icon: HardDrive,
      requests: "Storage Requests",
      count: 0,
    },
    {
      title: "Realtime",
      icon: Zap,
      requests: "Realtime Requests",
      count: 0,
    },
  ];

  const menuItems = [
    { icon: FileJson, label: "Table Editor" },
    { icon: Terminal, label: "SQL Editor" },
    { icon: Database, label: "Database" },
    { icon: Users, label: "Authentication" },
    { icon: HardDrive, label: "Storage" },
    { icon: Zap, label: "Edge Functions" },
    { icon: GitBranch, label: "Realtime" },
    { icon: BookOpen, label: "API Docs" },
    { icon: Boxes, label: "Integrations" },
    { icon: Settings, label: "Project Settings" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A1B] text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-black/20 border-r border-white/10">
          <div className="p-4">
            <h2 className="text-xl font-bold text-white mb-6">Dashboard</h2>
            <nav>
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-300 hover:bg-white/5 rounded-md transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">Project Overview</h1>
                <p className="text-sm text-gray-400">Statistics for past 24 hours</p>
              </div>
              <div className="flex gap-4">
                <Button 
                  variant="ghost" 
                  className="text-red-400 hover:text-red-300 hover:bg-red-950/30"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </Button>
                <Button className="bg-white/5 text-white hover:bg-white/10 border border-white/10">
                  Project Status
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-black/20 border-white/10 text-white">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">
                      <div className="flex items-center gap-2">
                        <stat.icon className="w-4 h-4" />
                        {stat.title}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.count}</div>
                    <p className="text-xs text-gray-400 mt-1">{stat.requests}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">No recent activity to display</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader>
                  <CardTitle className="text-lg">Project Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <a
                      href="https://supabase.com/docs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 hover:underline"
                    >
                      <BookOpen className="w-4 h-4" />
                      Documentation
                    </a>
                    <a
                      href="https://github.com/supabase"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 hover:underline"
                    >
                      <GitBranch className="w-4 h-4" />
                      GitHub Repository
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
