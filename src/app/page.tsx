"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import CategoryGrid from "../components/CategoryGrid";
import Cart from "../components/Cart";

export default function Home() {
  const router = useRouter();

  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans relative overflow-x-hidden selection:bg-primary/20">
      <div className="fixed inset-0 pointer-events-none grain-texture z-0" />

      <Header
        onBackHome={() => router.back()}
        showBackButton={false}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-4">
        <CategoryGrid
          onSelectCategory={(categoryId) => {
            router.push(`/category/${categoryId}`);
          }}
        />
      </main>

      <BottomNav
        activeCategoryId={null}
        onSelectCategory={(categoryId) => {
          router.push(`/category/${categoryId}`);
        }}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}