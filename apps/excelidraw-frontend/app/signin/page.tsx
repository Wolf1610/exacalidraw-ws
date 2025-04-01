'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, ArrowLeft, Loader } from 'lucide-react';
import axios from 'axios';
import { BACKEND_URL } from '@/api';
import React, { useEffect, useState } from 'react';
import { getToken, storeToken } from '@/utils/auth';

export default function SignInPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${BACKEND_URL}/signin`, {
        username,
        password
      });
      // console.log("Data-->>>", data);
      storeToken(data.token);
      setMessage("Signin Successfully!");
      router.push("/dashboard");
    } catch (error) {
      setMessage("Login failed");
      console.log("Login failed--->>", error);
    } finally {
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
            <LogIn className="h-8 w-8 text-blue-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>
          
          <form className="space-y-6" onSubmit={handleSignin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                placeholder="you@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                /> */}
                {/* <label className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label> */}
              </div>
              {/* <button type="button" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot password?
              </button> */}
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-semibold hover:bg-blue-700 transition-colors"
              disabled={loading} // disable button when loading
            >
              {loading ?(
                <>
                  <div><Loader className="animate-spin h-5 w-5 mr-2" />Signing in... </div>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?
              <Link
                href="/signup"
                className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
          <p className="text-red-500">{message}</p>
        </div>
      </div>
    </div>
  );
}