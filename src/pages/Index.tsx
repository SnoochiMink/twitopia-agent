import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserCircle, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A1B] text-white">
      <header className="flex justify-end items-center p-4 gap-4">
        <div className="flex gap-4">
          <Link to="/how-it-works">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-primary/20">
              How It Works
            </Button>
          </Link>
          <Link to="/faq">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-primary/20">
              FAQ
            </Button>
          </Link>
          <Link to="/pricing">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-primary/20">
              Pricing
            </Button>
          </Link>
        </div>
        <Link to={session ? "/dashboard" : "/auth"}>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            {session ? (
              <>
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Dashboard
              </>
            ) : (
              <>
                <UserCircle className="mr-2 h-5 w-5" />
                Login / Sign Up
              </>
            )}
          </Button>
        </Link>
      </header>
      <Hero />
      <Features />
      <Pricing />
    </div>
  );
};

export default Index;