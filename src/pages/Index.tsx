import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0A0A1B] text-white">
      <header className="flex justify-between p-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <a href="/how-it-works">How It Works</a>
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <a href="/faq">FAQ</a>
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <a href="/pricing">Pricing</a>
        </button>
      </header>
      <Features />
      <Pricing />
    </div>
  );
};

export default Index;
