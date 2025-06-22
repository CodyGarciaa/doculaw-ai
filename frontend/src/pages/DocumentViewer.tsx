import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  DocumentDuplicateIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline';
import { Document } from '../types';
import { formatDate, formatFileSize } from '../utils/helpers';

// Mock document data
const mockDocument: Document = {
  id: '1',
  title: 'Employment Contract - Tech Company',
  originalContent: `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into as of [DATE], between [COMPANY NAME], a Delaware corporation ("Company"), and [EMPLOYEE NAME], an individual ("Employee").

WHEREAS, Company desires to employ Employee on the terms and conditions set forth herein; and
WHEREAS, Employee desires to be employed by Company on such terms and conditions;

NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the parties agree as follows:

1. EMPLOYMENT AND DUTIES
Employee shall serve as [POSITION TITLE] and shall have such powers, duties, and responsibilities as may be prescribed by Company's Board of Directors or Chief Executive Officer. Employee agrees to devote Employee's full business time and attention to the performance of Employee's duties hereunder.

2. TERM
This Agreement shall commence on [START DATE] and shall continue until terminated in accordance with the provisions hereof.

3. COMPENSATION
As compensation for Employee's services hereunder, Company shall pay Employee a base salary of $[AMOUNT] per annum, payable in accordance with Company's regular payroll practices.

4. CONFIDENTIALITY
Employee acknowledges that Employee may have access to certain confidential and proprietary information of Company. Employee agrees to maintain the confidentiality of such information and not to disclose it to any third party.`,
  
  simplifiedContent: `EMPLOYMENT AGREEMENT - SIMPLIFIED VERSION

This is an employment contract between you and the company.

KEY POINTS:

What this contract is about:
• The company wants to hire you for a specific job
• You want to work for the company
• This contract explains the rules for your employment

Your Job (Section 1):
• You will work as [POSITION TITLE]
• Your boss and the company's leaders will tell you what to do
• You need to focus all your work time on this job

How Long This Lasts (Section 2):
• Your job starts on [START DATE]
• It continues until either you quit or the company lets you go (following the rules in this contract)

Your Pay (Section 3):
• The company will pay you $[AMOUNT] per year
• You'll get paid according to the company's normal schedule (like every two weeks)

Keeping Secrets (Section 4):
• You might learn company secrets while working
• You cannot tell these secrets to anyone outside the company
• This protects the company's private information

IMPORTANT: This is a simplified explanation. The original legal document contains more details and specific legal terms that may be important for your situation.`,
  
  uploadDate: new Date('2024-01-15'),
  status: 'completed',
  fileType: 'application/pdf',
  fileSize: 2048000,
  summary: 'Employment agreement with standard terms and benefits',
  complexity: 'medium',
};

const DocumentViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [showComparison, setShowComparison] = useState(true);
  const [activeView, setActiveView] = useState<'original' | 'simplified'>('simplified');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDocument(mockDocument);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-legal-600"></div>
          <span className="ml-2 text-gray-600">Loading document...</span>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Document not found</h2>
          <p className="mt-2 text-gray-600">The document you're looking for doesn't exist.</p>
          <Link to="/documents" className="mt-4 btn-primary inline-block">
            Back to Documents
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Link
            to="/documents"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Documents
          </Link>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{document.title}</h1>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span>Uploaded {formatDate(document.uploadDate)}</span>
              <span className="mx-2">•</span>
              <span>{formatFileSize(document.fileSize)}</span>
              <span className="mx-2">•</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${document.complexity === 'low' ? 'bg-green-100 text-green-800' : 
                  document.complexity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'}`}>
                {document.complexity} complexity
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* View Toggle for Mobile */}
            <div className="sm:hidden">
              <select
                value={activeView}
                onChange={(e) => setActiveView(e.target.value as 'original' | 'simplified')}
                className="input-field"
              >
                <option value="simplified">Simplified Version</option>
                <option value="original">Original Document</option>
              </select>
            </div>
            
            {/* Comparison Toggle */}
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="hidden sm:inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              {showComparison ? (
                <>
                  <EyeSlashIcon className="h-4 w-4 mr-1" />
                  Hide Comparison
                </>
              ) : (
                <>
                  <EyeIcon className="h-4 w-4 mr-1" />
                  Show Comparison
                </>
              )}
            </button>
            
            {/* Start Chat */}
            <Link
              to={`/chat?document=${document.id}`}
              className="btn-primary"
            >
              <ChatBubbleBottomCenterTextIcon className="h-4 w-4 mr-1" />
              Ask Questions
            </Link>
          </div>
        </div>
      </div>

      {/* Summary */}
      {document.summary && (
        <div className="mb-6 bg-legal-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-legal-900 mb-2">Document Summary</h3>
          <p className="text-sm text-legal-800">{document.summary}</p>
        </div>
      )}

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Desktop: Side-by-side view */}
        <div className="hidden sm:block">
          {showComparison ? (
            <div className="grid grid-cols-2 gap-0 min-h-96">
              {/* Original Content */}
              <div className="border-r border-gray-200">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center">
                    <DocumentDuplicateIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <h3 className="text-sm font-medium text-gray-900">Original Document</h3>
                  </div>
                </div>
                <div className="p-4 h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-legal leading-relaxed">
                    {document.originalContent}
                  </pre>
                </div>
              </div>
              
              {/* Simplified Content */}
              <div>
                <div className="bg-legal-50 px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center">
                    <EyeIcon className="h-5 w-5 text-legal-600 mr-2" />
                    <h3 className="text-sm font-medium text-legal-900">Simplified Version</h3>
                  </div>
                </div>
                <div className="p-4 h-96 overflow-y-auto">
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {document.simplifiedContent?.split('\n').map((line, index) => (
                      <p key={index} className="mb-2">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="bg-legal-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center">
                  <EyeIcon className="h-5 w-5 text-legal-600 mr-2" />
                  <h3 className="text-sm font-medium text-legal-900">Simplified Version</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-700 leading-relaxed max-w-4xl">
                  {document.simplifiedContent?.split('\n').map((line, index) => (
                    <p key={index} className="mb-3">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile: Single view with toggle */}
        <div className="sm:hidden">
          <div className="bg-legal-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center">
              {activeView === 'simplified' ? (
                <>
                  <EyeIcon className="h-5 w-5 text-legal-600 mr-2" />
                  <h3 className="text-sm font-medium text-legal-900">Simplified Version</h3>
                </>
              ) : (
                <>
                  <DocumentDuplicateIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <h3 className="text-sm font-medium text-gray-900">Original Document</h3>
                </>
              )}
            </div>
          </div>
          <div className="p-4">
            {activeView === 'simplified' ? (
              <div className="text-sm text-gray-700 leading-relaxed">
                {document.simplifiedContent?.split('\n').map((line, index) => (
                  <p key={index} className="mb-2">
                    {line}
                  </p>
                ))}
              </div>
            ) : (
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-legal leading-relaxed">
                {document.originalContent}
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex justify-center">
        <Link
          to={`/chat?document=${document.id}`}
          className="btn-primary"
        >
          <ChatBubbleBottomCenterTextIcon className="h-5 w-5 mr-2" />
          Ask Questions About This Document
        </Link>
      </div>
    </div>
  );
};

export default DocumentViewer; 