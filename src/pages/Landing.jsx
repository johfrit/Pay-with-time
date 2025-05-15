import React from 'react';
import { Link } from 'wasp/client/router';

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">Welcome to Pay with Time</h1>
        <p className="text-lg text-gray-700 mb-8">
          Pay with Time is a platform where you can make a difference by participating in small tasks organized by NGOs and earn exciting digital rewards.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/signup" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </Link>
          <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
