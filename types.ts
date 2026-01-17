
export type SectionId = 
  | 'intro' 
  | 'external' 
  | 'internal' 
  | 'swot' 
  | 'strategy' 
  | 'action_plan';

export interface MarketingStrategy {
  projectName: string;
  intro: {
    mission: string;
    vision: string;
    smartGoal: string;
  };
  external: {
    pest: {
      political: string;
      economic: string;
      social: string;
      tech: string;
    };
    marketSize: string;
    competitors: Array<{ name: string; share: string; strength: string; weakness: string }>;
  };
  internal: {
    audit4P: {
      product: string;
      price: string;
      place: string;
      promotion: string;
    };
    abcAnalysis: string;
  };
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  strategy: {
    ansoff: string;
    positioning: string;
    targetAudience: string;
  };
  actionPlan: Array<{ activity: string; deadline: string; owner: string; budget: string }>;
}
