import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  EyeIcon,
  TrashIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { Document } from '../types';
import { formatDate, formatFileSize, truncateText } from '../utils/helpers';

// Mock data - replace with actual API calls
const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Employment Contract - Tech Company',
    originalContent: 'This is a complex employment contract...',
    simplifiedContent: 'This is a simple explanation of the employment contract...',
    uploadDate: new Date('2024-01-15'),
    status: 'completed',
    fileType: 'application/pdf',
    fileSize: 2048000,
    summary: 'Employment agreement with standard terms and benefits',
    complexity: 'medium',
  },
  {
    id: '2',
    title: 'Lease Agreement - Apartment Rental',
    originalContent: 'Whereas the lessor agrees to lease...',
    uploadDate: new Date('2024-01-14'),
    status: 'processing',
    fileType: 'application/pdf',
    fileSize: 1536000,
    complexity: 'high',
  },
  {
    id: '3',
    title: 'Privacy Policy - Social Media Platform',
    originalContent: 'This privacy policy describes how we collect...',
    simplifiedContent: 'This privacy policy explains how the company uses your data...',
    uploadDate: new Date('2024-01-13'),
    status: 'completed',
    fileType: 'text/plain',
    fileSize: 512000,
    summary: 'Privacy policy outlining data collection and usage practices',
    complexity: 'low',
  },
];

const Documents: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'processing' | 'error'>('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDocuments(mockDocuments);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredDocuments = documents.filter(doc => 
    filter === 'all' || doc.status === filter
  );

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: Document['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'processing':
        return 'Processing';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  const getComplexityColor = (complexity?: Document['complexity']) => {
    switch (complexity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-legal-600"></div>
          <span className="ml-2 text-gray-600">Loading documents...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Documents</h1>
          <p className="mt-2 text-gray-600">
            Manage and view your uploaded legal documents
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/upload"
            className="btn-primary"
          >
            Upload New Document
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-8" aria-label="Tabs">
          {[
            { key: 'all', label: 'All Documents', count: documents.length },
            { key: 'completed', label: 'Completed', count: documents.filter(d => d.status === 'completed').length },
            { key: 'processing', label: 'Processing', count: documents.filter(d => d.status === 'processing').length },
            { key: 'error', label: 'Error', count: documents.filter(d => d.status === 'error').length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`
                whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm
                ${filter === tab.key
                  ? 'border-legal-500 text-legal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
              <span className={`
                ml-2 py-0.5 px-2 rounded-full text-xs
                ${filter === tab.key
                  ? 'bg-legal-100 text-legal-600'
                  : 'bg-gray-100 text-gray-900'
                }
              `}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Documents List */}
      {filteredDocuments.length === 0 ? (
        <div className="text-center py-12">
          <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === 'all' 
              ? 'Get started by uploading your first legal document.'
              : `No documents with ${filter} status.`
            }
          </p>
          <div className="mt-6">
            <Link to="/upload" className="btn-primary">
              Upload Document
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredDocuments.map((document) => (
              <li key={document.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-10 w-10 text-gray-400 mr-4" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center">
                          <p className="text-lg font-medium text-gray-900 truncate">
                            {document.title}
                          </p>
                          <div className="ml-2 flex items-center">
                            {getStatusIcon(document.status)}
                            <span className="ml-1 text-sm text-gray-500">
                              {getStatusText(document.status)}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <span>Uploaded {formatDate(document.uploadDate)}</span>
                          <span className="mx-2">•</span>
                          <span>{formatFileSize(document.fileSize)}</span>
                          {document.complexity && (
                            <>
                              <span className="mx-2">•</span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getComplexityColor(document.complexity)}`}>
                                {document.complexity} complexity
                              </span>
                            </>
                          )}
                        </div>
                        {document.summary && (
                          <p className="mt-2 text-sm text-gray-600">
                            {truncateText(document.summary, 120)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {document.status === 'completed' && (
                        <Link
                          to={`/documents/${document.id}`}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-legal-500"
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      )}
                      <button
                        onClick={() => deleteDocument(document.id)}
                        className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <TrashIcon className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Documents; 