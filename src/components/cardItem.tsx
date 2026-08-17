"use client";

import { MenuItem } from "@/types";
import { motion } from "motion/react";
import { Flame, Clock, Heart, Plus } from "lucide-react";
import Image from "next/image";

type CardItemProps = {
  item: MenuItem;
  onSelectItem?: (item: MenuItem) => void;
};

const formatPrice = (price: number) => {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const CardItem = ({ item, onSelectItem }: CardItemProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
  } as const;

  const hasOldPrice = item.oldPrice !== undefined && item.oldPrice > 0;
  const isConsultPrice = item.price === 0;

  const handleSelectItem = (item: MenuItem) => {
    if (item?.isNotOpenable) return;
    if (onSelectItem) onSelectItem(item);
  };

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
          className="relative h-52 sm:w-52 sm:h-auto sm:self-stretch overflow-hidden cursor-pointer shrink-0"
          onClick={() => handleSelectItem(item)}
        >
          <Image
            fill
            src={item.image}
            alt={item.name}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
        </div>
      )}

      {/* Content Area */}
      <div className="p-5 grow flex flex-col justify-between">
        {/* Text Details */}
        <div className="cursor-pointer" onClick={() => handleSelectItem(item)}>
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
};
