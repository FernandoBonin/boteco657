import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Rating } from "./rating";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Review {
  rating: number;
  text: {
    text: string;
  };
  authorAttribution: {
    displayName: string;
  };
  publishTime: string;
}

const getAvaliações = async (): Promise<Review[]> => {
  const get = await fetch("/api/reviews");
  const data = await get.json();
  return data.reviews;
};

export default function Cart({ isOpen, onClose }: CartProps) {
  const [tableName, setTableName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [avaliacao, setAvaliacao] = useState<Review[]>(null);

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    // Build the WhatsApp message string
    let message = `*📌 NOVO PEDIDO - BOTECO 647*\n\n`;
    message += `👤 *Cliente:* ${customerName || "Não informado"}\n`;
    message += `📍 *Mesa:* ${tableName || "Não informada"}\n`;
    message += `--------------------------------------\n\n`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodedMessage}`;

    // Open WhatsApp link
    window.open(whatsappUrl, "_blank");

    // Display order success modal or state
    setOrderPlaced(true);
  };

  const resetSuccessState = () => {
    setOrderPlaced(false);
    onClose();
  };

  useEffect(() => {
    const loadReviews = async () => {
      const reviews = await getAvaliações();
      const filterReviews = reviews.filter((rev) => rev.rating >= 4);
      setAvaliacao(filterReviews);
    };

    loadReviews();
  }, []);

  // console.log("AVALIACAO", avaliacao);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            id="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <motion.div
              id="cart-drawer-content"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="w-screen max-w-md bg-bg-parchment shadow-2xl flex flex-col relative"
            >
              {/* Subtle paper background */}
              <div className="absolute inset-0 pointer-events-none grain-texture z-0 opacity-10"></div>

              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-[#e0bfbd]/30 flex items-center justify-between bg-white/70 z-10 relative">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-2xl font-bold text-primary">
                    Avaliações
                  </h3>
                </div>
                <button
                  id="close-cart-btn"
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-cream-medium text-primary flex items-center justify-center hover:bg-cream-high transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/*DRAWER CONTENT */}
              <div className="space-y-3 px-3">
                {avaliacao?.map((ava) => {
                  const [firstName, ...lastNames] =
                    ava.authorAttribution.displayName.split(" ");
                  const hiddenName = lastNames.join(" ");
                  return (
                    <div
                      className="border border-solid border-gray-200 rounded-lg space-y-2 py-3 px-2"
                      key={ava.authorAttribution.displayName}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-lg">
                          {firstName}{" "}
                          <span className="blur-[3px] select-none">
                            {hiddenName}
                          </span>
                        </p>
                      </div>
                      <Rating rating={ava.rating} />
                      <p className="text-base font-medium">
                        Avaliou e disse: {ava.text.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
