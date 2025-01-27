import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0A0A1B] text-white">
      <header className="flex justify-between items-center p-4">
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
        <Link to="/auth">
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            <UserCircle className="mr-2 h-5 w-5" />
            Login / Sign Up
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