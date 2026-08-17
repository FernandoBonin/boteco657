"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import CategoryGrid from "../components/CategoryGrid";
import Cart from "../components/Cart";
import { ModalPromotions } from "@/components/modalPromotions";

//promotion images
import boloMorango from "@/assets/lib/images/newImg/boloMorango.jpg";
import xCostela from "@/assets/lib/images/newImg/xCostela.jpeg";

export default function Home() {
  const router = useRouter();

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
    {
      id: "smash-11",
      categoryId: "smash",
      name: "X- costela 647",
      description:
        "Pão australiano, hambúrguer 180g, molho barbecue e queijo prato. Acompanha batata rústica. Turbine seu lanche até 3 adicionais a sua escolha: Picles | Farofa de Bacon | Dijon | Rúcula | Alface crespa | Tomate | Cebola caramelizada | Queijo mussarela | Queijo prato",
      price: 64.9,
      oldPrice: null,
      image: xCostela,
      isAvailable: true,
      estimatedTime: null,
      isHighlighted: false,
    },
  ];

  return (
    <div className="min-h-screen font-sans relative overflow-x-hidden selection:bg-primary/20">
      <div className="fixed inset-0 pointer-events-none grain-texture z-0" />

      <ModalPromotions title={"Novidades do boteco 647"} items={promotions} />

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

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
