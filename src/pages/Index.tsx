import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0A0A1B] text-white">
      <Hero />
      <Features />
      <Pricing />
    </div>
  );
};

export default Index;