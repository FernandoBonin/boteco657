import React from "react";
import { motion } from "motion/react";
import { categories } from "../data/menu";
import { Category } from "../types";

interface CategoryGridProps {
  onSelectCategory: (id: string) => void;
}

const getOrderedCategories = () => {
  const now = new Date();

  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
  }).format(now);

  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      hour12: false,
    }).format(now),
  );

  const isSaturdayBefore18 = weekday === "Sat" && hour < 18;

  if (!isSaturdayBefore18) {
    return categories;
  }

  const feijoada = categories.find((category) => category.id === "feijoada");

  if (!feijoada) {
    return categories;
  }

  return [
    feijoada,
    ...categories.filter((category) => category.id !== "feijoada"),
  ];
};

export default function CategoryGrid({ onSelectCategory }: CategoryGridProps) {
  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  } as const;

  const orderedCategories = getOrderedCategories();

  return (
    <section className="py-2">
      <div className="flex justify-between items-end mb-6">
        <h3 className="font-serif text-2xl font-bold text-[#1d1c15] tracking-tight">
          Escolha uma categoria
        </h3>
      </div>

      {/* Bento-style Category Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {orderedCategories.map((category, index) => {
          // Make 'bbq' span 2 columns on larger screens to mimic the reference image
          const gridSpan = index === 0 ? "sm:col-span-2" : "";

          return (
            <motion.div
              id={`category-${category.id}`}
              key={category.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectCategory(category.id)}
              className={`${gridSpan} group relative overflow-hidden rounded-2xl h-48 shadow-[0_4px_20px_rgba(82,57,47,0.08)] border border-[#e0bfbd]/20 hover:border-[#82021a]/30 hover:shadow-xl transition-all duration-300 cursor-pointer`}
            >
              {/* Background Food Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-108"
                style={{ backgroundImage: `url('${category.image?.src}')` }}
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Category details bottom-left */}
              <div className="absolute bottom-0 left-0 p-5 z-10 w-full">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#7b5800] bg-[#fef9ed] px-2 py-0.5 rounded-full mb-1 inline-block">
                  {category.description
                    ? category.description
                    : "Especialidade"}
                </span>
                <h4 className="font-serif text-2xl font-bold text-white tracking-wide">
                  {category.name}
                </h4>
              </div>

              {/* Decorative hover sparkle border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#7b5800]/40 rounded-2xl transition-all pointer-events-none" />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
