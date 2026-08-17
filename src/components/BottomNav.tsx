import { Home } from "lucide-react";
import { categories } from "../data/menu";

interface BottomNavProps {
  activeCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
}

export default function BottomNav({
  activeCategoryId,
  onSelectCategory,
}: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-bg-parchment/95 backdrop-blur-lg border-t border-[#e0bfbd]/30 shadow-lg">
      <div className="bottom-nav-scroll overflow-x-auto overflow-y-hidden overscroll-x-contain">
        <div
          className="grid grid-flow-col auto-cols-25 md:auto-cols-27.5 w-max min-w-full h-17.5 px-2 py-1.5
          "
        >
          <button
            id="nav-home"
            onClick={() => onSelectCategory(null)}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-0 transition-all duration-200 cursor-pointer ${
              activeCategoryId === null
                ? "bg-primary text-white rounded-2xl shadow-md"
                : "text-[#594140] hover:text-primary"
            }
            `}
          >
            <Home className="w-5 h-5 shrink-0" />

            <span className="text-[10px] font-bold leading-tight text-center">
              Início
            </span>
          </button>

          {categories.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeCategoryId === item.id;

            return (
              <button
                id={`nav-item-${item.id}`}
                key={item.id}
                onClick={() => onSelectCategory(item.id)}
                className={`flex flex-col items-center justify-center gap-0.5 min-w-0 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary text-white rounded-2xl shadow-md"
                    : "text-[#594140] hover:text-primary"
                }
                `}
              >
                {IconComponent && (
                  <IconComponent className="w-5 h-5 shrink-0" />
                )}

                <span className="text-[10px] font-bold leading-tight text-center px-1 line-clamp-2">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
