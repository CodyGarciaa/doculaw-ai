// File size formatting
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Date formatting
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return formatDate(d);
};

// Text processing
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const highlightText = (text: string, searchTerm: string): string => {
  if (!searchTerm) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

export const extractKeywords = (text: string): string[] => {
  const commonWords = new Set([
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it',
    'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this'
  ]);
  
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.has(word))
    .slice(0, 10);
};

// Legal document helpers
export const calculateComplexity = (text: string): 'low' | 'medium' | 'high' => {
  const words = text.split(/\s+/);
  const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLength = words.length / sentences.length;
  
  // Legal complexity indicators
  const legalTerms = [
    'whereas', 'heretofore', 'pursuant', 'notwithstanding', 'aforementioned',
    'covenant', 'indemnify', 'tortious', 'subpoena', 'affidavit'
  ];
  
  const legalTermCount = legalTerms.reduce((count, term) => {
    return count + (text.toLowerCase().includes(term) ? 1 : 0);
  }, 0);
  
  const complexityScore = (avgWordLength * 0.3) + (avgSentenceLength * 0.4) + (legalTermCount * 0.3);
  
  if (complexityScore < 8) return 'low';
  if (complexityScore < 15) return 'medium';
  return 'high';
};

export const getDocumentTypeFromMimeType = (mimeType: string): string => {
  const typeMap: Record<string, string> = {
    'application/pdf': 'PDF Document',
    'application/msword': 'Word Document',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word Document',
    'text/plain': 'Text Document',
    'text/html': 'HTML Document',
    'application/rtf': 'RTF Document',
  };
  
  return typeMap[mimeType] || 'Unknown Document';
};

// Validation helpers
export const isValidFileType = (file: File, acceptedTypes: string[]): boolean => {
  return acceptedTypes.indexOf(file.type) !== -1;
};

export const isValidFileSize = (file: File, maxSizeInMB: number): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};

// Search helpers
export const buildSearchQuery = (
  query: string,
  filters?: {
    documentType?: string[];
    dateRange?: { start: Date; end: Date };
    complexity?: string[];
  }
): any => {
  return {
    query: query.trim(),
    filters,
    limit: 20,
    offset: 0,
  };
};

// Error handling
export const getErrorMessage = (error: any): string => {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.message) return error.message;
  return 'An unexpected error occurred';
};

// CSS class utilities
export const clsx = (...classes: (string | undefined | null | boolean)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Local storage helpers
export const storage = {
  get: (key: string): any => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },
  
  remove: (key: string): void => {
    localStorage.removeItem(key);
  },
  
  clear: (): void => {
    localStorage.clear();
  },
};

// Generate unique IDs
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// User data management for onboarding
export interface UserProfile {
  id: string;
  name: string;
  primaryLanguage: string;
  englishProficiency: 'beginner' | 'intermediate' | 'advanced';
  legalExperience: 'none' | 'some' | 'experienced';
  primaryNeeds: string[];
  readingPreference: 'simple' | 'standard' | 'detailed';
  communicationStyle: 'visual' | 'text' | 'audio';
  onboardingCompleted: boolean;
  dateCompleted: string;
  lastUpdated: string;
}

// Save user profile data to user.json
export const saveUserProfile = async (profileData: Omit<UserProfile, 'id' | 'dateCompleted' | 'lastUpdated'>): Promise<UserProfile> => {
  try {
    const profile: UserProfile = {
      ...profileData,
      id: generateUserId(),
      dateCompleted: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    // Save to localStorage for immediate access
    localStorage.setItem('doculaw_user_profile', JSON.stringify(profile));
    localStorage.setItem('doculaw_onboarding', JSON.stringify(profileData));
    
    // Log the complete user profile structure for LLM integration
    const profileForLLM = {
      profile,
      formattedContext: formatUserContextForLLM(profile),
      savedAt: new Date().toISOString()
    };
    
    console.log('=== USER PROFILE SAVED FOR LLM INTEGRATION ===');
    console.log(JSON.stringify(profileForLLM, null, 2));
    console.log('=== END USER PROFILE DATA ===');
    
    return profile;
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
};

// Retrieve user profile data
export const getUserProfile = (): UserProfile | null => {
  try {
    const stored = localStorage.getItem('doculaw_user_profile');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    return null;
  }
};

// Generate a unique user ID
const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get user preferences formatted for LLM context
export const getUserContextForLLM = (): string => {
  const profile = getUserProfile();
  if (!profile) return '';
  return formatUserContextForLLM(profile);
};

// Helper function to format user profile for LLM context
const formatUserContextForLLM = (profile: UserProfile): string => {
  return `User Profile:
- Name: ${profile.name}
- Primary Language: ${profile.primaryLanguage}
- English Proficiency: ${profile.englishProficiency}
- Legal Experience: ${profile.legalExperience}
- Document Types Needed: ${profile.primaryNeeds.join(', ')}
- Reading Preference: ${profile.readingPreference}
- Communication Style: ${profile.communicationStyle}
- Onboarding Completed: ${profile.dateCompleted}`;
}; 