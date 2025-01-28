import { FileJson, Terminal, Database, Users, HardDrive, Zap, GitBranch, BookOpen, Boxes, Settings } from "lucide-react";

const menuItems = [
  { icon: FileJson, label: "Dashboard", id: "dashboard" },
  { icon: Terminal, label: "Character", id: "character" },
  { icon: Database, label: "Database" },
  { icon: Users, label: "Authentication" },
  { icon: HardDrive, label: "Storage" },
  { icon: Zap, label: "Edge Functions" },
  { icon: GitBranch, label: "Realtime" },
  { icon: BookOpen, label: "API Docs" },
  { icon: Boxes, label: "Integrations" },
  { icon: Settings, label: "Project Settings" },
];

interface DashboardSidebarProps {
  onPanelChange: (panel: string) => void;
  activePanel: string;
}

export const DashboardSidebar = ({ onPanelChange, activePanel }: DashboardSidebarProps) => {
  return (
    <div className="w-64 min-h-screen bg-black/20 border-r border-white/10">
      <div className="p-4">
        <h2 className="text-xl font-bold text-white mb-6">Dashboard</h2>
        <nav>
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center gap-3 w-full px-4 py-2 text-sm ${
                activePanel === item.id 
                  ? "text-blue-400 bg-white/10" 
                  : "text-gray-300 hover:bg-white/5"
              } rounded-md transition-colors`}
              onClick={() => item.id && onPanelChange(item.id)}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};