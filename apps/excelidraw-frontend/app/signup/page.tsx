'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@/api';

export default function SignUpPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/signup`, {
        username, 
        password
      });
      setMessage(response.data.message);
      setLoading(false);

      router.push("/signin");

    } catch (error) {
      setMessage("Sign up Failed");
      console.log("Error in Signup fe --->", error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button 
          onClick={() => router.push('/')}
          className="mb-8 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <UserPlus className="h-8 w-8 text-blue-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-8">Create Account</h2>
          
          <form className="space-y-6" onSubmit={handleSignup}>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                placeholder="you@example.com"
                value={username}
                onChange={(e) => {setUsername(e.target.value)}}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-semibold hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Creating your Account....." : "Create Account"}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?
              <Link
                href="/signin"
                className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
          <p className="text-red-500">{message}</p>
        </div>
      </div>
    </div>
  );
}