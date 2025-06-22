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
      {/* Welcome Section */}
      <div className="card-elevated p-8 bg-gradient-to-r from-legal-700 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-4">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Ready to simplify more legal documents? Your English level is set to{' '}
            <span className="font-semibold capitalize">{englishLevel}</span> - 
            we'll adjust our explanations accordingly.
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center bg-white text-legal-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <CloudArrowUpIcon className="h-5 w-5 mr-2" />
            Upload Your Next Document
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="perspective-card group"
            >
              <div className={`card-3d p-6 h-full ${action.bgColor} hover:scale-105 transition-all duration-300`}>
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${action.color} mb-4`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-legal-600 transition-colors">
                  {action.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                <div className="flex items-center text-legal-600 font-medium text-sm">
                  Get Started
                  <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
          <Link
            to="/dashboard"
            className="text-legal-600 hover:text-legal-700 font-medium transition-colors flex items-center"
          >
            View All
            <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="floating-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    activity.type === 'document' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'chat' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {activity.type === 'document' ? <DocumentTextIcon className="h-6 w-6" /> :
                     activity.type === 'chat' ? <ChatBubbleBottomCenterTextIcon className="h-6 w-6" /> :
                     <MagnifyingGlassIcon className="h-6 w-6" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <span className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {activity.time}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span>{
                        activity.complexity || activity.messages || activity.results
                      }</span>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                  activity.status === 'active' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {activity.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips & Tricks */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tips & Tricks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div key={index} className="card-elevated p-6 group hover:scale-105 transition-all duration-300">
              <div className="text-3xl mb-4">{tip.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-legal-600 transition-colors">
                {tip.title}
              </h3>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

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
              <div className="text-3xl font-bold gradient-text">98%</div>
              <div className="text-sm text-gray-600">Complexity Reduction</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">2.5 hrs</div>
              <div className="text-sm text-gray-600">Average Time Saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">$280</div>
              <div className="text-sm text-gray-600">Legal Costs Avoided</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 