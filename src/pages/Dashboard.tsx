import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";

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
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-primary/5 border-r border-primary/10">
          <div className="p-4">
            <h2 className="text-xl font-bold text-primary mb-6">Dashboard</h2>
            <nav>
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-foreground/80 hover:bg-primary/10 rounded-md transition-colors"
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
                <h1 className="text-2xl font-bold text-primary mb-2">Project Overview</h1>
                <p className="text-sm text-muted-foreground">Statistics for past 24 hours</p>
              </div>
              <div className="flex gap-4">
                <button className="px-4 py-2 text-sm bg-destructive/10 text-destructive rounded-md hover:bg-destructive/20 transition-colors">
                  Security Issues
                </button>
                <button className="px-4 py-2 text-sm bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors">
                  Project Status
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-card border-primary/10">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <stat.icon className="w-4 h-4" />
                        {stat.title}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stat.count}</div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.requests}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-primary/10">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">No recent activity to display</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-primary/10">
                <CardHeader>
                  <CardTitle className="text-lg">Project Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <a
                      href="https://supabase.com/docs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <BookOpen className="w-4 h-4" />
                      Documentation
                    </a>
                    <a
                      href="https://github.com/supabase"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
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