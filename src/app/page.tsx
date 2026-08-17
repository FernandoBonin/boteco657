"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import CategoryGrid from "../components/CategoryGrid";
import Cart from "../components/Cart";
import { ModalPromotions } from "@/components/modalPromotions";

//promotion images
import boloMorango from "@/assets/lib/images/newImg/boloMorango.jpg";

export const STORAGE_KEY = "boteco647-promotions-seen";
const TWELVE_HOURS = 12 * 60 * 60 * 1000;

export default function Home() {
  const router = useRouter();
  const [isPromotionsOpen, setIsPromotionsOpen] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const promotions = [
    {
      id: "sobremesas-1",
      categoryId: "sobremesas",
      name: "Bolo Morango dos Sonhos",
      description: "Bolo de morango com duas bolas de sorvete",
      price: 59.9,
      oldPrice: null,
      image: boloMorango,
      isAvailable: true,
      estimatedTime: null,
      isHighlighted: false,
    },
  ];

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    // Nunca viu
    if (!stored) {
      setIsPromotionsOpen(true);
      return;
    }

    const expiresAt = Number(stored);

    // Já passaram 12 horas
    if (Date.now() >= expiresAt) {
      localStorage.removeItem(STORAGE_KEY);
      setIsPromotionsOpen(true);
    }
  }, []);

  const handleClosePromotions = () => {
    const alreadySeen = localStorage.getItem(STORAGE_KEY);

    // Só cria o período de 12h quando ainda não existir
    if (!alreadySeen) {
      const expiresAt = Date.now() + TWELVE_HOURS;

      localStorage.setItem(STORAGE_KEY, expiresAt.toString());
    }

    setIsPromotionsOpen(false);
  };

  return (
    <div className="min-h-screen font-sans relative overflow-x-hidden selection:bg-primary/20">
      <div className="fixed inset-0 pointer-events-none grain-texture z-0" />

      <ModalPromotions
        title={"Novidades do boteco 647"}
        items={promotions}
        open={isPromotionsOpen}
        onClose={handleClosePromotions}
      />

      <Header
        onBackHome={() => router.back()}
        showBackButton={false}
        onOpenCart={() => setIsCartOpen(true)}
        isHome={true}
        setIsPromotionsOpen={setIsPromotionsOpen}
      />

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-4 mb-24">
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

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
