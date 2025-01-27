import React from "react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-[#0A0A1B] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            How It Works
          </h2>
          <p className="mt-2 text-gray-400">
            This page will explain how the Twitopia platform works.
          </p>
        </div>
        <div className="text-gray-300">
          <p>
            Here you can provide detailed information about the features and functionalities of Twitopia.
          </p>
          <p>
            You might include sections on user registration, content creation, and community engagement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
