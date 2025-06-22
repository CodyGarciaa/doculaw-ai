import React, { createContext, useContext } from 'react';

// Placeholder AuthContext for future Supabase integration
// Currently the app uses the mock dataService.ts

interface AuthContextType {
  // Placeholder - not currently used
  placeholder: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = {
    placeholder: true,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Note: When you're ready to use Supabase, replace this file with the full implementation
// that's currently in the SUPABASE_SETUP.md guide 