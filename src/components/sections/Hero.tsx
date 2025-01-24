import { GradientButton } from "../ui/gradient-button";
import { Twitter } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A1B]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-50" />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
          Automate Your Twitter Presence with AI
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Let our AI agent handle your Twitter engagement while you focus on what matters. Grow your audience, engage with followers, and maintain a consistent presence automatically.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <GradientButton className="group">
            <Twitter className="mr-2 h-5 w-5" />
            Connect with Twitter
          </GradientButton>
          <button className="px-6 py-3 text-gray-300 hover:text-white transition-colors">
            Learn More →
          </button>
        </div>
      </div>
    </div>
  );
};