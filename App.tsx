
import React, { useState, KeyboardEvent } from 'react';
import { 
  LayoutDashboard, Globe, Search, ShieldCheck, Target, ListTodo, 
  Download, Menu, X, Layers, ChevronDown, ChevronRight, Plus, Trash2,
  TrendingUp, Users, ShoppingCart, BarChart3, Settings, PieChart,
  UserCheck, Trophy, Target as TargetIcon, LineChart, ClipboardCheck, Network, AlertCircle
} from 'lucide-react';
import { useStore } from './store';
import { SectionId, PESTFactor } from './types';

const FormField = ({ label, value, onChange, placeholder = "", type = "input", helper = "" }: any) => (
  <div className="flex flex-col gap-1.5 w-full">
    <div className="flex items-center justify-between">
      <label className="text-[13px] font-bold text-[#1a202c] uppercase tracking-tight">{label}</label>
      {helper && <span className="text-[11px] text-[#3cb8f5] italic">{helper}</span>}
    </div>
    {type === "input" ? (
      <input 
        className="w-full h-10 px-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#3cb8f5] transition text-[#4a5568] text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    ) : (
      <textarea 
        className="w-full p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#3cb8f5] transition text-[#4a5568] text-sm min-h-[80px]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    )}
  </div>
);

const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-8 border-b pb-4">
    <h2 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h2>
    {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
  </div>
);

const SidebarItem: React.FC<{ 
  icon: any; label: string; id?: SectionId; active?: boolean; 
  onClick?: () => void; isSubItem?: boolean; hasSubItems?: boolean; expanded?: boolean;
}> = ({ icon: Icon, label, id, active, onClick, isSubItem, hasSubItems, expanded }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 py-2.5 transition-all duration-200 text-[13px] ${
      isSubItem ? 'pl-11 pr-4' : 'px-4'
    } ${active ? "bg-[#3e4759] text-white border-l-4 border-[#3cb8f5]" : "text-[#a0aec0] hover:text-white hover:bg-[#3e4759]/50"}`}
  >
    {!isSubItem && <Icon size={16} className={active ? "text-white" : "text-[#a0aec0]"} />}
    <span className="flex-1 text-left truncate">{label}</span>
    {hasSubItems && (expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
  </button>
);

const PESTTableSection = ({ 
  title, 
  factors, 
  onUpdate, 
  onAdd, 
  onRemove 
}: { 
  title: string, 
  factors: PESTFactor[], 
  onUpdate: (idx: number, data: Partial<PESTFactor>) => void,
  onAdd: () => void,
  onRemove: (idx: number) => void
}) => (
  <div className="mb-6">
    <div className="bg-[#f1f5f9] px-4 py-2 border-x border-t font-bold text-sm flex justify-between items-center">
      <span>{title}</span>
      <button onClick={onAdd} className="text-[#3cb8f5] hover:text-blue-600 flex items-center gap-1">
        <Plus size={14} /> <span className="text-xs uppercase">Добавить фактор</span>
      </button>
    </div>
    <div className="overflow-x-auto border-x">
      <table className="w-full text-xs min-w-[1000px]">
        <thead>
          <tr className="bg-white border-b text-[10px] text-slate-500 uppercase font-bold">
            <th className="p-3 text-left w-1/4">Факторы</th>
            <th className="p-3 text-center w-[120px]">Характер влияния</th>
            <th className="p-3 text-center w-[60px]">Сила</th>
            <th className="p-3 text-center w-[80px]">Вероятность</th>
            <th className="p-3 text-center w-[80px]">Интегр. оценка</th>
            <th className="p-3 text-center w-[120px]">Динамика</th>
            <th className="p-3 text-left">Что изменится в отрасли</th>
            <th className="p-3 text-left">Что изменится в компании</th>
            <th className="p-3 w-8"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {factors.map((f, i) => (
            <tr key={f.id} className="border-b hover:bg-slate-50 transition-colors">
              <td className="p-2">
                <textarea 
                  className="w-full border-none focus:ring-1 focus:ring-blue-200 outline-none resize-none p-1 min-h-[50px] bg-transparent"
                  value={f.factor}
                  onChange={(e) => onUpdate(i, { factor: e.target.value })}
                  placeholder="Введите описание тренда..."
                />
              </td>
              <td className="p-2">
                <select 
                  className="w-full text-center border-none bg-transparent outline-none focus:ring-0"
                  value={f.impactType}
                  onChange={(e) => onUpdate(i, { impactType: e.target.value as any })}
                >
                  <option value="позитивный">Позитивный</option>
                  <option value="негативный">Негативный</option>
                  <option value="нейтральный">Нейтральный</option>
                </select>
              </td>
              <td className="p-2">
                <select 
                  className="w-full text-center border-none bg-transparent outline-none"
                  value={f.strength}
                  onChange={(e) => onUpdate(i, { strength: parseInt(e.target.value) })}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </td>
              <td className="p-2">
                <select 
                  className="w-full text-center border-none bg-transparent outline-none"
                  value={f.probability}
                  onChange={(e) => onUpdate(i, { probability: parseInt(e.target.value) })}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </td>
              <td className="p-2 text-center font-bold text-blue-600">
                {f.strength * f.probability}
              </td>
              <td className="p-2">
                <input 
                  className="w-full border-none bg-transparent outline-none focus:ring-0 text-center"
                  value={f.dynamics}
                  onChange={(e) => onUpdate(i, { dynamics: e.target.value })}
                  placeholder="Усилится/слабнет"
                />
              </td>
              <td className="p-2">
                <textarea 
                  className="w-full border-none focus:ring-1 focus:ring-blue-200 outline-none resize-none p-1 min-h-[50px] bg-transparent"
                  value={f.industryChange}
                  onChange={(e) => onUpdate(i, { industryChange: e.target.value })}
                />
              </td>
              <td className="p-2">
                <textarea 
                  className="w-full border-none focus:ring-1 focus:ring-blue-200 outline-none resize-none p-1 min-h-[50px] bg-transparent"
                  value={f.companyChange}
                  onChange={(e) => onUpdate(i, { companyChange: e.target.value })}
                />
              </td>
              <td className="p-2 text-center">
                <button onClick={() => onRemove(i)} className="text-slate-300 hover:text-red-500">
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SectionRenderer = ({ id }: { id: SectionId }) => {
  const { strategy, updateSection } = useStore();

  switch(id) {
    case 'intro': return (
      <div className="space-y-6 animate-in fade-in">
        <SectionHeader title="1. Введение" subtitle="Описание текущей ситуации, миссии и видения бренда" />
        <FormField label="Общая справка" value={strategy.intro.background} onChange={(v:string)=>updateSection('intro',{background:v})} type="textarea" placeholder="История бренда, текущий статус..." />
        <FormField label="Портфель SKU" value={strategy.intro.skuList} onChange={(v:string)=>updateSection('intro',{skuList:v})} type="textarea" helper="Укажите количество и сегменты" />
        <div className="grid md:grid-cols-2 gap-4">
          <FormField label="Миссия" value={strategy.intro.mission} onChange={(v:string)=>updateSection('intro',{mission:v})} type="textarea" />
          <FormField label="Видение" value={strategy.intro.vision} onChange={(v:string)=>updateSection('intro',{vision:v})} type="textarea" />
        </div>
        <FormField label="Главная цель (SMART)" value={strategy.intro.smartGoal} onChange={(v:string)=>updateSection('intro',{smartGoal:v})} type="textarea" helper="Финансовые и рыночные показатели" />
      </div>
    );
    case 'external_macro': 
      const createNewFactor = (): PESTFactor => ({
        id: Math.random().toString(36).substr(2, 9),
        factor: '', impactType: 'нейтральный', strength: 1, probability: 1, dynamics: '', industryChange: '', companyChange: ''
      });

      const handleUpdatePEST = (cat: keyof typeof strategy.external.macro, idx: number, data: Partial<PESTFactor>) => {
        const newList = [...(strategy.external.macro[cat] as PESTFactor[])];
        newList[idx] = { ...newList[idx], ...data };
        updateSection('external', { macro: { ...strategy.external.macro, [cat]: newList } });
      };

      const handleAddPEST = (cat: keyof typeof strategy.external.macro) => {
        const newList = [...(strategy.external.macro[cat] as PESTFactor[]), createNewFactor()];
        updateSection('external', { macro: { ...strategy.external.macro, [cat]: newList } });
      };

      const handleRemovePEST = (cat: keyof typeof strategy.external.macro, idx: number) => {
        const newList = (strategy.external.macro[cat] as PESTFactor[]).filter((_, i) => i !== idx);
        updateSection('external', { macro: { ...strategy.external.macro, [cat]: newList } });
      };

      return (
        <div className="space-y-6 animate-in fade-in max-w-[1200px] mx-auto">
          <SectionHeader title="Количественный PEST-анализ" subtitle="Оценка влияния макрофакторов на отрасль и компанию по трехбалльной шкале." />
          
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-4 text-xs mb-8">
            <AlertCircle className="text-blue-500 shrink-0" size={20} />
            <div className="space-y-1">
              <p className="font-bold text-blue-900">Методика оценки:</p>
              <ul className="list-disc list-inside text-blue-800">
                <li><strong>Сила влияния:</strong> 1 - слабая (&lt;10%), 2 - средняя (10-49%), 3 - сильная (&gt;50%)</li>
                <li><strong>Вероятность возникновения:</strong> 1 - низкая (слух), 2 - средняя (обсуждение), 3 - высокая (свершившийся факт)</li>
                <li><strong>Интегральная оценка:</strong> Произведение Силы и Вероятности.</li>
              </ul>
            </div>
          </div>

          <PESTTableSection 
            title="Политические" 
            factors={strategy.external.macro.political} 
            onUpdate={(idx, data) => handleUpdatePEST('political', idx, data)}
            onAdd={() => handleAddPEST('political')}
            onRemove={(idx) => handleRemovePEST('political', idx)}
          />
          <PESTTableSection 
            title="Экономические" 
            factors={strategy.external.macro.economic} 
            onUpdate={(idx, data) => handleUpdatePEST('economic', idx, data)}
            onAdd={() => handleAddPEST('economic')}
            onRemove={(idx) => handleRemovePEST('economic', idx)}
          />
          <PESTTableSection 
            title="Социально-культурные" 
            factors={strategy.external.macro.social} 
            onUpdate={(idx, data) => handleUpdatePEST('social', idx, data)}
            onAdd={() => handleAddPEST('social')}
            onRemove={(idx) => handleRemovePEST('social', idx)}
          />
          <PESTTableSection 
            title="Технологические" 
            factors={strategy.external.macro.tech} 
            onUpdate={(idx, data) => handleUpdatePEST('tech', idx, data)}
            onAdd={() => handleAddPEST('tech')}
            onRemove={(idx) => handleRemovePEST('tech', idx)}
          />

          <div className="mt-8">
            <FormField 
              label="Выводы:" 
              value={strategy.external.macro.conclusions} 
              onChange={(v:string)=>updateSection('external', { macro: { ...strategy.external.macro, conclusions: v } })} 
              type="textarea"
              placeholder="На отрасль больше всего влияют... (укажите факторы с наибольшей интегральной оценкой)"
            />
          </div>
        </div>
      );
    case 'external_market': return (
      <div className="space-y-8 animate-in fade-in">
        <SectionHeader title="2.2 Рынок" subtitle="Объем, динамика и сегментация категории" />
        <div className="grid md:grid-cols-1 gap-6">
          <FormField 
            label="Динамика объема рынка (История)" 
            value={strategy.external.market.sizeHistory} 
            onChange={(v:string)=>updateSection('external',{market:{...strategy.external.market, sizeHistory:v}})} 
            type="textarea" 
            placeholder="Например: 2018: 3.5 млрд, 2019: 4.5 млрд, 2020: 4 млрд руб."
            helper="Укажите данные за последние 3-5 лет"
          />
          <FormField 
            label="Прогноз роста и темпы (CAGR)" 
            value={strategy.external.market.growthForecast} 
            onChange={(v:string)=>updateSection('external',{market:{...strategy.external.market, growthForecast:v}})} 
            placeholder="Например: 15% в год в деньгах, 11% в штуках"
          />
          <FormField 
            label="Сегментация категории" 
            value={strategy.external.market.segments} 
            onChange={(v:string)=>updateSection('external',{market:{...strategy.external.market, segments:v}})} 
            type="textarea"
            placeholder="Например: Злаковые (68%), Фруктовые (15%), Протеиновые (23%)"
            helper="Укажите доли основных товарных сегментов"
          />
        </div>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex gap-3">
          <PieChart className="text-[#3cb8f5] shrink-0" size={20} />
          <p className="text-xs text-blue-800 leading-relaxed">
            <strong>Совет ВШБ:</strong> Опишите не только текущий объем, но и драйверы изменений. Почему категория растет или падает? Какие сегменты вытесняют другие (например, рост протеиновых за счет злаковых).
          </p>
        </div>
      </div>
    );
    case 'external_consumers': return (
      <div className="space-y-8 animate-in fade-in">
        <SectionHeader title="2.3 Потребители" subtitle="Каналы B2B и сегменты B2C" />
        
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase text-slate-400 flex items-center gap-2">
            <ShoppingCart size={16}/> Каналы продаж (B2B Потребители)
          </h3>
          <FormField 
            label="Емкость и приоритетность каналов" 
            value={strategy.external.consumers.b2bChannels} 
            onChange={(v:string)=>updateSection('external',{consumers:{...strategy.external.consumers, b2bChannels:v}})} 
            type="textarea"
            placeholder="Национальные сети, HoReCa, E-commerce, Специализированные сети..."
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase text-slate-400 flex items-center gap-2">
            <Users size={16}/> Сегментация конечных потребителей (B2C)
          </h3>
          <FormField 
            label="Описание сегментов (Ultra, Sport, Food, Lite)" 
            value={strategy.external.consumers.b2cSegments} 
            onChange={(v:string)=>updateSection('external',{consumers:{...strategy.external.consumers, b2cSegments:v}})} 
            type="textarea"
            placeholder="Ultra: ограничения по медицине... Sport: 2-3 тренировки в неделю..."
            helper="Опишите мотивацию и барьеры каждого сегмента"
          />
        </div>

        <div className="p-6 bg-[#f8fafc] border rounded-xl space-y-4">
          <h3 className="text-sm font-bold uppercase text-[#3cb8f5] flex items-center gap-2">
            <UserCheck size={18}/> Портрет целевой аудитории (Ядро)
          </h3>
          <FormField 
            label="Детальный профайл персоны" 
            value={strategy.external.consumers.targetPortrait} 
            onChange={(v:string)=>updateSection('external',{consumers:{...strategy.external.consumers, targetPortrait:v}})} 
            type="textarea"
            placeholder="Женщина, 37 лет, замужем, 2 детей, доход 49к, курит/не курит, авто, чек..."
          />
        </div>
      </div>
    );
    case 'external_competition': return (
      <div className="space-y-8 animate-in fade-in">
        <SectionHeader title="2.4 Конкуренция" subtitle="Стратегии и доли рынка конкурентов" />
        
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-4 text-left font-bold">Бренд</th>
                <th className="p-4 text-left font-bold">Доля в категории %</th>
                <th className="p-4 text-left font-bold">Сильные стороны</th>
                <th className="p-4 text-left font-bold">Слабые стороны</th>
                <th className="p-4 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {strategy.external.competition.map((c, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-slate-50">
                  <td className="p-4"><input className="w-full bg-transparent outline-none font-medium" value={c.name} onChange={(e)=>{
                    const nl = [...strategy.external.competition]; nl[i].name = e.target.value; updateSection('external',{competition:nl});
                  }} /></td>
                  <td className="p-4"><input className="w-full bg-transparent outline-none" value={c.share} onChange={(e)=>{
                    const nl = [...strategy.external.competition]; nl[i].share = e.target.value; updateSection('external',{competition:nl});
                  }} /></td>
                  <td className="p-4"><input className="w-full bg-transparent outline-none text-xs" value={c.strength} onChange={(e)=>{
                    const nl = [...strategy.external.competition]; nl[i].strength = e.target.value; updateSection('external',{competition:nl});
                  }} /></td>
                  <td className="p-4"><input className="w-full bg-transparent outline-none text-xs" value={c.weakness} onChange={(e)=>{
                    const nl = [...strategy.external.competition]; nl[i].weakness = e.target.value; updateSection('external',{competition:nl});
                  }} /></td>
                  <td className="p-4"><button onClick={()=>{
                    updateSection('external',{competition:strategy.external.competition.filter((_,idx)=>idx!==i)});
                  }} className="text-red-300 hover:text-red-500"><Trash2 size={16}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={()=>{
            updateSection('external',{competition:[...strategy.external.competition, {name:'', share:'', strength:'', weakness:''}]});
          }} className="w-full py-3 text-[#3cb8f5] hover:bg-blue-50 transition font-bold flex items-center justify-center gap-2 border-t">
            <Plus size={16}/> Добавить конкурента
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 bg-orange-50 rounded-xl border border-orange-100 space-y-3">
            <div className="flex items-center gap-2 text-orange-700 font-bold">
              <Trophy size={18}/>
              <h3 className="text-sm uppercase tracking-tight">Тип стратегии (Траут)</h3>
            </div>
            <select 
              className="w-full h-10 px-3 bg-white border border-orange-200 rounded-lg text-sm outline-none focus:border-orange-400"
              value={strategy.strategy.compGoals.split('|')[0] || ""}
              onChange={(e) => updateSection('strategy', { compGoals: e.target.value + '|' + (strategy.strategy.compGoals.split('|')[1] || "") })}
            >
              <option value="">Выберите стратегию...</option>
              <option value="Оборонительная">Оборонительная (Лидер)</option>
              <option value="Наступательная">Наступательная (Преследователь)</option>
              <option value="Фланговая">Фланговая (Середняк)</option>
              <option value="Партизанская">Партизанская (Нишевой игрок)</option>
            </select>
            <p className="text-[11px] text-orange-600 italic">Например: Лидер выбирает оборону, обновляя рецептуры и блокируя копирование.</p>
          </div>

          <div className="p-5 bg-green-50 rounded-xl border border-green-100 space-y-3">
            <div className="flex items-center gap-2 text-green-700 font-bold">
              <TargetIcon size={18}/>
              <h3 className="text-sm uppercase tracking-tight">Цели в отношении конкурентов</h3>
            </div>
            <textarea 
              className="w-full p-3 bg-white border border-green-200 rounded-lg text-sm outline-none focus:border-green-400 min-h-[80px]"
              value={strategy.strategy.compGoals.split('|')[1] || ""}
              onChange={(e) => updateSection('strategy', { compGoals: (strategy.strategy.compGoals.split('|')[0] || "") + '|' + e.target.value })}
              placeholder="Напр: Листинг в те же сети, демпинг, запуск аналогов..."
            />
          </div>
        </div>
      </div>
    );
    case 'external_distribution': return (
      <div className="space-y-6 animate-in fade-in">
        <SectionHeader title="2.5 Дистрибуция" subtitle="Схема распределения и региональный охват" />
        <FormField 
          label="Структура каналов продаж (Доли %)" 
          value={strategy.external.distribution.structure} 
          onChange={(v:string)=>updateSection('external',{distribution:{...strategy.external.distribution, structure:v}})} 
          type="textarea"
          helper="Напр: Дискаунтеры 54%, Гипермаркеты 23%..."
        />
        <FormField 
          label="Региональный анализ и охват" 
          value={strategy.external.distribution.regionAnalysis} 
          onChange={(v:string)=>updateSection('external',{distribution:{...strategy.external.distribution, regionAnalysis:v}})} 
          type="textarea"
          placeholder="Центральный округ (22%), Москва (18%), Поволжье (15%)..."
        />
      </div>
    );
    case 'internal_results': return (
      <div className="space-y-8 animate-in fade-in">
        <SectionHeader title="3.1 Операционные результаты" subtitle="Динамика продаж и рыночной доли" />
        <div className="grid md:grid-cols-1 gap-6">
          <FormField 
            label="Объем продаж в динамике (3 года)" 
            value={strategy.internal.results.volumeHistory} 
            onChange={(v:string)=>updateSection('internal',{results:{...strategy.internal.results, volumeHistory:v}})} 
            type="textarea" 
            placeholder="Напр: 2018: 350 млн, 2019: 410 млн, 2020: 380 млн..."
            helper="Обязательно укажите в рублях или штуках"
          />
          <FormField 
            label="Доля рынка в динамике" 
            value={strategy.internal.results.marketShareHistory} 
            onChange={(v:string)=>updateSection('internal',{results:{...strategy.internal.results, marketShareHistory:v}})} 
            placeholder="Напр: 4% -> 5% -> 4.5%"
          />
          <FormField 
            label="Причины изменений (Интерпретация)" 
            value={strategy.internal.results.reasons} 
            onChange={(v:string)=>updateSection('internal',{results:{...strategy.internal.results, reasons:v}})} 
            type="textarea"
            placeholder="Пандемия, закрытие HoReCa, запуск новых линеек..."
          />
        </div>
        <div className="p-4 bg-slate-50 rounded-lg border flex gap-3">
          <LineChart className="text-slate-400 shrink-0" size={20} />
          <p className="text-xs text-slate-500 italic">
            <strong>Подсказка:</strong> Сравните темпы роста компании с темпами роста рынка. Если рынок растет на 15%, а вы на 5% — вы теряете долю.
          </p>
        </div>
      </div>
    );
    case 'internal_strategic': return (
      <div className="space-y-8 animate-in fade-in">
        <SectionHeader title="3.2 Анализ стратегических вопросов" subtitle="Текущие цели, сегментация и позиционирование" />
        
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase text-slate-400">Текущие маркетинговые цели (KPI)</h3>
          <div className="bg-white border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="p-3 text-left font-bold">Показатель (KPI)</th>
                  <th className="p-3 text-left font-bold">План (Target)</th>
                  <th className="p-3 text-left font-bold">Факт (Actual)</th>
                  <th className="p-3 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {strategy.internal.strategicIssues.currentKpis.map((k, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="p-3"><input className="w-full bg-transparent" value={k.kpi} onChange={(e)=>{
                      const nl = [...strategy.internal.strategicIssues.currentKpis]; nl[i].kpi = e.target.value; updateSection('internal',{strategicIssues:{...strategy.internal.strategicIssues, currentKpis:nl}});
                    }} /></td>
                    <td className="p-3"><input className="w-full bg-transparent" value={k.target} onChange={(e)=>{
                      const nl = [...strategy.internal.strategicIssues.currentKpis]; nl[i].target = e.target.value; updateSection('internal',{strategicIssues:{...strategy.internal.strategicIssues, currentKpis:nl}});
                    }} /></td>
                    <td className="p-3"><input className="w-full bg-transparent" value={k.fact} onChange={(e)=>{
                      const nl = [...strategy.internal.strategicIssues.currentKpis]; nl[i].fact = e.target.value; updateSection('internal',{strategicIssues:{...strategy.internal.strategicIssues, currentKpis:nl}});
                    }} /></td>
                    <td className="p-3 text-center">
                      <button onClick={()=>{
                        const nl = strategy.internal.strategicIssues.currentKpis.filter((_, idx) => idx !== i);
                        updateSection('internal',{strategicIssues:{...strategy.internal.strategicIssues, currentKpis:nl}});
                      }}><Trash2 size={14} className="text-slate-300 hover:text-red-500"/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={()=>{
              const nl = [...strategy.internal.strategicIssues.currentKpis, { kpi: '', target: '', fact: '' }];
              updateSection('internal',{strategicIssues:{...strategy.internal.strategicIssues, currentKpis:nl}});
            }} className="w-full py-2 text-xs font-bold text-[#3cb8f5] border-t">+ Добавить KPI</button>
          </div>
        </div>

        <FormField 
          label="Как мы сегментируем рынок СЕЙЧАС?" 
          value={strategy.internal.strategicIssues.currentSegmentation} 
          onChange={(v:string)=>updateSection('internal',{strategicIssues:{...strategy.internal.strategicIssues, currentSegmentation:v}})} 
          type="textarea"
          helper="Текущий подход к классификации клиентов"
        />
        
        <FormField 
          label="Текущее позиционирование" 
          value={strategy.internal.strategicIssues.currentPositioning} 
          onChange={(v:string)=>updateSection('internal',{strategicIssues:{...strategy.internal.strategicIssues, currentPositioning:v}})} 
          type="textarea"
          placeholder="Как нас воспринимает рынок на данный момент?"
        />

        <FormField 
          label="Точки дифференциации" 
          value={strategy.internal.strategicIssues.differentiationPoints} 
          onChange={(v:string)=>updateSection('internal',{strategicIssues:{...strategy.internal.strategicIssues, differentiationPoints:v}})} 
          type="textarea"
          placeholder="Почему мы лучше конкурентов? (Технологии, патенты, дизайн...)"
        />
      </div>
    );
    case 'internal_portfolio': return (
      <div className="space-y-6 animate-in fade-in">
        <SectionHeader title="3.3 Анализ портфеля" subtitle="ABC-анализ и маржинальность линеек" />
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-4 text-left font-bold">Линейка</th>
                <th className="p-4 text-left font-bold">Оборот</th>
                <th className="p-4 text-left font-bold">Маржа %</th>
                <th className="p-4 text-left font-bold">ABC-категория</th>
              </tr>
            </thead>
            <tbody>
              {strategy.internal.portfolio.map((p, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-slate-50">
                  <td className="p-4"><input className="w-full bg-transparent" value={p.line} onChange={(e)=>{
                    const nl = [...strategy.internal.portfolio]; nl[i].line = e.target.value; updateSection('internal',{portfolio:nl});
                  }} /></td>
                  <td className="p-4"><input className="w-full bg-transparent" value={p.revenue} onChange={(e)=>{
                    const nl = [...strategy.internal.portfolio]; nl[i].revenue = e.target.value; updateSection('internal',{portfolio:nl});
                  }} /></td>
                  <td className="p-4"><input className="w-full bg-transparent" value={p.margin} onChange={(e)=>{
                    const nl = [...strategy.internal.portfolio]; nl[i].margin = e.target.value; updateSection('internal',{portfolio:nl});
                  }} /></td>
                  <td className="p-4">
                    <select className="bg-transparent" value={p.abc} onChange={(e)=>{
                      const nl = [...strategy.internal.portfolio]; nl[i].abc = e.target.value; updateSection('internal',{portfolio:nl});
                    }}>
                      <option>A</option><option>B</option><option>C</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
    case 'internal_systems': return (
      <div className="space-y-8 animate-in fade-in">
        <SectionHeader title="3.5 Маркетинговые структуры и системы" subtitle="Организация отдела и инструменты контроля" />
        
        <div className="grid md:grid-cols-1 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase text-slate-400 flex items-center gap-2">
              <Network size={16}/> Организационная структура
            </h3>
            <FormField 
              label="Описание отдела маркетинга" 
              value={strategy.internal.systems.structure} 
              onChange={(v:string)=>updateSection('internal',{systems:{...strategy.internal.systems, structure:v}})} 
              type="textarea"
              placeholder="Кол-во сотрудников, роли, кому подчиняются..."
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase text-slate-400 flex items-center gap-2">
              <Settings size={16}/> IT-Системы и инструменты
            </h3>
            <FormField 
              label="CRM, ERP и системы аналитики" 
              value={strategy.internal.systems.software} 
              onChange={(v:string)=>updateSection('internal',{systems:{...strategy.internal.systems, software:v}})} 
              placeholder="Bitrix24, AmoCRM, 1C, Google Analytics..."
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase text-slate-400 flex items-center gap-2">
              <ClipboardCheck size={16}/> Процесс планирования и контроля
            </h3>
            <FormField 
              label="Как осуществляется мониторинг?" 
              value={strategy.internal.systems.planningProcess} 
              onChange={(v:string)=>updateSection('internal',{systems:{...strategy.internal.systems, planningProcess:v}})} 
              type="textarea"
              placeholder="Еженедельные планерки, месячные отчеты, ежегодный бюджет..."
            />
          </div>
        </div>
      </div>
    );
    case 'strategy_direction': return (
      <div className="space-y-6 animate-in fade-in">
        <SectionHeader title="4.1 Стратегическое направление" subtitle="Матрица Ансоффа" />
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 grid grid-cols-3 gap-px bg-slate-200 border rounded-xl overflow-hidden">
            <div className="bg-slate-50 p-4 font-bold text-center">Рынок \ Продукт</div>
            <div className="bg-slate-50 p-4 font-bold text-center">Существующий</div>
            <div className="bg-slate-50 p-4 font-bold text-center">Новый</div>
            
            <div className="bg-slate-50 p-4 font-bold flex items-center justify-center">Существующий</div>
            <div className="bg-white p-4">
              <textarea className="w-full text-xs outline-none min-h-[60px]" value={strategy.strategy.ansoff.existingP_existingM} onChange={(e)=>updateSection('strategy',{ansoff:{...strategy.strategy.ansoff, existingP_existingM:e.target.value}})} placeholder="Углубление рынка..."/>
            </div>
            <div className="bg-white p-4">
              <textarea className="w-full text-xs outline-none min-h-[60px]" value={strategy.strategy.ansoff.newP_existingM} onChange={(e)=>updateSection('strategy',{ansoff:{...strategy.strategy.ansoff, newP_existingM:e.target.value}})} placeholder="Развитие продукта..."/>
            </div>

            <div className="bg-slate-50 p-4 font-bold flex items-center justify-center">Новый</div>
            <div className="bg-white p-4">
              <textarea className="w-full text-xs outline-none min-h-[60px]" value={strategy.strategy.ansoff.existingP_newM} onChange={(e)=>updateSection('strategy',{ansoff:{...strategy.strategy.ansoff, existingP_newM:e.target.value}})} placeholder="Развитие рынка..."/>
            </div>
            <div className="bg-white p-4">
              <textarea className="w-full text-xs outline-none min-h-[60px]" value={strategy.strategy.ansoff.newP_newM} onChange={(e)=>updateSection('strategy',{ansoff:{...strategy.strategy.ansoff, newP_newM:e.target.value}})} placeholder="Диверсификация..."/>
            </div>
          </div>
        </div>
      </div>
    );
    case 'swot': return <SWOTForm strategy={strategy} updateSection={updateSection} />;
    default: return (
      <div className="py-20 text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
          <Settings size={32}/>
        </div>
        <p className="text-slate-400 font-medium italic">Данный подраздел находится в процессе наполнения по шаблону ВШБ</p>
      </div>
    );
  }
};

const SWOTTagInput = ({ 
  items, 
  onAdd, 
  onRemove, 
  placeholder, 
  title, 
  bgClass, 
  borderClass, 
  textClass, 
  tagBgClass 
}: { 
  items: string[], 
  onAdd: (val: string) => void, 
  onRemove: (idx: number) => void, 
  placeholder: string, 
  title: string,
  bgClass: string,
  borderClass: string,
  textClass: string,
  tagBgClass: string
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className={`p-6 rounded-xl border-2 ${bgClass} ${borderClass} min-h-[160px] flex flex-col gap-4 shadow-sm transition-all`}>
      <h4 className={`text-lg font-bold ${textClass}`}>{title}</h4>
      
      <div className="relative">
        <input 
          type="text"
          className="w-full h-11 px-4 bg-white/60 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 transition text-sm text-slate-600"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${tagBgClass} border border-slate-100 shadow-sm animate-in zoom-in-95 duration-200`}>
            <span className="text-sm font-medium text-slate-700">{item}</span>
            <button 
              onClick={() => onRemove(i)}
              className="text-slate-400 hover:text-slate-600 transition"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const SWOTForm = ({ strategy, updateSection }: any) => {
  const handleAdd = (cat: keyof typeof strategy.swot, val: string) => {
    updateSection('swot', { [cat]: [...strategy.swot[cat], val] });
  };

  const handleRemove = (cat: keyof typeof strategy.swot, idx: number) => {
    updateSection('swot', { [cat]: strategy.swot[cat].filter((_: any, i: number) => i !== idx) });
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      <SectionHeader title="SWOT-анализ" subtitle="Оцените сильные и слабые стороны, возможности и угрозы." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SWOTTagInput 
          title="Сильные стороны (Strengths)"
          items={strategy.swot.strengths}
          onAdd={(v) => handleAdd('strengths', v)}
          onRemove={(i) => handleRemove('strengths', i)}
          placeholder="Введите и нажмите Enter..."
          bgClass="bg-[#e9f7f0]" // Light green
          borderClass="border-[#d1ebd9]"
          textClass="text-[#2d6a4f]"
          tagBgClass="bg-white"
        />
        
        <SWOTTagInput 
          title="Слабые стороны (Weaknesses)"
          items={strategy.swot.weaknesses}
          onAdd={(v) => handleAdd('weaknesses', v)}
          onRemove={(i) => handleRemove('weaknesses', i)}
          placeholder="Введите и нажмите Enter..."
          bgClass="bg-[#fff1f1]" // Light red
          borderClass="border-[#fecaca]"
          textClass="text-[#991b1b]"
          tagBgClass="bg-white"
        />

        <SWOTTagInput 
          title="Возможности (Opportunities)"
          items={strategy.swot.opportunities}
          onAdd={(v) => handleAdd('opportunities', v)}
          onRemove={(i) => handleRemove('opportunities', i)}
          placeholder="Введите и нажмите Enter..."
          bgClass="bg-[#ebf5ff]" // Light blue
          borderClass="border-[#bfdbfe]"
          textClass="text-[#1e40af]"
          tagBgClass="bg-white"
        />

        <SWOTTagInput 
          title="Угрозы (Threats)"
          items={strategy.swot.threats}
          onAdd={(v) => handleAdd('threats', v)}
          onRemove={(i) => handleRemove('threats', i)}
          placeholder="Введите и нажмите Enter..."
          bgClass="bg-[#fffbeb]" // Light yellow
          borderClass="border-[#fef3c7]"
          textClass="text-[#92400e]"
          tagBgClass="bg-white"
        />
      </div>

      <div className="mt-8">
        <FormField 
          label="Стратегический приоритет" 
          value={strategy.swot.priority} 
          onChange={(v:string)=>updateSection('swot',{priority:v})} 
          type="textarea" 
          placeholder="На основании SWOT анализа выберите ключевое направление развития..."
          helper="Определите центральную проблему или преимущество"
        />
      </div>
    </div>
  );
};

export default function App() {
  const { currentSection, strategy, updateStrategy, getProgress, setCurrentSection } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ ext: true, int: true, strat: true });
  const progress = getProgress();

  const toggle = (k: string) => setExpanded(p => ({ ...p, [k]: !p[k] }));

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans overflow-hidden h-screen">
      <aside className={`fixed md:relative inset-y-0 left-0 w-72 bg-[#323b4c] text-white flex flex-col z-50 transition-transform duration-300 no-print ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="h-24 flex items-center px-6 gap-3 border-b border-[#3e4759]">
          <div className="w-10 h-10 bg-[#3cb8f5] rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20"><Layers size={22}/></div>
          <h1 className="text-2xl font-bold tracking-tight">Strategio</h1>
          <button className="md:hidden ml-auto p-2" onClick={()=>setSidebarOpen(false)}><X/></button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto custom-scrollbar">
          <SidebarItem icon={LayoutDashboard} label="1. Введение" id="intro" active={currentSection==='intro'} onClick={()=>setCurrentSection('intro')} />
          
          <SidebarItem icon={Globe} label="2. Внешний аудит" hasSubItems expanded={expanded.ext} onClick={()=>toggle('ext')} />
          {expanded.ext && (
            <div className="animate-in slide-in-from-top-2">
              <SidebarItem label="Макросреда" id="external_macro" isSubItem active={currentSection==='external_macro'} onClick={()=>setCurrentSection('external_macro')} />
              <SidebarItem label="Рынок" id="external_market" isSubItem active={currentSection==='external_market'} onClick={()=>setCurrentSection('external_market')} />
              <SidebarItem label="Потребители" id="external_consumers" isSubItem active={currentSection==='external_consumers'} onClick={()=>setCurrentSection('external_consumers')} />
              <SidebarItem label="Конкуренция" id="external_competition" isSubItem active={currentSection==='external_competition'} onClick={()=>setCurrentSection('external_competition')} />
              <SidebarItem label="Дистрибуция" id="external_distribution" isSubItem active={currentSection==='external_distribution'} onClick={()=>setCurrentSection('external_distribution')} />
            </div>
          )}

          <SidebarItem icon={Search} label="3. Внутренний аудит" hasSubItems expanded={expanded.int} onClick={()=>toggle('int')} />
          {expanded.int && (
            <div className="animate-in slide-in-from-top-2">
              <SidebarItem label="Операционные результаты" id="internal_results" isSubItem active={currentSection==='internal_results'} onClick={()=>setCurrentSection('internal_results')} />
              <SidebarItem label="Стратегические вопросы" id="internal_strategic" isSubItem active={currentSection==='internal_strategic'} onClick={()=>setCurrentSection('internal_strategic')} />
              <SidebarItem label="Анализ портфеля" id="internal_portfolio" isSubItem active={currentSection==='internal_portfolio'} onClick={()=>setCurrentSection('internal_portfolio')} />
              <SidebarItem label="Маркетинг. системы" id="internal_systems" isSubItem active={currentSection==='internal_systems'} onClick={()=>setCurrentSection('internal_systems')} />
            </div>
          )}

          <SidebarItem icon={ShieldCheck} label="4. SWOT-анализ" id="swot" active={currentSection==='swot'} onClick={()=>setCurrentSection('swot')} />

          <SidebarItem icon={Target} label="5. Стратегия и цели" hasSubItems expanded={expanded.strat} onClick={()=>toggle('strat')} />
          {expanded.strat && (
            <div className="animate-in slide-in-from-top-2">
              <SidebarItem label="Стратег. направление" id="strategy_direction" isSubItem active={currentSection==='strategy_direction'} onClick={()=>setCurrentSection('strategy_direction')} />
              <SidebarItem label="Операционные цели" id="strategy_goals" isSubItem active={currentSection==='strategy_goals'} onClick={()=>setCurrentSection('strategy_goals')} />
              <SidebarItem label="Позиционирование" id="strategy_positioning" isSubItem active={currentSection==='strategy_positioning'} onClick={()=>setCurrentSection('strategy_positioning')} />
            </div>
          )}

          <SidebarItem icon={ListTodo} label="6. Маркетинг. комплекс" id="marketing_mix" active={currentSection==='marketing_mix'} onClick={()=>setCurrentSection('marketing_mix')} />
          <SidebarItem icon={Plus} label="7. План и бюджет" id="action_plan" active={currentSection==='action_plan'} onClick={()=>setCurrentSection('action_plan')} />
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        <header className="h-24 bg-white border-b px-8 flex items-center justify-between no-print z-30 flex-shrink-0">
          <div className="flex-1 flex items-center gap-4">
            <button className="md:hidden p-2 text-slate-500" onClick={()=>setSidebarOpen(true)}><Menu/></button>
            <input 
              className="text-lg font-bold text-slate-800 bg-transparent border-b border-transparent hover:border-slate-100 focus:outline-none focus:border-[#3cb8f5] w-full max-lg transition py-1 outline-none"
              value={strategy.projectName}
              onChange={(e)=>updateStrategy({projectName:e.target.value})}
            />
          </div>

          <div className="flex items-center gap-10">
            <div className="hidden lg:flex flex-col items-end gap-1.5 min-w-[140px]">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Прогресс: {progress}%</span>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#3cb8f5] transition-all duration-700 shadow-sm shadow-blue-500/10" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
            <button className="flex items-center gap-2 px-7 py-3.5 bg-[#3cb8f5] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 active:scale-95 transition" onClick={()=>window.print()}>
              <Download size={18} />
              <span>PDF Отчет</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 md:p-14 no-print scroll-smooth">
          <div className="max-w-4xl mx-auto pb-20">
            <SectionRenderer id={currentSection} />
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3e4759; border-radius: 10px; }
        @media print { .no-print { display: none !important; } }
      `}</style>
    </div>
  );
}
