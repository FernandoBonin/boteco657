import React from "react";
import { motion } from "motion/react";
import { menuItems } from "../data/menu";
import { MenuItem } from "../types";
import { Flame, Clock, Heart, Plus } from "lucide-react";
import Image from "next/image";
import { CardItem } from "./cardItem";

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
                  return <CardItem key={item.id} item={item} onSelectItem={onSelectItem} />;
                })}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Retro Brand Sub-footer mark */}
      <div className="py-12 flex items-center justify-center opacity-30">
        <div className="h-px w-20 bg-[#52392f]"></div>
        <div className="mx-4 font-serif text-primary font-bold tracking-widest text-sm">
          647
        </div>
        <div className="h-px w-20 bg-[#52392f]"></div>
      </div>
    </div>
  );
}
