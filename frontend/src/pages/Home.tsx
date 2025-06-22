import React from 'react';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassIcon,
  CloudArrowUpIcon,
  ChartBarIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';

const quickActions = [
  {
    name: 'Upload New Document',
    description: 'Get your legal document translated instantly',
    icon: CloudArrowUpIcon,
    href: '/upload',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    name: 'Start New Chat',
    description: 'Ask legal questions and get instant help',
    icon: ChatBubbleBottomCenterTextIcon,
    href: '/chat',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
  },
  {
    name: 'Search Documents',
    description: 'Find specific legal information quickly',
    icon: MagnifyingGlassIcon,
    href: '/search',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    name: 'View Analytics',
    description: 'Track your legal document progress',
    icon: ChartBarIcon,
    href: '/dashboard',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
  },
];

const recentActivity = [
  {
    type: 'document',
    title: 'Rental Agreement Simplified',
    time: '2 hours ago',
    status: 'completed',
    complexity: 'reduced by 75%',
  },
  {
    type: 'chat',
    title: 'Employment Contract Questions',
    time: '1 day ago',
    status: 'active',
    messages: '12 messages',
  },
  {
    type: 'search',
    title: 'Insurance Policy Terms',
    time: '2 days ago',
    status: 'completed',
    results: '8 relevant results',
  },
];

const tips = [
  {
    title: 'Upload Multiple Formats',
    description: 'We support PDF, DOC, DOCX, and TXT files up to 10MB',
    icon: '📄',
  },
  {
    title: 'Ask Follow-up Questions',
    description: 'Our AI remembers context from your documents for better answers',
    icon: '💡',
  },
  {
    title: 'Save Important Sections',
    description: 'Bookmark key parts of simplified documents for quick reference',
    icon: '🔖',
  },
];

const Home: React.FC = () => {
  // Get user profile from localStorage (from onboarding)
  const userProfile = JSON.parse(localStorage.getItem('doculaw_user_profile') || '{}');
  const userName = userProfile.name || 'there';
  const englishLevel = userProfile.englishProficiency || 'intermediate';

  return (
    <div className="px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 hero-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-1 mb-6">
            Welcome back, {userName}
          </h1>
          <p className="subheading text-white/90 mb-8">
            Your personalized legal assistant is ready to help you understand complex documents.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/upload" className="btn-primary bg-white text-legal-700 hover:bg-gray-100 body-large px-8 py-4">
              Upload Document
            </Link>
            <Link to="/chat" className="btn-ghost body-large px-8 py-4">
              Ask Questions
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 md:py-24 section-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-2 text-blue-700 mb-12 text-center">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                         {quickActions.map((action, index) => (
               <Link 
                 key={action.name} 
                 to={action.href}
                 className="card-elevated p-8 text-center group hover:shadow-gradient-glow transition-all duration-300"
               >
                 <div className="bg-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                   <action.icon className="h-8 w-8 text-white" />
                 </div>
                 <h3 className="heading-4 text-gray-900 mb-4 group-hover:text-legal-600 transition-colors">
                   {action.name}
                 </h3>
                 <p className="body-base text-gray-600 mb-6">{action.description}</p>
                <div className="flex items-center text-legal-600 font-medium body-small justify-center">
                  Get Started
                  <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-16 md:py-24 section-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="heading-2 text-blue-700">Recent Activity</h2>
            <Link to="/documents" className="body-base text-legal-600 hover:text-legal-700 transition-colors">
              View All →
            </Link>
          </div>
          
          <div className="space-y-6">
            {recentActivity.map((activity, index) => (
              <div key={index} className="card p-8 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    activity.type === 'document' ? 'bg-blue-600' :
                    activity.type === 'chat' ? 'bg-purple-600' : 'bg-cyan-600'
                  }`}>
                    {activity.type === 'document' ? <DocumentTextIcon className="h-6 w-6 text-white" /> :
                     activity.type === 'chat' ? <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-white" /> :
                     <MagnifyingGlassIcon className="h-6 w-6 text-white" />}
                  </div>
                  <div>
                    <h3 className="heading-5 text-gray-900">{activity.title}</h3>
                    <div className="flex items-center body-small text-gray-600 space-x-4">
                      <span>{activity.time}</span>
                      <span>•</span>
                      <span>{activity.complexity || activity.messages || activity.results}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full body-small font-medium ${
                    activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                    activity.status === 'active' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <EllipsisVerticalIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips & Insights */}
      <section className="py-16 md:py-24 section-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-2 text-blue-700 mb-12 text-center">Tips & Insights</h2>
          
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {tips.map((tip, index) => (
              <div key={index} className="floating-card p-8 group">
                <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-2xl">
                  {tip.icon}
                </div>
                <h3 className="heading-4 text-gray-900 mb-4 group-hover:text-legal-600 transition-colors">
                  {tip.title}
                </h3>
                <p className="body-large text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Stats */}
      <section className="py-16 md:py-24 section-gradient-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-2 text-blue-700 mb-8">
            Your Legal Journey
          </h2>
          <p className="subheading text-gray-600 mb-16 max-w-3xl mx-auto">
            See how much time and money you've saved using DocuLaw AI.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-elevated p-8 text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">89%</div>
              <div className="body-base text-gray-600">Complexity Reduction</div>
            </div>
            <div className="card-elevated p-8 text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">4.2hrs</div>
              <div className="body-base text-gray-600">Average Time Saved</div>
            </div>
            <div className="card-elevated p-8 text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">$1,200</div>
              <div className="body-base text-gray-600">Legal Costs Avoided</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <div className="card-elevated p-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <StarIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            You're Making a Difference!
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            By using DocuLaw AI, you're part of a movement to make legal information 
            accessible to everyone. Every document you simplify helps build a better 
            understanding of legal rights in underserved communities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-700">98%</div>
              <div className="text-sm text-gray-600">Complexity Reduction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700">2.5 hrs</div>
              <div className="text-sm text-gray-600">Average Time Saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700">$280</div>
              <div className="text-sm text-gray-600">Legal Costs Avoided</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 