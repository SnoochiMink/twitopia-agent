export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agent_configurations: {
        Row: {
          agent_constraints: string[] | null
          agent_goals: string[] | null
          agent_name: string | null
          agent_role: string | null
          agent_tools: Json | null
          created_at: string
          id: string
          interests: string | null
          is_active: boolean | null
          personality: string | null
          twitter_password: string | null
          twitter_username: string | null
          updated_at: string
          user_id: string
          voice_tone: string | null
        }
        Insert: {
          agent_constraints?: string[] | null
          agent_goals?: string[] | null
          agent_name?: string | null
          agent_role?: string | null
          agent_tools?: Json | null
          created_at?: string
          id?: string
          interests?: string | null
          is_active?: boolean | null
          personality?: string | null
          twitter_password?: string | null
          twitter_username?: string | null
          updated_at?: string
          user_id: string
          voice_tone?: string | null
        }
        Update: {
          agent_constraints?: string[] | null
          agent_goals?: string[] | null
          agent_name?: string | null
          agent_role?: string | null
          agent_tools?: Json | null
          created_at?: string
          id?: string
          interests?: string | null
          is_active?: boolean | null
          personality?: string | null
          twitter_password?: string | null
          twitter_username?: string | null
          updated_at?: string
          user_id?: string
          voice_tone?: string | null
        }
        Relationships: []
      }
      agent_stats: {
        Row: {
          action_type: string
          created_at: string
          details: Json | null
          id: number
          status: string
          tweet_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string
          details?: Json | null
          id?: number
          status: string
          tweet_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string
          details?: Json | null
          id?: number
          status?: string
          tweet_id?: string | null
        }
        Relationships: []
      }
      agent_uptime: {
        Row: {
          ended_at: string | null
          id: number
          started_at: string
          status: string
        }
        Insert: {
          ended_at?: string | null
          id?: number
          started_at?: string
          status: string
        }
        Update: {
          ended_at?: string | null
          id?: number
          started_at?: string
          status?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      Tweets: {
        Row: {
          created_at: string
          id: number
          tweet: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          tweet?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          tweet?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
