import { Database, Lock, HardDrive, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export const DashboardStats = () => {
  return (
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
  );
};