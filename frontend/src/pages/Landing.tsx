import React from 'react';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  GlobeAltIcon,
  StarIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'AI Document Translation',
    description: 'Transform complex legal jargon into clear, understandable language tailored to your reading level.',
    icon: DocumentTextIcon,
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Smart Legal Assistant',
    description: 'Get instant answers to legal questions with context-aware AI that understands your documents.',
    icon: ChatBubbleBottomCenterTextIcon,
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Intelligent Search',
    description: 'Find relevant legal precedents and documents using natural language search powered by AI.',
    icon: MagnifyingGlassIcon,
    color: 'from-green-500 to-green-600',
  },
];

const stats = [
  { label: 'Documents Simplified', value: '10K+', icon: DocumentTextIcon },
  { label: 'Communities Served', value: '500+', icon: UserGroupIcon },
  { label: 'Languages Supported', value: '15+', icon: GlobeAltIcon },
  { label: 'User Satisfaction', value: '4.9/5', icon: StarIcon },
];

const testimonials = [
  {
    content: "DocuLaw AI made it possible for me to understand my rental agreement. I never realized what I was signing before.",
    author: "Maria Rodriguez",
    role: "Community Member",
    avatar: "M.R",
  },
  {
    content: "As a community advocate, this tool helps me explain legal documents to families who don't speak English as their first language.",
    author: "James Chen",
    role: "Community Advocate",
    avatar: "J.C",
  },
  {
    content: "Finally, legal help that doesn't cost hundreds of dollars. This is exactly what our community needed.",
    author: "Aisha Williams",
    role: "Small Business Owner",
    avatar: "A.W",
  },
];

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="relative z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src="/assets/logo-mark.svg" alt="DocuLaw AI" className="h-8 w-8" />
              <span className="text-xl font-bold gradient-text">DocuLaw AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                Sign In
              </Link>
              <Link to="/onboarding" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Minimalist */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center min-h-[70vh]">
            {/* Left Side - Text */}
            <div className="lg:col-span-3 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                Legal Help That{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200">
                  Everyone Deserves
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/85 leading-relaxed font-light mb-8 max-w-2xl lg:max-w-none">
                Transform complex legal documents into plain English. Get AI-powered legal assistance 
                designed for underserved communities who can't afford expensive lawyers.
              </p>
            </div>

            {/* Right Side - Buttons */}
            <div className="lg:col-span-2 flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <Link to="/onboarding" className="block w-full max-w-sm btn-primary text-lg px-8 py-4 bg-white text-indigo-700 hover:bg-gray-50 text-center font-semibold shadow-xl">
                  Start Your Journey →
                </Link>
                <button className="w-full max-w-sm btn-ghost text-lg px-6 py-3 flex items-center justify-center border-white/40 hover:bg-white/10 hover:border-white/60 transition-all">
                  <PlayIcon className="h-5 w-5 mr-2" />
                  Watch Demo
                </button>
              </div>
              
              <div className="text-white/90 text-sm space-y-1 max-w-sm">
                <p>✓ No credit card required</p>
                <p>✓ Free for basic use</p>
                <p>✓ 2-minute setup</p>
              </div>
            </div>
          </div>
          
          {/* Stats Row - Bottom */}
          <div className="absolute bottom-16 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-white">
                  <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-white/70 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              The Legal Literacy Crisis
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Millions of Americans struggle with legal documents, creating barriers to justice 
              and opportunity in our communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="card-elevated p-8 text-center group">
              <div className="text-5xl font-bold gradient-text mb-4 group-hover:scale-110 transition-transform">67%</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Struggle to Understand</h3>
              <p className="text-gray-600">of Americans can't comprehend basic legal documents</p>
            </div>
            <div className="card-elevated p-8 text-center group">
              <div className="text-5xl font-bold gradient-text mb-4 group-hover:scale-110 transition-transform">$350</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Per Hour</h3>
              <p className="text-gray-600">Average cost of legal consultation in major cities</p>
            </div>
            <div className="card-elevated p-8 text-center group">
              <div className="text-5xl font-bold gradient-text mb-4 group-hover:scale-110 transition-transform">45M</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help</h3>
              <p className="text-gray-600">Americans who need but cannot afford legal assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              AI-Powered Legal Assistance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI with legal expertise to make complex 
              documents accessible to everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={feature.name} className="perspective-card group">
                <div className="card-3d p-8 h-full">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-legal-600 transition-colors">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Real Stories from Real People
            </h2>
            <p className="text-xl text-gray-600">
              See how DocuLaw AI is making a difference in communities across America
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="floating-card p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-legal-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-legal-700 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Join thousands of people who have already simplified their legal documents. 
            It only takes 2 minutes to get personalized legal assistance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/onboarding" className="btn-primary bg-white text-legal-700 hover:bg-gray-100 text-lg px-8 py-4 shadow-2xl">
              Start Free Assessment
            </Link>
            <Link to="/demo" className="btn-ghost text-lg px-8 py-4">
              Try Demo First
            </Link>
          </div>
          
          <p className="text-white/70 text-sm mt-6">
            No credit card required • Free for basic use • Secure & confidential
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img src="/assets/logo-white.svg" alt="DocuLaw AI" className="h-8 w-8" />
                <span className="text-xl font-bold">DocuLaw AI</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Making legal documents accessible to underserved communities through 
                AI-powered translation and assistance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DocuLaw AI. All rights reserved. Built to serve underserved communities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 