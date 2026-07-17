import React from "react";
import {
  Star,
  Camera,
  MessageCircle,
  Phone,
  ArrowLeft,
  Heart,
  StarIcon,
} from "lucide-react";

interface HeaderProps {
  onBackHome?: () => void;
  showBackButton?: boolean;
  categoryName?: string;
  onOpenCart?: () => void;
}

export default function Header({
  onBackHome,
  showBackButton = false,
  categoryName,
  onOpenCart,
}: HeaderProps) {
  return (
    <header className="relative w-full bg-bg-parchment/90 backdrop-blur-md border-b border-[#e0bfbd]/30 top-0 z-40 px-4 py-3 flex flex-col items-center">
      {/* Subtle paper grain background overlay */}
      <div className="absolute inset-0 pointer-events-none grain-texture z-0 opacity-10"></div>

      {/* Dynamic top bar */}
      <div className="w-full max-w-5xl flex items-center justify-between z-10 relative">
        {showBackButton ? (
          <button
            id="back-button"
            onClick={onBackHome}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-cream-medium hover:bg-cream-high text-primary transition-all duration-200 active:scale-95"
            aria-label="Voltar para categorias"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-10 h-10"></div>
        )}

        {/* Center brand title */}
        <div className="flex flex-col items-center text-center">
          {categoryName ? (
            <div className="flex flex-col items-center">
              <span className="text-xs uppercase tracking-widest text-secondary font-semibold">
                Boteco 647
              </span>
              <h1 className="font-serif text-2xl font-bold text-primary tracking-tight">
                {categoryName}
              </h1>
            </div>
          ) : (
            <h1 className="font-serif text-xl font-bold text-primary tracking-wider">
              BOTECO 647
            </h1>
          )}
        </div>

        {/* Floating actions right side */}
        <div className="flex items-center gap-2">
          {onOpenCart && (
            <button
              id="cart-button-header"
              onClick={onOpenCart}
              className="relative rounded-lg px-3 py-1.5 bg-transparent border border-solid border-secondary text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all cursor-pointer"
              type="button"
            >
              <div className="text-xs font-semibold flex items-center gap-1">
                <p className="text-dark-charcoal">Avaliações</p>
                <StarIcon className="fill-amber-500 text-amber-400 size-5" />
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Main expanded brand header for the main page */}
      {!showBackButton && (
        <div className="mt-6 flex flex-col items-center text-center w-full z-10">
          {/* Gold Stars */}
          <div className="flex items-center gap-1 text-secondary mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>

          {/* Logo Mark */}
          <div className="relative mb-2">
            <h2 className="font-serif text-5xl font-extrabold text-primary tracking-wider leading-none">
              BOTECO
            </h2>
            <div className="w-full flex items-center justify-center mt-1">
              <div className="h-0.5 bg-secondary grow"></div>
              <span className="font-serif text-2xl font-bold text-secondary px-3">
                647
              </span>
              <div className="h-0.5 bg-secondary grow"></div>
            </div>
          </div>

          <h3 className="font-sans text-xl font-bold text-dark-charcoal mt-3">
            Faça seu pedido
          </h3>

          {/* Social Network shortcuts */}
          <div className="flex flex-col items-center mt-4 gap-1.5">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#594140]/70">
              Nossas redes
            </span>
            <div className="flex items-center gap-6 text-secondary">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-all transform hover:scale-110"
                title="Siga no Instagram"
              >
                <Camera className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-all transform hover:scale-110"
                title="Fale conosco no WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
              <a
                href="tel:+551199999999"
                className="hover:text-primary transition-all transform hover:scale-110"
                title="Ligar para o Boteco"
              >
                <Phone className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Elegant Divider with custom icon */}
          <div className="flex items-center justify-center gap-4 w-full max-w-sm mt-8 mb-4 opacity-50">
            <div className="h-px grow bg-[#52392f]"></div>
            <span className="text-sm font-serif text-[#52392f]">🍽️</span>
            <div className="h-px grow bg-[#52392f]"></div>
          </div>
        </div>
      )}
    </header>
  );
}
