import { useEffect, useState } from "react";
import { Database, Lock, HardDrive, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

export const DashboardStats = () => {
  const [stats, setStats] = useState({
    tweets: 0,
    uptime: "0h",
    storage: 0,
    realtime: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Get total tweet actions
      const { count: tweetCount } = await supabase
        .from("agent_stats")
        .select("*", { count: "exact" });

      // Get latest uptime record
      const { data: uptimeData } = await supabase
        .from("agent_uptime")
        .select("*")
        .order("started_at", { ascending: false })
        .limit(1);

      let uptimeString = "0h";
      if (uptimeData && uptimeData[0]) {
        const startTime = new Date(uptimeData[0].started_at);
        const endTime = uptimeData[0].ended_at 
          ? new Date(uptimeData[0].ended_at)
          : new Date();
        const hours = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60));
        uptimeString = `${hours}h`;
      }

      setStats({
        tweets: tweetCount || 0,
        uptime: uptimeString,
        storage: 0,
        realtime: 0,
      });
    };

    fetchStats();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'agent_stats'
        },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const statsConfig = [
    {
      title: "Twitter Actions",
      icon: Database,
      value: stats.tweets,
      label: "Total Actions",
    },
    {
      title: "Agent Uptime",
      icon: Lock,
      value: stats.uptime,
      label: "Current Session",
    },
    {
      title: "Storage",
      icon: HardDrive,
      value: stats.storage,
      label: "Storage Usage",
    },
    {
      title: "Realtime",
      icon: Zap,
      value: stats.realtime,
      label: "Active Connections",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsConfig.map((stat, index) => (
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
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};