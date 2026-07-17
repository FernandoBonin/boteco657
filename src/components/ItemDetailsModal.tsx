import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MenuItem } from "../types";
import { X, Plus, Minus, Clock, Flame, AlertCircle } from "lucide-react";
import Image from "next/image";

interface ItemDetailsModalProps {
  isOpen: boolean;
  item: MenuItem | null;
  onClose: () => void;
}

export default function ItemDetailsModal({
  isOpen,
  item,
  onClose,
}: ItemDetailsModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  // Reset inputs when modal opens with a new item
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setNotes("");
    }
  }, [isOpen, item]);

  if (!item) return null;

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const isConsultPrice = item.price === 0;
  const totalPrice = item.price * quantity;

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleAdd = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            id="modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="bg-bg-parchment w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#e0bfbd]/30 relative z-10 flex flex-col max-h-[90vh]"
          >
            {/* Subtle paper grain background */}
            <div className="absolute inset-0 pointer-events-none grain-texture z-0 opacity-10"></div>

            {/* Header Image with close button */}
            <div className="relative h-64 w-full bg-slate-200">
              <Image
                width={600}
                height={600}
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/30" />

              <button
                id="close-modal-btn"
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/70 active:scale-90 transition-all"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badges on image */}
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {item.isHighlighted && (
                  <span className="bg-primary text-white text-[10px] whitespace-nowrap font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow">
                    <Flame className="w-3 h-3 fill-current text-yellow-400" />
                    Destaque
                  </span>
                )}
                {item.estimatedTime && (
                  <span className="bg-black/60 text-white text-[10px] whitespace-nowrap font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.estimatedTime}
                  </span>
                )}
              </div>
            </div>

            {/* Content Scrollable */}
            <div className="p-6 overflow-y-auto space-y-5 grow z-10 relative">
              {/* Name & Title */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-primary leading-tight mb-1">
                  {item.name}
                </h3>
                <p className="font-sans text-sm text-[#594140] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Alert message if unavailable */}
              {!item.isAvailable && (
                <div className="bg-red-50 text-red-700 p-3 rounded-xl flex items-center gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Esse prato está temporariamente esgotado hoje.</span>
                </div>
              )}
            </div>

            {/* Bottom Actions Fixed Footer */}
            <div className="bg-cream-medium/85 backdrop-blur-md p-6 border-t border-[#e0bfbd]/40 flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
              {/* Price & Primary Action Button */}
              <div className="flex items-center gap-4 w-full justify-end">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#594140]/60 block tracking-wider">
                    Total
                  </span>
                  <span className="font-sans text-xl font-extrabold text-primary">
                    {isConsultPrice ? "Sob consulta" : formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
