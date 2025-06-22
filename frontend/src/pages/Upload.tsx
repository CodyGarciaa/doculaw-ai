import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  CloudArrowUpIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowUpTrayIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

interface FileWithPreview extends File {
  preview?: string;
  status?: 'uploading' | 'completed' | 'error';
  progress?: number;
  id?: string;
}

const Upload: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop: (acceptedFiles) => {
      const filesWithPreview = acceptedFiles.map((file) => ({
        ...file,
        preview: URL.createObjectURL(file),
        status: 'uploading' as const,
        progress: 0,
        id: Math.random().toString(36).substr(2, 9),
      }));
      
      setFiles(prev => [...prev, ...filesWithPreview]);
      
      // Simulate upload process
      filesWithPreview.forEach((file) => {
        simulateUpload(file);
      });
    },
  });

  const simulateUpload = (file: FileWithPreview) => {
    setIsProcessing(true);
    
    const interval = setInterval(() => {
      setFiles(prev => prev.map(f => {
        if (f.id === file.id) {
          const newProgress = Math.min((f.progress || 0) + Math.random() * 20, 100);
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsProcessing(false);
            return { ...f, progress: 100, status: 'completed' as const };
          }
          return { ...f, progress: newProgress };
        }
        return f;
      }));
    }, 500);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const getFileIcon = (file: FileWithPreview) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'txt':
        return '📃';
      default:
        return '📄';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center py-12">
        <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-8">
          <CloudArrowUpIcon className="h-10 w-10 text-white" />
        </div>
        <h1 className="heading-1 gradient-text mb-8">
          Upload Your Legal Document
        </h1>
        <p className="subheading text-gray-600 max-w-3xl mx-auto">
          Upload any legal document and get an instant, easy-to-understand translation 
          tailored to your English proficiency level.
        </p>
      </div>

      {/* Upload Area */}
      <div className="max-w-4xl mx-auto">
        <div
          {...getRootProps()}
          className={`card-3d p-12 text-center cursor-pointer transition-all duration-300 border-2 border-dashed ${
            isDragActive
              ? 'border-legal-500 bg-legal-50 scale-105 shadow-2xl'
              : 'border-gray-300 hover:border-legal-400 hover:bg-gray-50 hover:scale-102'
          }`}
        >
          <input {...getInputProps()} />
          
          {isDragActive ? (
            <div className="space-y-4">
              <ArrowUpTrayIcon className="h-16 w-16 text-legal-500 mx-auto animate-bounce" />
              <p className="text-xl font-medium text-legal-700">Drop your files here!</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto">
                <CloudArrowUpIcon className="h-10 w-10 text-white" />
              </div>
              
              <div>
                <p className="text-xl font-medium text-gray-900 mb-2">
                  Drag and drop your legal documents here
                </p>
                <p className="text-gray-600">or click to browse your files</p>
              </div>
              
              <button className="btn-primary text-lg px-8 py-3">
                Choose Files
              </button>
            </div>
          )}
        </div>

        {/* File Requirements */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-elevated p-6 text-center">
            <div className="text-3xl mb-3">📄</div>
            <h3 className="font-semibold text-gray-900 mb-2">Supported Formats</h3>
            <p className="text-sm text-gray-600">PDF, DOC, DOCX, TXT</p>
          </div>
          
          <div className="card-elevated p-6 text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">File Size Limit</h3>
            <p className="text-sm text-gray-600">Maximum 10MB per file</p>
          </div>
          
          <div className="card-elevated p-6 text-center">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-sm text-gray-600">Your documents are encrypted</p>
          </div>
        </div>
      </div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Uploaded Files ({files.length})
          </h2>
          
          <div className="space-y-4">
            {files.map((file) => (
              <div key={file.id} className="floating-card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{getFileIcon(file)}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{file.name}</h3>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.size)} • {file.type.split('/')[1].toUpperCase()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {file.status === 'uploading' && (
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-legal-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{Math.round(file.progress || 0)}%</span>
                      </div>
                    )}
                    
                    {file.status === 'completed' && (
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircleIcon className="h-5 w-5" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    )}
                    
                    {file.status === 'error' && (
                      <div className="flex items-center space-x-2 text-red-600">
                        <XCircleIcon className="h-5 w-5" />
                        <span className="text-sm font-medium">Error</span>
                      </div>
                    )}
                    
                    <button
                      onClick={() => removeFile(file.id!)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <XCircleIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {files.some(f => f.status === 'completed') && (
            <div className="mt-8 text-center">
              <button className="btn-primary text-lg px-8 py-3">
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                View Simplified Documents
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tips */}
      <div className="max-w-4xl mx-auto">
        <div className="card-elevated p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tips for Best Results
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Upload clear, readable documents for better translation accuracy</li>
                <li>Legal contracts, agreements, and official documents work best</li>
                <li>Our AI will adjust the complexity based on your English proficiency level</li>
                <li>You can ask follow-up questions about any document after uploading</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload; 