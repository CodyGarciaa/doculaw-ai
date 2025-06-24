import { getUserProfile, getUserContextForLLM } from './helpers';

// Example of how to use user data for LLM integration
export class LLMIntegration {
  
  // Get user context for LLM prompts
  static getUserContextForPrompt(): string {
    return getUserContextForLLM();
  }

  // Example: Customize document explanation based on user profile
  static async explainDocument(documentText: string): Promise<string> {
    const userContext = this.getUserContextForPrompt();
    const profile = getUserProfile();
    
    if (!profile) {
      return "Please complete onboarding first to get personalized explanations.";
    }

    // Example prompt structure for LLM
    const prompt = `
${userContext}

Based on the user's profile above, please explain this legal document in a way that matches their:
- English proficiency level (${profile.englishProficiency})
- Legal experience (${profile.legalExperience})
- Reading preference (${profile.readingPreference})
- Communication style (${profile.communicationStyle})

Document to explain:
"""
${documentText}
"""

Please provide an explanation that is:
${this.getExplanationGuidelines(profile)}
`;

    console.log('LLM Prompt with user context:', prompt);
    
    // TODO: Replace with actual LLM API call
    return "Document explanation will be generated here based on user preferences.";
  }

  // Get explanation guidelines based on user profile
  private static getExplanationGuidelines(profile: any): string {
    const guidelines = [];

    // English proficiency adjustments
    if (profile.englishProficiency === 'beginner') {
      guidelines.push('- Use simple, everyday words');
      guidelines.push('- Keep sentences short and clear');
      guidelines.push('- Explain legal terms in plain language');
    } else if (profile.englishProficiency === 'intermediate') {
      guidelines.push('- Use clear, conversational language');
      guidelines.push('- Explain complex legal concepts with examples');
    } else {
      guidelines.push('- Use professional but accessible language');
      guidelines.push('- Provide detailed explanations with context');
    }

    // Legal experience adjustments
    if (profile.legalExperience === 'none') {
      guidelines.push('- Assume no prior legal knowledge');
      guidelines.push('- Explain legal concepts from the basics');
    } else if (profile.legalExperience === 'some') {
      guidelines.push('- Provide moderate detail about legal implications');
      guidelines.push('- Build on basic legal understanding');
    } else {
      guidelines.push('- Focus on specific legal nuances and implications');
    }

    // Reading preference adjustments
    if (profile.readingPreference === 'simple') {
      guidelines.push('- Keep explanations brief and to-the-point');
      guidelines.push('- Use bullet points for key information');
    } else if (profile.readingPreference === 'detailed') {
      guidelines.push('- Provide comprehensive explanations with examples');
      guidelines.push('- Include background context and implications');
    }

    // Communication style adjustments
    if (profile.communicationStyle === 'visual') {
      guidelines.push('- Use analogies and visual descriptions');
      guidelines.push('- Structure information clearly with headers');
    } else if (profile.communicationStyle === 'audio') {
      guidelines.push('- Write in a conversational, spoken style');
      guidelines.push('- Use transitions that work well when read aloud');
    }

    return guidelines.join('\n');
  }

  // Example: Get personalized document summary
  static async getPersonalizedSummary(documentText: string): Promise<string> {
    const profile = getUserProfile();
    if (!profile) return "Please complete onboarding for personalized summaries.";

    const prompt = `
User needs help with: ${profile.primaryNeeds.join(', ')}
Document type focus: Looking for information relevant to their specific needs
Language: Respond in a way suitable for ${profile.primaryLanguage} speakers with ${profile.englishProficiency} English proficiency

Document:
"""
${documentText}
"""

Provide a summary focusing on the aspects most relevant to this user's stated needs.
`;

    console.log('Personalized summary prompt:', prompt);
    
    // TODO: Replace with actual LLM API call
    return "Personalized document summary will be generated here.";
  }

  // Get user data for analytics/improvements
  static getUserAnalytics() {
    const profile = getUserProfile();
    if (!profile) return null;

    return {
      userSegment: this.getUserSegment(profile),
      adaptationLevel: this.getAdaptationLevel(profile),
      primaryFocus: profile.primaryNeeds,
      completedOnboarding: profile.dateCompleted
    };
  }

  private static getUserSegment(profile: any): string {
    if (profile.englishProficiency === 'beginner' && profile.legalExperience === 'none') {
      return 'Beginner - New to English and Legal';
    } else if (profile.legalExperience === 'experienced') {
      return 'Legal Professional';
    } else {
      return 'General User';
    }
  }

  private static getAdaptationLevel(profile: any): string {
    const factors = [
      profile.englishProficiency !== 'advanced' ? 1 : 0,
      profile.legalExperience === 'none' ? 1 : 0,
      profile.readingPreference === 'simple' ? 1 : 0
    ];
    
    const score = factors.reduce((a, b) => a + b, 0);
    
    if (score >= 2) return 'High Adaptation Needed';
    if (score === 1) return 'Moderate Adaptation';
    return 'Minimal Adaptation';
  }
} 