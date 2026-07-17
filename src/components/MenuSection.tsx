import React from "react";
import { motion } from "motion/react";
import { menuItems } from "../data/menu";
import { MenuItem } from "../types";
import { Flame, Clock, Heart, Plus } from "lucide-react";
import Image from "next/image";

interface MenuSectionProps {
  categoryId: string;
  categoryName: string;
  onSelectItem: (item: MenuItem) => void;
}

export default function MenuSection({
  categoryId,
  categoryName,
  onSelectItem,
}: MenuSectionProps) {
  // Filter items matching selected category
  const items = menuItems.filter((item) => item.categoryId === categoryId);

  const groupedItems = items.reduce(
    (acc, item) => {
      const key = item?.subcategory ?? "default";

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(item);

      return acc;
    },
    {} as Record<string, MenuItem[]>,
  );

  // Stagger items variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
  } as const;

  // Format currency
  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleSelectItem = (item: MenuItem) => {
    if (item?.isNotOpenable) return;
    onSelectItem(item);
  };

  return (
    <div className="py-2">
      {/* Category Header with rustic decorative line */}
      <div className="py-6 flex items-center justify-between">
        <h2 className="font-serif text-3xl font-bold text-dark-charcoal tracking-tight">
          {categoryName}
        </h2>

        {/* Styled Line with Fork/Knife in Center */}
        <div className="h-0.5 grow ml-5 bg-[#e0bfbd]/40 relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-parchment px-3 py-1 flex items-center gap-1">
            <span className="text-sm">🍽️</span>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-cream-medium/30 rounded-2xl border border-dashed border-[#e0bfbd]">
          <p className="text-[#594140] italic">
            Em breve mais delícias nesta categoria!
          </p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {Object.entries(groupedItems).map(([subcategory, items]) => (
            <div key={subcategory}>
              {subcategory !== "default" && (
                <h3 className="text-xl font-bold text-primary mt-8 mb-4">
                  {subcategory}
                </h3>
              )}

              <div className="space-y-6">
                {items.map((item) => {
                  const hasOldPrice =
                    item.oldPrice !== undefined && item.oldPrice > 0;
                  const isConsultPrice = item.price === 0;

                  return (
                    <motion.div
                      id={`menu-item-${item.id}`}
                      key={item.id}
                      variants={cardVariants}
                      whileHover={{ y: -3 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(82,57,47,0.05)] border border-[#e0bfbd]/20 flex flex-col sm:flex-row group transition-all duration-300 relative"
                    >
                      {/* Visual Highlight Badge */}
                      {item.isHighlighted && (
                        <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10 flex items-center gap-1 shadow">
                          <Flame className="w-3 h-3 fill-current text-yellow-400" />
                          <span>Destaque da Casa</span>
                        </div>
                      )}

                      {/* Item Image */}
                      {item.image && (
                        <div
                          className="w-full sm:w-52 h-48 overflow-hidden relative cursor-pointer shrink-0"
                          onClick={() => handleSelectItem(item)}
                        >
                          <Image
                            width={600}
                            height={600}
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                        </div>
                      )}

                      {/* Content Area */}
                      <div className="p-5 grow flex flex-col justify-between">
                        {/* Text Details */}
                        <div
                          className="cursor-pointer"
                          onClick={() => handleSelectItem(item)}
                        >
                          <div className="flex justify-between items-start mb-1.5">
                            <h3 className="font-serif text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                              {item.name}
                            </h3>
                            {item.estimatedTime && (
                              <span className="flex items-center gap-1 whitespace-nowrap text-[11px] font-semibold text-[#594140]/60 bg-cream-medium px-2 py-0.5 rounded">
                                <Clock className="w-3 h-3" />
                                {item.estimatedTime}
                              </span>
                            )}
                          </div>
                          <p className="font-sans text-sm text-[#594140] leading-relaxed line-clamp-3 mb-4">
                            {item.description}
                          </p>
                        </div>

                        {/* Pricing and Action button row */}
                        <div className="flex items-center justify-between border-t border-cream-medium pt-4 mt-auto">
                          <div>
                            {isConsultPrice ? (
                              <span className="font-sans text-sm font-semibold text-secondary italic">
                                Preço sob consulta
                              </span>
                            ) : (
                              <div className="flex items-baseline gap-2">
                                {hasOldPrice && (
                                  <span className="font-sans text-xs text-[#594140]/50 line-through">
                                    {formatPrice(item.oldPrice!)}
                                  </span>
                                )}
                                <span className="font-sans text-lg font-bold text-primary">
                                  {formatPrice(item.price)}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Pedir/Detalhes CTA Action */}
                          {/* {isConsultPrice ? (
                            <button
                              id={`btn-details-${item.id}`}
                              onClick={() => handleSelectItem(item)}
                              className="bg-primary hover:bg-secondary text-white px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 shadow-sm"
                            >
                              Detalhes
                            </button>
                          ) : (
                            <button
                              id={`btn-order-${item.id}`}
                              onClick={() => onAddToCart(item)}
                              className="bg-primary hover:bg-secondary text-white px-5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-sm"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Pedir
                            </button>
                          )} */}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Retro Brand Sub-footer mark */}
      <div className="py-12 flex items-center justify-center opacity-30 mt-8">
        <div className="h-px w-20 bg-[#52392f]"></div>
        <div className="mx-4 font-serif text-primary font-bold tracking-widest text-sm">
          647
        </div>
        <div className="h-px w-20 bg-[#52392f]"></div>
      </div>
    </div>
  );
}
