"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "motion/react";

import Header from "../../../components/Header";
import BottomNav from "../../../components/BottomNav";
import MenuSection from "../../../components/MenuSection";
import ItemDetailsModal from "../../../components/ItemDetailsModal";
import Cart from "../../../components/Cart";

import { categories } from "../../../data/menu";
import { MenuItem } from "../../../types";

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const slug = params.slug;

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const category = categories.find((cat) => cat.id === slug);

  if (!category) {
    return <div className="p-10">Categoria não encontrada.</div>;
  }

  return (
    <div className="min-h-screen pb-16 font-sans relative overflow-x-hidden selection:bg-primary/20">
      <div className="fixed inset-0 pointer-events-none grain-texture z-0" />

      <Header
        onBackHome={() => router.back()}
        showBackButton
        categoryName={category.name}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <MenuSection
            categoryId={slug}
            categoryName={category.name}
            onSelectItem={setSelectedItem}
          />
        </motion.div>
      </main>

      <BottomNav
        activeCategoryId={slug}
        onSelectCategory={(categoryId) => {
          setSelectedItem(null);
          if (!categoryId) {
            router.push(`/`)
            return
          }

          router.push(`/category/${categoryId}`);
        }}
      />

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <ItemDetailsModal
        isOpen={selectedItem !== null}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
