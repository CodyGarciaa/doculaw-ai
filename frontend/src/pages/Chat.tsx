import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  PaperAirplaneIcon,
  DocumentTextIcon,
  UserIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { ChatMessage, ChatSession } from '../types';
import { formatDate } from '../utils/helpers';

// Mock chat data
const mockMessages: ChatMessage[] = [
  {
    id: '1',
    content: 'Hello! I can help you understand legal documents and answer questions about legal concepts. What would you like to know?',
    sender: 'ai',
    timestamp: new Date('2024-01-15T10:00:00'),
  },
];

const Chat: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [searchParams] = useSearchParams();
  const documentId = searchParams.get('document');
  
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<ChatSession | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize chat session
    if (documentId && !sessionId) {
      // Add a welcome message specific to the document
      const documentWelcome: ChatMessage = {
        id: Date.now().toString(),
        content: `I see you've uploaded a document! I can help explain any part of it, answer questions about the legal terms, or discuss related legal concepts. What would you like to know?`,
        sender: 'ai',
        timestamp: new Date(),
        documentId,
      };
      setMessages(prev => [...prev, documentWelcome]);
    }
  }, [documentId, sessionId]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      documentId: documentId || undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateMockResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date(),
        documentId: documentId || undefined,
        references: documentId ? [
          {
            id: documentId,
            title: 'Employment Contract - Tech Company',
            relevantSection: 'Section 4: Confidentiality',
            confidence: 0.85,
          }
        ] : undefined,
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateMockResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('confidentiality') || lowerQuestion.includes('secret')) {
      return `Great question about confidentiality! In legal terms, confidentiality clauses protect a company's private information. Here's what it typically means:

**Key Points:**
• You cannot share the company's private business information with others
• This includes trade secrets, client lists, financial data, and business strategies  
• The obligation usually continues even after you leave the company
• Breaking confidentiality can result in legal action against you

**In Simple Terms:**
Think of it like keeping a friend's secret - but with legal consequences if you tell. The company trusts you with sensitive information to do your job, and you promise not to share it with competitors or the public.

Would you like me to explain any specific part of the confidentiality clause in more detail?`;
    }
    
    if (lowerQuestion.includes('terminate') || lowerQuestion.includes('fired')) {
      return `I can help explain termination clauses in employment contracts. These sections outline:

**How Employment Can End:**
• At-will termination (either party can end the relationship)
• Termination for cause (misconduct, poor performance)
• Termination without cause (layoffs, restructuring)
• Resignation (you choose to leave)

**What You Should Know:**
• Notice periods required by either party
• Severance pay (if any)
• Benefits continuation
• Non-compete restrictions after leaving

The specific terms depend on your contract and local laws. Would you like me to look at the termination section of your document for more specific guidance?`;
    }
    
    return `I understand you're asking about "${question}". Let me help break this down in simple terms:

This is a common legal concept that can seem confusing at first. In employment law, this typically relates to the rights and obligations between employers and employees.

**Here's what you should know:**
• Legal documents often use complex language to be precise
• Each term has specific legal meaning and implications
• Understanding these terms helps protect your rights

Would you like me to explain any specific legal terms or sections from your document? I can also suggest related legal concepts that might be helpful to understand.`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Legal AI Assistant</h1>
        <p className="mt-2 text-gray-600">
          Ask questions about legal documents and get clear, helpful explanations
        </p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col" style={{ minHeight: '500px' }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-3xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-legal-100' 
                    : 'bg-blue-100'
                }`}>
                  {message.sender === 'user' ? (
                    <UserIcon className="h-5 w-5 text-legal-600" />
                  ) : (
                    <SparklesIcon className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                
                <div className={`flex-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-legal-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </div>
                  </div>
                  
                  {/* References */}
                  {message.references && (
                    <div className="mt-2 space-y-2">
                      {message.references.map((ref, index) => (
                        <div key={index} className="bg-legal-50 rounded-lg p-3 border border-legal-200">
                          <div className="flex items-center">
                            <DocumentTextIcon className="h-4 w-4 text-legal-600 mr-2" />
                            <span className="text-sm font-medium text-legal-900">{ref.title}</span>
                          </div>
                          <p className="text-xs text-legal-700 mt-1">{ref.relevantSection}</p>
                          <div className="text-xs text-legal-600 mt-1">
                            {Math.round(ref.confidence * 100)}% relevance
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Timestamp */}
                  <div className={`text-xs text-gray-500 mt-1 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {formatDate(message.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-3xl">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-100">
                  <SparklesIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question about legal terms, document clauses, or legal concepts..."
                className="w-full resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-legal-500 focus:border-legal-500"
                rows={2}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-legal-600 text-white hover:bg-legal-700 focus:outline-none focus:ring-2 focus:ring-legal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
          
          {/* Suggestions */}
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {[
                "What does this confidentiality clause mean?",
                "Can I be fired without notice?",
                "What are my rights as an employee?",
                "Explain the termination section",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInputMessage(suggestion)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                  disabled={isLoading}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat; 