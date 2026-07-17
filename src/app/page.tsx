"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import CategoryGrid from '../components/CategoryGrid';
import MenuSection from '../components/MenuSection';
import ItemDetailsModal from '../components/ItemDetailsModal';
import Cart from '../components/Cart';
import { categories } from '../data/menu';
import { MenuItem } from '../types';

export default function App() {
  // Navigation State
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  
  // Detail Modal State
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Find active category details
  const activeCategory = categories.find((cat) => cat.id === activeCategoryId);

  return (
    <div className="min-h-screen pb-32 font-sans relative overflow-x-hidden selection:bg-primary/20">
      {/* Subtle paper grain tactile background overlay */}
      <div className="fixed inset-0 pointer-events-none grain-texture z-0" />

      {/* Main Brand/Category Header */}
      <Header
        onBackHome={() => setActiveCategoryId(null)}
        showBackButton={activeCategoryId !== null}
        categoryName={activeCategory?.name}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Animated main view layout */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-4">
        <AnimatePresence mode="wait">
          {activeCategoryId === null ? (
            <motion.div
              id="view-home"
              key="categories-home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <CategoryGrid onSelectCategory={setActiveCategoryId} />
            </motion.div>
          ) : (
            <motion.div
              id="view-category-menu"
              key={`category-${activeCategoryId}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <MenuSection
                categoryId={activeCategoryId}
                categoryName={activeCategory?.name || 'Cardápio'}
                onSelectItem={setSelectedItem}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Sticky Premium Bottom Bar Navigation */}
      <BottomNav
        activeCategoryId={activeCategoryId}
        onSelectCategory={(id) => {
          setSelectedItem(null); // Close detailed modal if category switched
          setActiveCategoryId(id);
        }}
      />

      {/* Side Slide-over Shopping Cart Drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Item Detailed Information Dialog Modal */}
      <ItemDetailsModal
        isOpen={selectedItem !== null}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
