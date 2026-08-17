import { Home } from 'lucide-react';
import { categories } from '../data/menu';

interface BottomNavProps {
  activeCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
}

export default function BottomNav({ activeCategoryId, onSelectCategory }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#fef9ed]/95 backdrop-blur-lg border-t border-[#e0bfbd]/30 shadow-lg rounded-t-2xl pb-safe">
      <div className="overflow-x-auto overflow-y-hidden mx-auto px-4 py-2 grid h-16" style={{ gridTemplateColumns: `repeat(${categories.length + 1}, minmax(0, 1fr))` }}>
        {/* Home option */}
        <button
          id="nav-home"
          onClick={() => onSelectCategory(null)}
          className={`flex flex-col items-center justify-center transition-all duration-200 ${
            activeCategoryId === null
              ? 'bg-[#82021a] text-white rounded-full px-3.5 py-1.5 shadow-md scale-105'
              : 'text-[#594140] hover:text-[#82021a]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Início</span>
        </button>

        {categories.map((item) => {
          const IconComponent = item?.icon;
          const isActive = activeCategoryId === item.id;

          return (
            <button
              id={`nav-item-${item.id}`}
              key={item.id}
              onClick={() => onSelectCategory(item.id)}
              className={`flex flex-col items-center justify-center transition-all duration-200 ${
                isActive
                  ? 'bg-[#82021a] text-white rounded-full px-3.5 py-1.5 shadow-md scale-105'
                  : 'text-[#594140] hover:text-[#82021a]'
              }`}
            >
              {item?.icon && <IconComponent className="w-5 h-5" />}
              <span className="text-[10px] font-bold mt-0.5">{item?.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
