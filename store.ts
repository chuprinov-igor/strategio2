
import { create } from 'zustand';
import { MarketingStrategy, SectionId } from './types';

interface AppState {
  currentSection: SectionId;
  strategy: MarketingStrategy;
  setCurrentSection: (id: SectionId) => void;
  updateStrategy: (data: Partial<MarketingStrategy>) => void;
  updateSection: (section: keyof MarketingStrategy, data: any) => void;
  getProgress: () => number;
}

const initialStrategy: MarketingStrategy = {
  projectName: "Моя новая маркетинговая стратегия",
  intro: {
    mission: "Дать возможность каждому питаться правильно и вкусно.",
    vision: "Стать брендом №1 в категории полезных снеков к 2025 году.",
    smartGoal: "Увеличить оборот до 500 млн руб. к концу 2024 года."
  },
  external: {
    pest: {
      political: "Стабильное регулирование пищевой отрасли.",
      economic: "Снижение реальных доходов населения на 3%.",
      social: "Рост тренда на ЗОЖ и правильное питание.",
      tech: "Развитие e-commerce и экспресс-доставки."
    },
    marketSize: "4 млрд рублей, рост категории 15% в год.",
    competitors: [
      { name: "Fit&Fruit", share: "12%", strength: "Цена", weakness: "Состав" },
      { name: "R.A.W. Life", share: "8%", strength: "Премиальный имидж", weakness: "Высокая цена" }
    ]
  },
  internal: {
    audit4P: {
      product: "100% натуральный состав, без сахара.",
      price: "Средний плюс, стратегия 'снятия сливок'.",
      place: "Федеральные сети (X5, Магнит), маркетплейсы.",
      promotion: "SMM, работа с блогерами, дегустации."
    },
    abcAnalysis: "Линейка 'Classic' - группа А (75% оборота)."
  },
  swot: {
    strengths: ["Собственное производство", "Уникальная рецептура"],
    weaknesses: ["Низкая узнаваемость в регионах", "Зависимость от импортного сырья"],
    opportunities: ["Выход на рынок СНГ", "Запуск протеиновой линейки"],
    threats: ["Рост цен на логистику", "Демпинг конкурентов"]
  },
  strategy: {
    ansoff: "Развитие продукта",
    positioning: "Полезный перекус для активных горожан.",
    targetAudience: "Женщины и мужчины 25-45 лет, доход средний+, ЗОЖ-ориентированные."
  },
  actionPlan: [
    { activity: "Запуск рекламной кампании в соцсетях", deadline: "Март 2024", owner: "Маркетолог", budget: "500 000 руб." },
    { activity: "Листинг в сеть 'Азбука Вкуса'", deadline: "Май 2024", owner: "КАМ", budget: "200 000 руб." }
  ]
};

export const useStore = create<AppState>((set, get) => ({
  currentSection: 'intro',
  strategy: initialStrategy,
  setCurrentSection: (id) => set({ currentSection: id }),
  updateStrategy: (data) => set((state) => ({ strategy: { ...state.strategy, ...data } })),
  updateSection: (section, data) => set((state) => ({ 
    strategy: { ...state.strategy, [section]: { ...state.strategy[section], ...data } } 
  })),
  getProgress: () => {
    const s = get().strategy;
    let filled = 0;
    let total = 0;
    
    const checkValue = (val: any) => {
      if (typeof val === 'string') {
        total++;
        if (val.trim().length > 0) filled++;
      } else if (Array.isArray(val)) {
        total++;
        if (val.length > 0) filled++;
      } else if (typeof val === 'object' && val !== null) {
        Object.values(val).forEach(checkValue);
      }
    };

    checkValue(s.intro);
    checkValue(s.external);
    checkValue(s.internal);
    checkValue(s.swot);
    checkValue(s.strategy);
    
    return Math.round((filled / Math.max(total, 1)) * 100);
  }
}));
