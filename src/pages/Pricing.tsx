import React from 'react';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-[#0A0A1B] text-white p-8">
      <h1 className="text-5xl font-extrabold mb-6 text-center">Pricing</h1>
      <p className="mb-8 text-center text-lg">
        Discover our subscription plans and choose the one that best fits your needs.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-2">Basic Plan</h2>
          <p className="mb-4">Access to all basic features.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Choose Basic
          </button>
        </div>
        <div className="bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-2">Pro Plan</h2>
          <p className="mb-4">Includes all basic features plus premium support.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Choose Pro
          </button>
        </div>
        <div className="bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-2">Enterprise Plan</h2>
          <p className="mb-4">Custom solutions for large organizations.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Choose Enterprise
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
