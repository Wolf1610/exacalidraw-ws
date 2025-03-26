'use client';

import Link from 'next/link';
import { Pencil, Share2, Download, Users, Shapes, Palette } from 'lucide-react';

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 md:py-19">
        <div className="flex justify-end mb-8">
          <div className="space-x-4">
            <Link
              href="/signin"
              className="px-6 py-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Collaborate and Create
            <span className="text-blue-600"> Beautiful Diagrams</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A virtual whiteboard for sketching hand-drawn like diagrams, with easy sharing and real-time collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signin" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              <button>
                Start Drawing
              </button>
            </Link>
            <button className="px-7 py-3 bg-white text-blue-600 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </header>

      {/* Preview Image */}
      <div className="container mx-auto px-4 mb-24">
        <div className="relative rounded-xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=2000&q=80" 
            alt="Whiteboard Collaboration"
            className="w-full object-cover"
          />
        </div>
      </div>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Everything you need to bring ideas to life</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Pencil}
            title="Freehand Drawing"
            description="Draw naturally with our smooth freehand drawing tools and precise shape recognition."
          />
          <FeatureCard
            icon={Share2}
            title="Easy Sharing"
            description="Share your drawings instantly with a simple link, no account required."
          />
          <FeatureCard
            icon={Users}
            title="Real-time Collaboration"
            description="Work together with your team in real-time, see changes as they happen."
          />
          <FeatureCard
            icon={Download}
            title="Export Options"
            description="Export your drawings in multiple formats including PNG, SVG, and PDF."
          />
          <FeatureCard
            icon={Shapes}
            title="Smart Shapes"
            description="Perfect geometric shapes with our intelligent shape recognition system."
          />
          <FeatureCard
            icon={Palette}
            title="Customization"
            description="Personalize your drawings with a wide range of colors and styles."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 mt-24">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 Excalidraw Clone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}