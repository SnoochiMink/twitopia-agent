import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GitBranch, Twitter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface AgentAction {
  id: number;
  created_at: string;
  action_type: string;
  status: string;
  tweet_id: string | null;
}

interface AgentConfig {
  id: string;
  personality: string | null;
  interests: string | null;
  voice_tone: string | null;
  is_active: boolean;
}

interface DashboardContentProps {
  activePanel?: string;
}

export const DashboardContent = ({ activePanel = "dashboard" }: DashboardContentProps) => {
  const [recentActions, setRecentActions] = useState<AgentAction[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch agent configuration
  const { data: agentConfig, isLoading: configLoading } = useQuery({
    queryKey: ['agentConfig'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('agent_configurations')
        .select('*')
        .maybeSingle();

      if (error) throw error;
      return data as AgentConfig;
    }
  });

  // Update agent configuration
  const updateConfig = useMutation({
    mutationFn: async (values: Partial<AgentConfig>) => {
      const { data, error } = await supabase
        .from('agent_configurations')
        .upsert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          ...values
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agentConfig'] });
      toast({
        title: "Settings saved",
        description: "Your agent's configuration has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    const fetchRecentActions = async () => {
      const { data } = await supabase
        .from("agent_stats")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (data) {
        setRecentActions(data);
      }
    };

    fetchRecentActions();

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
          fetchRecentActions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = {
      personality: formData.get('personality') as string,
      interests: formData.get('interests') as string,
      voice_tone: formData.get('voice_tone') as string,
    };
    updateConfig.mutate(values);
  };

  if (activePanel === "character") {
    return (
      <Card className="bg-black/20 border-white/10 text-white">
        <CardHeader>
          <CardTitle className="text-lg">Character Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Personality</h3>
              <textarea 
                name="personality"
                className="w-full h-32 bg-black/20 border border-white/10 rounded-md p-3 text-sm text-white"
                placeholder="Describe your agent's personality..."
                defaultValue={agentConfig?.personality || ""}
              />
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Interests</h3>
              <textarea 
                name="interests"
                className="w-full h-32 bg-black/20 border border-white/10 rounded-md p-3 text-sm text-white"
                placeholder="What topics should your agent tweet about?"
                defaultValue={agentConfig?.interests || ""}
              />
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Voice & Tone</h3>
              <textarea 
                name="voice_tone"
                className="w-full h-32 bg-black/20 border border-white/10 rounded-md p-3 text-sm text-white"
                placeholder="How should your agent express itself?"
                defaultValue={agentConfig?.voice_tone || ""}
              />
            </div>
            <div className="flex justify-end">
              <Button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={updateConfig.isPending}
              >
                {updateConfig.isPending ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-black/20 border-white/10 text-white">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {recentActions.length > 0 ? (
            <div className="space-y-4">
              {recentActions.map((action) => (
                <div
                  key={action.id}
                  className="flex items-center gap-2 text-sm border-b border-white/10 pb-2 last:border-0"
                >
                  <Twitter className="w-4 h-4 text-blue-400" />
                  <div>
                    <span className="text-blue-400">{action.action_type}</span>
                    <span className="text-gray-400"> - {action.status}</span>
                    <div className="text-xs text-gray-500">
                      {new Date(action.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No recent activity to display</p>
          )}
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