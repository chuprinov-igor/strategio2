
import { create } from 'zustand';
import { MarketingStrategy, SectionId, PESTFactor } from './types';

interface AppState {
  currentSection: SectionId;
  strategy: MarketingStrategy;
  setCurrentSection: (id: SectionId) => void;
  updateStrategy: (data: Partial<MarketingStrategy>) => void;
  updateSection: (section: keyof MarketingStrategy, data: any) => void;
  getProgress: () => number;
}

const createFactor = (): PESTFactor => ({
  id: Math.random().toString(36).substr(2, 9),
  factor: '',
  impactType: 'нейтральный',
  strength: 1,
  probability: 1,
  dynamics: '',
  industryChange: '',
  companyChange: ''
});

const initialStrategy: MarketingStrategy = {
  projectName: "Маркетинговый план для бренда батончиков XXX",
  intro: {
    background: "В данной работе представлен план для категории орехово-фруктовых батончиков...",
    skuList: "11 SKU для высокого сегмента, 6 SKU с пробиотиками...",
    mission: "Дать возможность каждому питаться правильно и вкусно.",
    vision: "К 2025 году стать брендом №1 в категории нешоколадных батончиков.",
    smartGoal: "Достичь оборота XXX млн рублей в 2024 году."
  },
  external: {
    macro: { 
      political: [createFactor()],
      economic: [createFactor()],
      social: [createFactor()],
      tech: [createFactor()],
      conclusions: ""
    },
    market: { sizeHistory: "4 млрд рублей в 2020 году", growthForecast: "15% в год", segments: "Зерновые, фруктовые, протеиновые" },
    consumers: { b2bChannels: "NKA, HoReCa, E-commerce", b2cSegments: "Ultra, Sport, Food, Lite", targetPortrait: "Женщина, 37 лет, доход 44к+" },
    competition: [
      { name: "XXX", share: "X%", strength: "Лидерство", weakness: "Цена" }
    ],
    distribution: { structure: "54% Дискаунтеры, 23% Гипермаркеты", regionAnalysis: "Москва - самое сильное падение" }
  },
  internal: {
    results: { volumeHistory: "2018: 350 млн, 2019: 410 млн, 2020: 380 млн", reasons: "Пандемия, падение HoReCa", marketShareHistory: "2018: 4%, 2019: 5%, 2020: 4.5%" },
    strategicIssues: {
      currentKpis: [
        { kpi: "Объем продаж", target: "450 млн", fact: "380 млн" },
        { kpi: "Доля рынка", target: "6%", fact: "4.5%" }
      ],
      currentSegmentation: "Сегментация по поведению: Ultra, Sport, Food, Lite",
      currentPositioning: "100% натуральные снеки для миллениалов",
      differentiationPoints: "Собственное производство, сертификат ISO22000, эко-упаковка"
    },
    portfolio: [
      { line: "Линейка 1", revenue: "X руб", margin: "X%", abc: "A" }
    ],
    systems: {
      structure: "Отдел маркетинга (3 чел), подчинение Ген. директору",
      // Fixed duplicate software property error
      software: "1-С-Битрикс, переход на AMOCRM",
      planningProcess: "Ежемесячный контроль план/факт, квартальный пересмотр"
    }
  },
  swot: {
    strengths: [], weaknesses: [], opportunities: [], threats: [],
    priority: "Звание капитана категории ЗОЖ"
  },
  strategy: {
    ansoff: { existingP_existingM: "Сокращение линейки", newP_existingM: "Запуск протеиновых", existingP_newM: "Листинг в ТОП-10", newP_newM: "Новая линия" },
    goals: "", targetMarkets: "", positioning: "", compGoals: ""
  },
  marketingMix: { product: "", price: "", place: "", promotion: "" },
  actionPlan: []
};

export const useStore = create<AppState>((set, get) => ({
  currentSection: 'intro',
  strategy: initialStrategy,
  setCurrentSection: (id) => set({ currentSection: id }),
  updateStrategy: (data) => set((state) => ({ strategy: { ...state.strategy, ...data } })),
  updateSection: (section, data) => set((state) => ({ 
    strategy: { ...state.strategy, [section]: { ...(state.strategy[section] as any), ...data } } 
  })),
  getProgress: () => {
    const s = get().strategy;
    let filled = 0, total = 0;
    const check = (val: any) => {
      if (typeof val === 'string' || typeof val === 'number') { total++; if (val.toString().trim()) filled++; }
      else if (Array.isArray(val)) { 
        if (val.length === 0) total++;
        else val.forEach(check); 
      }
      else if (typeof val === 'object' && val !== null) Object.values(val).forEach(check);
    };
    check(s);
    return Math.round((filled / Math.max(total, 1)) * 100);
  }
}));
