
export type SectionId = 
  | 'intro'
  | 'external_macro' | 'external_market' | 'external_consumers' | 'external_competition' | 'external_distribution'
  | 'internal_results' | 'internal_strategic' | 'internal_portfolio' | 'internal_systems'
  | 'swot'
  | 'strategy_direction' | 'strategy_goals' | 'strategy_target' | 'strategy_positioning' | 'strategy_comp_goals'
  | 'marketing_mix'
  | 'action_plan';

export interface PESTFactor {
  id: string;
  factor: string;
  impactType: 'позитивный' | 'негативный' | 'нейтральный';
  strength: number; // 1-3
  probability: number; // 1-3
  dynamics: string;
  industryChange: string;
  companyChange: string;
}

export interface MarketingStrategy {
  projectName: string;
  intro: {
    background: string;
    skuList: string;
    mission: string;
    vision: string;
    smartGoal: string;
  };
  external: {
    macro: { 
      political: PESTFactor[];
      economic: PESTFactor[];
      social: PESTFactor[];
      tech: PESTFactor[];
      conclusions: string;
    };
    market: { sizeHistory: string; growthForecast: string; segments: string };
    consumers: { b2bChannels: string; b2cSegments: string; targetPortrait: string };
    competition: Array<{ name: string; share: string; strength: string; weakness: string }>;
    distribution: { structure: string; regionAnalysis: string };
  };
  internal: {
    results: { volumeHistory: string; reasons: string; marketShareHistory: string };
    strategicIssues: { 
      currentKpis: Array<{ kpi: string; target: string; fact: string }>;
      currentSegmentation: string;
      currentPositioning: string;
      differentiationPoints: string;
    };
    portfolio: Array<{ line: string; revenue: string; margin: string; abc: string }>;
    systems: {
      structure: string;
      software: string; // CRM, ERP
      planningProcess: string;
    };
  };
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
    priority: string;
  };
  strategy: {
    ansoff: { existingP_existingM: string; newP_existingM: string; existingP_newM: string; newP_newM: string };
    goals: string;
    targetMarkets: string;
    positioning: string;
    compGoals: string;
  };
  marketingMix: {
    product: string;
    price: string;
    place: string;
    promotion: string;
  };
  actionPlan: Array<{ activity: string; deadline: string; owner: string; budget: string }>;
}
