import { Bot, Zap, Users, Shield } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Engagement",
    description: "Our AI understands context and engages naturally with your audience.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Real-time responses and engagement with your Twitter community.",
  },
  {
    icon: Users,
    title: "Grow Your Audience",
    description: "Smart interactions that help expand your Twitter following organically.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Your account is protected with enterprise-grade security measures.",
  },
];

export const Features = () => {
  return (
    <div className="py-24 bg-[#0A0A1B]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
          Powerful Features for Your Twitter Growth
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <feature.icon className="w-12 h-12 mb-4 text-secondary" />
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};