import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GitBranch } from "lucide-react";

export const DashboardContent = () => {
  return (
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
  );
};