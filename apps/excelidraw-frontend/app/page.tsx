'use client';

import Link from 'next/link';
import { Pencil, Share2, Download, Users, Shapes, Palette } from 'lucide-react';

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
        <Icon className="h-7 w-7 text-blue-600" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-end space-x-4">
            <Link
              href="/signin"
              className="px-6 py-2.5 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Collaborate and Create
            <span className="text-blue-600 block mt-2"> Beautiful Diagrams</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            A virtual whiteboard for sketching hand-drawn like diagrams, with easy sharing and real-time collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg text-lg">
              Start Drawing
            </button>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 text-lg group">
              Watch Demo
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </header>

      {/* Preview Image */}
      <div className="container mx-auto px-4 mb-32">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50 bg-white p-3 transform hover:scale-[1.01] transition-transform duration-500">
          {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div> */}
          <img 
            src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=2000&q=80" 
            alt="Whiteboard Collaboration"
            className="w-full object-cover rounded-xl h-[600px]"
          />
        </div>
      </div>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 pointer-events-none"></div>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Everything you need to bring ideas to life</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          <FeatureCard
            icon={Pencil}
            title="Freehand Drawing"
            description="Draw naturally with our smooth freehand drawing tools and precise shape recognition."
          />
          <FeatureCard
            icon={Share2}
            title="Easy Sharing(Pending...)"
            description="Share your drawings instantly with a simple link, no account required."
          />
          <FeatureCard
            icon={Users}
            title="Real-time Collaboration"
            description="Work together with your team in real-time, see changes as they happen."
          />
          <FeatureCard
            icon={Download}
            title="Export Options(Pending...)"
            description="Export your drawings in multiple formats including PNG, SVG, and PDF."
          />
          <FeatureCard
            icon={Shapes}
            title="Smart Shapes"
            description="Perfect geometric shapes with our intelligent shape recognition system."
          />
          <FeatureCard
            icon={Palette}
            title="Customization(Pending...)"
            description="Personalize your drawings with a wide range of colors and styles."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-16 mt-32">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 font-medium">© 2025 ChatRoom. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}