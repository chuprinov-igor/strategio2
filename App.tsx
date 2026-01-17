
import React, { useRef, useState } from 'react';
import { 
  LayoutDashboard, 
  Globe, 
  Search, 
  ShieldCheck, 
  Target, 
  ListTodo, 
  Download,
  Menu,
  ChevronRight,
  Plus,
  Trash2,
  X,
  Layers,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { useStore } from './store';
import { SectionId } from './types';

// Visual constants from the "Strategio" style
const COLORS = {
  sidebarBg: '#323b4c',
  sidebarActive: '#3e4759',
  accent: '#3cb8f5',
  fieldBg: '#f8fafc',
  border: '#e2e8f0',
  textDark: '#1a202c',
  textMuted: '#718096',
  sidebarText: '#a0aec0'
};

const FormField = ({ label, value, onChange, placeholder = "", type = "input" }: any) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-[15px] font-semibold text-[#1a202c]">{label}</label>
    {type === "input" ? (
      <input 
        className="w-full h-12 px-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#3cb8f5] transition text-[#4a5568]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    ) : (
      <textarea 
        className="w-full p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#3cb8f5] transition text-[#4a5568] min-h-[100px]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    )}
  </div>
);

const SidebarItem: React.FC<{ icon: any, label: string, id: SectionId, active: boolean }> = ({ icon: Icon, label, id, active }) => {
  const setCurrentSection = useStore(s => s.setCurrentSection);
  return (
    <button 
      onClick={() => setCurrentSection(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 text-sm font-normal ${
        active 
        ? "bg-[#3e4759] text-white border-l-4 border-[#3cb8f5]" 
        : "text-[#a0aec0] hover:text-white hover:bg-[#3e4759]/50"
      }`}
    >
      <Icon size={18} className={active ? "text-white" : "text-[#a0aec0]"} />
      <span>{label}</span>
    </button>
  );
};

// Forms restored from Version 1 logic
const IntroForm = () => {
  const { strategy, updateSection } = useStore();
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-xl font-bold text-slate-800">1. Вводная часть</h2>
      <div className="grid gap-6">
        <FormField 
          label="Миссия компании" 
          value={strategy.intro.mission} 
          onChange={(v: string) => updateSection('intro', { mission: v })} 
          type="textarea"
          placeholder="Зачем существует компания?"
        />
        <FormField 
          label="Видение" 
          value={strategy.intro.vision} 
          onChange={(v: string) => updateSection('intro', { vision: v })} 
          type="textarea"
          placeholder="Кем компания хочет стать через 5-10 лет?"
        />
        <FormField 
          label="Цель по SMART" 
          value={strategy.intro.smartGoal} 
          onChange={(v: string) => updateSection('intro', { smartGoal: v })} 
          type="textarea"
          placeholder="Конкретная, измеримая, достижимая цель..."
        />
      </div>
    </div>
  );
};

const ExternalForm = () => {
  const { strategy, updateSection } = useStore();
  const updatePest = (key: string, val: string) => {
    updateSection('external', { pest: { ...strategy.external.pest, [key]: val } });
  };

  const addCompetitor = () => {
    updateSection('external', { competitors: [...strategy.external.competitors, { name: '', share: '', strength: '', weakness: '' }] });
  };

  const updateCompetitor = (i: number, field: string, val: string) => {
    const newList = [...strategy.external.competitors];
    (newList[i] as any)[field] = val;
    updateSection('external', { competitors: newList });
  };

  const removeCompetitor = (i: number) => {
    updateSection('external', { competitors: strategy.external.competitors.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <h2 className="text-xl font-bold text-slate-800">2. Внешний аудит</h2>
      
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-[#3cb8f5]">PEST-анализ</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <FormField label="Политика (P)" value={strategy.external.pest.political} onChange={(v:string) => updatePest('political', v)} type="textarea" />
          <FormField label="Экономика (E)" value={strategy.external.pest.economic} onChange={(v:string) => updatePest('economic', v)} type="textarea" />
          <FormField label="Социум (S)" value={strategy.external.pest.social} onChange={(v:string) => updatePest('social', v)} type="textarea" />
          <FormField label="Технологии (T)" value={strategy.external.pest.tech} onChange={(v:string) => updatePest('tech', v)} type="textarea" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-[#3cb8f5]">Конкуренты</h3>
          <button onClick={addCompetitor} className="flex items-center gap-1 text-sm text-[#3cb8f5] hover:underline"><Plus size={16}/> Добавить</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-slate-400">
                <th className="pb-3 font-medium">Компания</th>
                <th className="pb-3 font-medium">Доля %</th>
                <th className="pb-3 font-medium">Сильные стороны</th>
                <th className="pb-3 font-medium">Слабые стороны</th>
                <th className="pb-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {strategy.external.competitors.map((c, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-slate-50 transition">
                  <td className="py-3"><input className="w-full bg-transparent outline-none focus:text-[#3cb8f5]" value={c.name} onChange={(e) => updateCompetitor(i, 'name', e.target.value)} /></td>
                  <td className="py-3"><input className="w-full bg-transparent outline-none" value={c.share} onChange={(e) => updateCompetitor(i, 'share', e.target.value)} /></td>
                  <td className="py-3"><input className="w-full bg-transparent outline-none" value={c.strength} onChange={(e) => updateCompetitor(i, 'strength', e.target.value)} /></td>
                  <td className="py-3"><input className="w-full bg-transparent outline-none" value={c.weakness} onChange={(e) => updateCompetitor(i, 'weakness', e.target.value)} /></td>
                  <td className="py-3"><button onClick={() => removeCompetitor(i)} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const InternalForm = () => {
  const { strategy, updateSection } = useStore();
  const update4P = (field: string, val: string) => {
    updateSection('internal', { audit4P: { ...strategy.internal.audit4P, [field]: val } });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <h2 className="text-xl font-bold text-slate-800">3. Внутренний аудит</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <FormField label="Продукт (Product)" value={strategy.internal.audit4P.product} onChange={(v:string) => update4P('product', v)} type="textarea" />
        <FormField label="Цена (Price)" value={strategy.internal.audit4P.price} onChange={(v:string) => update4P('price', v)} type="textarea" />
        <FormField label="Место (Place)" value={strategy.internal.audit4P.place} onChange={(v:string) => update4P('place', v)} type="textarea" />
        <FormField label="Продвижение (Promotion)" value={strategy.internal.audit4P.promotion} onChange={(v:string) => update4P('promotion', v)} type="textarea" />
      </div>
      <FormField label="ABC-анализ и портфель" value={strategy.internal.abcAnalysis} onChange={(v:string) => updateSection('internal', { abcAnalysis: v })} type="textarea" />
    </div>
  );
};

const SwotForm = () => {
  const { strategy, updateSection } = useStore();
  const addItem = (cat: keyof typeof strategy.swot) => updateSection('swot', { [cat]: [...strategy.swot[cat], ''] });
  const updateItem = (cat: keyof typeof strategy.swot, idx: number, val: string) => {
    const newList = [...strategy.swot[cat]];
    newList[idx] = val;
    updateSection('swot', { [cat]: newList });
  };
  const removeItem = (cat: keyof typeof strategy.swot, idx: number) => updateSection('swot', { [cat]: strategy.swot[cat].filter((_, i) => i !== idx) });

  const Quadrant = ({ title, cat, color }: any) => (
    <div className={`p-6 rounded-xl border-2 ${color}`}>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-sm uppercase text-slate-700">{title}</h4>
        <button onClick={() => addItem(cat)} className="text-[#3cb8f5]"><Plus size={18}/></button>
      </div>
      <div className="space-y-2">
        {strategy.swot[cat].map((item, i) => (
          <div key={i} className="flex gap-2">
            <input className="flex-1 bg-transparent border-b border-slate-300 focus:border-[#3cb8f5] outline-none text-sm py-1" value={item} onChange={(e) => updateItem(cat, i, e.target.value)} />
            <button onClick={() => removeItem(cat, i)} className="text-slate-300 hover:text-red-500"><X size={14}/></button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-xl font-bold text-slate-800">4. SWOT-анализ</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Quadrant title="Сильные стороны (S)" cat="strengths" color="bg-green-50 border-green-100" />
        <Quadrant title="Слабые стороны (W)" cat="weaknesses" color="bg-orange-50 border-orange-100" />
        <Quadrant title="Возможности (O)" cat="opportunities" color="bg-blue-50 border-blue-100" />
        <Quadrant title="Угрозы (T)" cat="threats" color="bg-red-50 border-red-100" />
      </div>
    </div>
  );
};

const StrategyForm = () => {
  const { strategy, updateSection } = useStore();
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-xl font-bold text-slate-800">5. Стратегия</h2>
      <div className="grid gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-[15px] font-semibold text-[#1a202c]">Направление по матрице Ансоффа</label>
          <select 
            className="w-full h-12 px-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#3cb8f5] transition text-[#4a5568]"
            value={strategy.strategy.ansoff}
            onChange={(e) => updateSection('strategy', { ansoff: e.target.value })}
          >
            <option>Проникновение на рынок</option>
            <option>Развитие продукта</option>
            <option>Развитие рынка</option>
            <option>Диверсификация</option>
          </select>
        </div>
        <FormField label="Целевая аудитория" value={strategy.strategy.targetAudience} onChange={(v:string) => updateSection('strategy', { targetAudience: v })} type="textarea" />
        <FormField label="Позиционирование / УТП" value={strategy.strategy.positioning} onChange={(v:string) => updateSection('strategy', { positioning: v })} type="textarea" />
      </div>
    </div>
  );
};

const ActionPlanForm = () => {
  const { strategy, updateSection } = useStore();
  const addAction = () => updateSection('actionPlan', [...strategy.actionPlan, { activity: '', deadline: '', owner: '', budget: '' }]);
  const updateAction = (i: number, field: string, val: string) => {
    const newList = [...strategy.actionPlan];
    (newList[i] as any)[field] = val;
    updateSection('actionPlan', newList);
  };
  const removeAction = (i: number) => updateSection('actionPlan', strategy.actionPlan.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">6. План и Бюджет</h2>
        <button onClick={addAction} className="px-4 py-2 bg-[#3cb8f5] text-white rounded-lg text-sm font-bold shadow-sm">Добавить задачу</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-slate-400">
              <th className="pb-3 font-medium">Активность</th>
              <th className="pb-3 font-medium">Срок</th>
              <th className="pb-3 font-medium">Ответственный</th>
              <th className="pb-3 font-medium text-right">Бюджет</th>
              <th className="pb-3 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {strategy.actionPlan.map((a, i) => (
              <tr key={i} className="border-b hover:bg-slate-50 transition">
                <td className="py-4 pr-4"><input className="w-full bg-transparent outline-none focus:text-[#3cb8f5]" value={a.activity} onChange={(e) => updateAction(i, 'activity', e.target.value)} placeholder="Описание..." /></td>
                <td className="py-4 pr-4"><input className="w-full bg-transparent outline-none" value={a.deadline} onChange={(e) => updateAction(i, 'deadline', e.target.value)} /></td>
                <td className="py-4 pr-4"><input className="w-full bg-transparent outline-none" value={a.owner} onChange={(e) => updateAction(i, 'owner', e.target.value)} /></td>
                <td className="py-4 pr-4"><input className="w-full bg-transparent outline-none text-right font-mono" value={a.budget} onChange={(e) => updateAction(i, 'budget', e.target.value)} /></td>
                <td className="py-4"><button onClick={() => removeAction(i)} className="text-red-300 hover:text-red-500"><Trash2 size={16}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function App() {
  const { currentSection, strategy, updateStrategy, getProgress } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const progress = getProgress();

  const handleExportPDF = () => window.print();

  // Menu items from Version 1 structure
  const sections = [
    { id: 'intro' as SectionId, label: 'Вводная часть', icon: LayoutDashboard },
    { id: 'external' as SectionId, label: 'Внешний аудит', icon: Globe },
    { id: 'internal' as SectionId, label: 'Внутренний аудит', icon: Search },
    { id: 'swot' as SectionId, label: 'SWOT-анализ', icon: ShieldCheck },
    { id: 'strategy' as SectionId, label: 'Стратегия', icon: Target },
    { id: 'action_plan' as SectionId, label: 'План и Бюджет', icon: ListTodo },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans selection:bg-blue-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar - "Strategio" style */}
      <aside className={`fixed md:relative inset-y-0 left-0 w-72 bg-[#323b4c] text-white flex flex-col z-50 transition-transform duration-300 no-print ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="h-24 flex items-center px-6 gap-3 border-b border-[#3e4759]">
          <div className="w-10 h-10 bg-[#3cb8f5] rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Layers size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Strategio</h1>
          <button className="md:hidden ml-auto p-2" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 overflow-y-auto">
          {sections.map(s => (
            <SidebarItem 
              key={s.id} 
              id={s.id} 
              label={s.label} 
              icon={s.icon} 
              active={currentSection === s.id} 
            />
          ))}
        </nav>

        <div className="p-6 border-t border-[#3e4759]">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Версия 1.2.0</p>
          <p className="text-[10px] text-slate-500">Digital Strategy Builder</p>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 flex flex-col overflow-hidden h-screen">
        {/* Header - "Strategio" style */}
        <header className="h-24 bg-white border-b border-[#e2e8f0] px-8 flex items-center justify-between no-print flex-shrink-0 z-30 sticky top-0">
          <div className="flex items-center gap-4 flex-1">
            <button className="md:hidden p-2 text-slate-500" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <input 
              className="text-lg font-bold text-[#1a202c] bg-transparent border-b border-transparent hover:border-slate-100 focus:outline-none focus:border-[#3cb8f5] w-full max-w-md transition py-1"
              value={strategy.projectName}
              onChange={(e) => updateStrategy({ projectName: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-10">
            <div className="hidden lg:flex flex-col items-end gap-1.5 min-w-[150px]">
              <span className="text-xs font-bold text-[#718096] uppercase tracking-wide">Завершено на {progress}%</span>
              <div className="w-full h-2.5 bg-[#edf2f7] rounded-full overflow-hidden">
                <div className="h-full bg-[#3cb8f5] transition-all duration-1000 shadow-sm" style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            <button 
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-7 py-3.5 bg-[#3cb8f5] text-white rounded-xl font-bold text-sm hover:bg-[#34b3f1] active:scale-95 transition shadow-lg shadow-blue-500/20"
            >
              <Download size={18} />
              <span>Скачать PDF</span>
            </button>
          </div>
        </header>

        {/* Form Content - Version 1 logic restored */}
        <div className="flex-1 overflow-y-auto p-8 md:p-14 no-print bg-white scroll-smooth">
          <div className="max-w-4xl mx-auto pb-24">
            {currentSection === 'intro' && <IntroForm />}
            {currentSection === 'external' && <ExternalForm />}
            {currentSection === 'internal' && <InternalForm />}
            {currentSection === 'swot' && <SwotForm />}
            {currentSection === 'strategy' && <StrategyForm />}
            {currentSection === 'action_plan' && <ActionPlanForm />}
          </div>
        </div>

        {/* Print Layout */}
        <div className="hidden print:block p-12 bg-white text-slate-900 min-h-screen font-serif">
          <div className="mb-16 pb-8 border-b-2 border-slate-900 flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black uppercase mb-2">Маркетинговая Стратегия</h1>
              <h2 className="text-2xl text-slate-600 italic">{strategy.projectName}</h2>
            </div>
            <div className="text-right text-slate-400 text-xs">
              Дата: {new Date().toLocaleDateString('ru-RU')}
            </div>
          </div>

          <div className="space-y-12">
            <section>
              <h3 className="text-xl font-bold border-b-2 mb-4 pb-2 uppercase tracking-wide">1. Миссия и Цели</h3>
              <p className="mb-4"><strong>Миссия:</strong> {strategy.intro.mission}</p>
              <p className="mb-4"><strong>Видение:</strong> {strategy.intro.vision}</p>
              <p className="p-4 bg-slate-50 border rounded-lg"><strong>SMART Цель:</strong> {strategy.intro.smartGoal}</p>
            </section>

            <section className="page-break-after">
              <h3 className="text-xl font-bold border-b-2 mb-4 pb-2 uppercase tracking-wide">2. Внешний аудит</h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="border p-3 rounded"><strong>P:</strong> {strategy.external.pest.political}</div>
                <div className="border p-3 rounded"><strong>E:</strong> {strategy.external.pest.economic}</div>
                <div className="border p-3 rounded"><strong>S:</strong> {strategy.external.pest.social}</div>
                <div className="border p-3 rounded"><strong>T:</strong> {strategy.external.pest.tech}</div>
              </div>
              <h4 className="font-bold mb-2">Основные конкуренты</h4>
              <table className="w-full text-left border-collapse border">
                <thead><tr className="bg-slate-50"><th className="p-2 border">Компания</th><th className="p-2 border">Доля</th><th className="p-2 border">Сила</th></tr></thead>
                <tbody>{strategy.external.competitors.map((c,i) => <tr key={i}><td className="p-2 border">{c.name}</td><td className="p-2 border">{c.share}</td><td className="p-2 border">{c.strength}</td></tr>)}</tbody>
              </table>
            </section>
            
            <section>
              <h3 className="text-xl font-bold border-b-2 mb-4 pb-2 uppercase tracking-wide">3. SWOT-Анализ</h3>
              <div className="grid grid-cols-2 gap-px bg-slate-200 border border-slate-200">
                <div className="bg-white p-4"><strong>S:</strong> {strategy.swot.strengths.join(', ')}</div>
                <div className="bg-white p-4"><strong>W:</strong> {strategy.swot.weaknesses.join(', ')}</div>
                <div className="bg-white p-4"><strong>O:</strong> {strategy.swot.opportunities.join(', ')}</div>
                <div className="bg-white p-4"><strong>T:</strong> {strategy.swot.threats.join(', ')}</div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
