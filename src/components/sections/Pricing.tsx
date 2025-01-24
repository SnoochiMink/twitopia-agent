import { GradientButton } from "../ui/gradient-button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "49",
    features: ["1,000 AI tokens", "Basic automation", "24/7 support", "Analytics dashboard"],
  },
  {
    name: "Pro",
    price: "99",
    features: ["5,000 AI tokens", "Advanced automation", "Priority support", "Custom AI training"],
  },
  {
    name: "Enterprise",
    price: "249",
    features: ["Unlimited AI tokens", "Custom solutions", "Dedicated manager", "API access"],
  },
];

export const Pricing = () => {
  return (
    <div className="py-24 bg-[#0A0A1B]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="p-8 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-white">${plan.price}</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 mr-2 text-secondary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <GradientButton className="w-full">Get Started</GradientButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};