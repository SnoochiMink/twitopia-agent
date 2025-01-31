import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  );

  try {
    const { action, agentId } = await req.json();

    // Get the agent configuration
    const { data: agentConfig, error: configError } = await supabaseClient
      .from('agent_configurations')
      .select('*')
      .eq('id', agentId)
      .single();

    if (configError) {
      throw new Error('Failed to fetch agent configuration');
    }

    // Log the action start in agent_stats
    const { data: statsData, error: statsError } = await supabaseClient
      .from('agent_stats')
      .insert({
        action_type: action,
        status: 'STARTED',
        details: {
          agent_id: agentId,
          timestamp: new Date().toISOString(),
        }
      })
      .select()
      .single();

    if (statsError) {
      throw new Error('Failed to log agent action');
    }

    // Here you would make the actual call to your agent's API
    // Replace this URL with your agent's actual endpoint
    const agentResponse = await fetch('YOUR_AGENT_API_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers your agent requires
      },
      body: JSON.stringify({
        action,
        config: agentConfig,
      }),
    });

    const agentData = await agentResponse.json();

    // Update the action status in agent_stats
    await supabaseClient
      .from('agent_stats')
      .update({
        status: 'COMPLETED',
        details: {
          ...statsData.details,
          response: agentData,
        }
      })
      .eq('id', statsData.id);

    return new Response(
      JSON.stringify({ 
        success: true,
        data: agentData,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in agent-bridge function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});