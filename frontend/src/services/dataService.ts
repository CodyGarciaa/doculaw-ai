// Data service for handling user documents and chat messages
// This will be connected to Supabase once the package is installed

export interface UserProfile {
  id: string;
  email: string;
  fullName: string | null;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  language: string;
  simplificationLevel: 'basic' | 'intermediate' | 'advanced';
  theme: 'light' | 'dark';
  notifications: boolean;
}

export interface DocumentData {
  id: string;
  userId: string;
  title: string;
  originalTitle?: string;
  originalContent: string;
  simplifiedContent?: string;
  fileType: string;
  fileSize: number;
  pageCount?: number;
  summary?: string;
  complexity?: 'low' | 'medium' | 'high';
  simplificationLevel?: number;
  tags?: string[];
  status: 'processing' | 'completed' | 'error';
  type?: string; // Document type (e.g., 'contract', 'lease', 'insurance')
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessageData {
  id: string;
  documentId: string;
  userId: string;
  content: string;
  sender: 'user' | 'ai';
  references?: DocumentReference[];
  createdAt: Date;
}

export interface DocumentReference {
  id: string;
  title: string;
  relevantSection: string;
  confidence: number;
}

// Mock data store (will be replaced with Supabase)
let mockUsers: UserProfile[] = [];
let mockDocuments: DocumentData[] = [];
let mockChatMessages: ChatMessageData[] = [];
let currentUserId: string | null = null;

// Initialize with some mock data
const initializeMockData = () => {
  const defaultPreferences: UserPreferences = {
    language: 'en',
    simplificationLevel: 'intermediate',
    theme: 'light',
    notifications: true,
  };

  const mockUser: UserProfile = {
    id: 'mock-user-1',
    email: 'demo@doculaw.ai',
    fullName: 'Demo User',
    preferences: defaultPreferences,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  };

  mockUsers.push(mockUser);
  currentUserId = mockUser.id;

  const mockDocument: DocumentData = {
    id: '1',
    userId: mockUser.id,
    title: 'Employment Contract - Tech Company',
    originalTitle: 'Employment Agreement between TechCorp Inc. and John Doe',
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
Employee acknowledges that Employee may have access to certain confidential and proprietary information of Company. Employee agrees to maintain the confidentiality of such information and not to disclose it to any third party.

5. TERMINATION
This Agreement may be terminated by either party upon thirty (30) days written notice to the other party. Upon termination, Employee shall return all Company property and cease all activities on behalf of the Company.`,
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

Leaving Your Job (Section 5):
• Either you or the company can end your job
• You both need to give 30 days notice before ending it
• When you leave, you must return anything that belongs to the company
• You must stop doing work for the company

IMPORTANT: This is a simplified explanation. The original legal document contains more details and specific legal terms that may be important for your situation.`,
    fileType: 'application/pdf',
    fileSize: 2048000,
    pageCount: 12,
    summary: 'Employment agreement with standard terms and benefits',
    complexity: 'medium',
    simplificationLevel: 85,
    tags: ['employment', 'contract', 'confidentiality'],
    status: 'completed',
    type: 'contract',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  };

  mockDocuments.push(mockDocument);
};

// Initialize mock data
initializeMockData();

// Auth functions
export const authService = {
  getCurrentUser: (): UserProfile | null => {
    return currentUserId ? mockUsers.find(u => u.id === currentUserId) || null : null;
  },

  signIn: async (email: string, password: string): Promise<{ user: UserProfile | null; error: string | null }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'demo123') {
      currentUserId = user.id;
      return { user, error: null };
    }
    
    return { user: null, error: 'Invalid credentials' };
  },

  signUp: async (email: string, password: string, fullName?: string): Promise<{ user: UserProfile | null; error: string | null }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return { user: null, error: 'User already exists' };
    }

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      email,
      fullName: fullName || null,
      preferences: {
        language: 'en',
        simplificationLevel: 'intermediate',
        theme: 'light',
        notifications: true,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockUsers.push(newUser);
    currentUserId = newUser.id;
    return { user: newUser, error: null };
  },

  signOut: async (): Promise<{ error: string | null }> => {
    currentUserId = null;
    return { error: null };
  },

  updateProfile: async (updates: Partial<UserProfile>): Promise<{ error: string | null }> => {
    if (!currentUserId) {
      return { error: 'Not authenticated' };
    }

    const userIndex = mockUsers.findIndex(u => u.id === currentUserId);
    if (userIndex === -1) {
      return { error: 'User not found' };
    }

    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...updates,
      updatedAt: new Date(),
    };

    return { error: null };
  },
};

// Document functions
export const documentService = {
  getUserDocuments: async (): Promise<{ documents: DocumentData[]; error: string | null }> => {
    if (!currentUserId) {
      return { documents: [], error: 'Not authenticated' };
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userDocs = mockDocuments.filter(d => d.userId === currentUserId);
    return { documents: userDocs, error: null };
  },

  getDocument: async (id: string): Promise<{ document: DocumentData | null; error: string | null }> => {
    if (!currentUserId) {
      return { document: null, error: 'Not authenticated' };
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const document = mockDocuments.find(d => d.id === id && d.userId === currentUserId);
    return { document: document || null, error: document ? null : 'Document not found' };
  },

  createDocument: async (documentData: Omit<DocumentData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<{ document: DocumentData | null; error: string | null }> => {
    if (!currentUserId) {
      return { document: null, error: 'Not authenticated' };
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newDocument: DocumentData = {
      ...documentData,
      id: `doc-${Date.now()}`,
      userId: currentUserId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockDocuments.push(newDocument);
    return { document: newDocument, error: null };
  },

  deleteDocument: async (id: string): Promise<{ error: string | null }> => {
    if (!currentUserId) {
      return { error: 'Not authenticated' };
    }

    const docIndex = mockDocuments.findIndex(d => d.id === id && d.userId === currentUserId);
    if (docIndex === -1) {
      return { error: 'Document not found' };
    }

    mockDocuments.splice(docIndex, 1);
    return { error: null };
  },
};

// Chat functions
export const chatService = {
  getDocumentMessages: async (documentId: string): Promise<{ messages: ChatMessageData[]; error: string | null }> => {
    if (!currentUserId) {
      return { messages: [], error: 'Not authenticated' };
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const messages = mockChatMessages.filter(m => m.documentId === documentId && m.userId === currentUserId);
    return { messages, error: null };
  },

  sendMessage: async (documentId: string, content: string): Promise<{ message: ChatMessageData | null; error: string | null }> => {
    if (!currentUserId) {
      return { message: null, error: 'Not authenticated' };
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userMessage: ChatMessageData = {
      id: `msg-${Date.now()}`,
      documentId,
      userId: currentUserId,
      content,
      sender: 'user',
      createdAt: new Date(),
    };

    mockChatMessages.push(userMessage);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessageData = {
        id: `msg-${Date.now() + 1}`,
        documentId,
        userId: currentUserId!,
        content: generateMockAIResponse(content),
        sender: 'ai',
        references: [
          {
            id: documentId,
            title: 'Document Section',
            relevantSection: 'Section 4: Confidentiality',
            confidence: 0.85,
          }
        ],
        createdAt: new Date(),
      };
      mockChatMessages.push(aiMessage);
    }, 1000);

    return { message: userMessage, error: null };
  },
};

const generateMockAIResponse = (question: string): string => {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('confidentiality') || lowerQuestion.includes('secret')) {
    return `Great question about confidentiality! In legal terms, this means:

**Key Points:**
• You cannot share the company's private business information
• This includes trade secrets, client lists, financial data
• The obligation continues even after you leave
• Breaking confidentiality can result in legal action

**In Simple Terms:**
Think of it like keeping a friend's secret - but with legal consequences.`;
  }
  
  if (lowerQuestion.includes('terminate') || lowerQuestion.includes('fired')) {
    return `Regarding termination clauses:

**How Employment Can End:**
• Either party can end the relationship with proper notice
• Usually requires 30 days written notice
• Different rules apply for misconduct
• You must return company property when leaving

**Protection for You:**
This means they can't just fire you without notice (except for serious misconduct).`;
  }
  
  return `I can help explain that! Based on your question about "${question}", here's what you should know:

This relates to standard legal terms that protect both parties. Each section has specific implications for your rights and obligations.

Would you like me to explain any particular part in more detail?`;
}; 