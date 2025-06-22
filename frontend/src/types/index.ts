// Document types
export interface Document {
  id: string;
  title: string;
  originalContent: string;
  simplifiedContent?: string;
  uploadDate: Date;
  status: 'processing' | 'completed' | 'error';
  fileType: string;
  fileSize: number;
  summary?: string;
  complexity?: 'low' | 'medium' | 'high';
}

// Chat types
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  documentId?: string;
  references?: DocumentReference[];
}

export interface DocumentReference {
  id: string;
  title: string;
  relevantSection: string;
  confidence: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  language: string;
  simplificationLevel: 'basic' | 'intermediate' | 'advanced';
  theme: 'light' | 'dark';
  notifications: boolean;
}

// API types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface DocumentUploadResponse {
  documentId: string;
  status: string;
  estimatedProcessingTime: number;
}

export interface SimplificationRequest {
  documentId: string;
  simplificationLevel: 'basic' | 'intermediate' | 'advanced';
  focusAreas?: string[];
}

export interface SearchQuery {
  query: string;
  filters?: SearchFilters;
  limit?: number;
  offset?: number;
}

export interface SearchFilters {
  documentType?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  complexity?: ('low' | 'medium' | 'high')[];
}

export interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  relevanceScore: number;
  documentType: string;
  lastModified: Date;
}

// Component prop types
export interface UploadAreaProps {
  onFileUpload: (file: File) => void;
  isUploading: boolean;
  acceptedTypes: string[];
}

export interface DocumentViewerProps {
  document: Document;
  showComparison: boolean;
  onToggleComparison: () => void;
}

export interface ChatInterfaceProps {
  session: ChatSession;
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: string;
}

// Navigation types
export type NavigationItem = {
  name: string;
  href: string;
  icon: any;
  current: boolean;
}; 