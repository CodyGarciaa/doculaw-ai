import React from 'react';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassIcon,
  CloudArrowUpIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Document Translation',
    description: 'Upload complex legal documents and get easy-to-understand translations instantly.',
    icon: DocumentTextIcon,
    href: '/upload',
  },
  {
    name: 'AI Legal Assistant',
    description: 'Ask questions about legal concepts and get clear, helpful explanations.',
    icon: ChatBubbleBottomCenterTextIcon,
    href: '/chat',
  },
  {
    name: 'Smart Search',
    description: 'Find relevant legal documents and precedents with intelligent search.',
    icon: MagnifyingGlassIcon,
    href: '/search',
  },
];

const Home: React.FC = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Make Legal Documents
          <span className="text-legal-600"> Accessible</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          DocuLaw AI helps translate complex legal language into plain English, making legal 
          information accessible to everyone, especially underserved communities.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/upload"
            className="btn-primary"
          >
            Upload Document
          </Link>
          <Link
            to="/chat"
            className="btn-secondary"
          >
            Start Chat <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="py-16 bg-white rounded-lg shadow-sm mb-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Bridging the Legal Literacy Gap
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Most people have limited understanding of legal documents and public policy, 
              disproportionately affecting low-income and minority communities who cannot 
              afford expensive legal consultation.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-legal-600">67%</div>
              <div className="mt-2 text-sm text-gray-600">
                of Americans struggle with legal document comprehension
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-legal-600">$300+</div>
              <div className="mt-2 text-sm text-gray-600">
                Average hourly rate for legal consultation
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-legal-600">45M</div>
              <div className="mt-2 text-sm text-gray-600">
                Americans who need but cannot afford legal help
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Powerful Features for Legal Understanding
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our AI-powered platform makes legal information accessible through multiple tools
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link
                key={feature.name}
                to={feature.href}
                className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <span className="inline-flex rounded-lg bg-legal-50 p-3 ring-4 ring-white">
                    <feature.icon className="h-6 w-6 text-legal-600" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-legal-600">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
                <span
                  className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-legal-300"
                  aria-hidden="true"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="bg-legal-700 rounded-lg shadow-xl">
          <div className="px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Get Started Today
              </h2>
              <p className="mt-4 text-lg text-legal-200">
                Upload your first legal document and see the difference AI-powered translation can make.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  to="/upload"
                  className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-legal-700 shadow-sm hover:bg-legal-50 transition-colors"
                >
                  <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                  Upload Your First Document
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 