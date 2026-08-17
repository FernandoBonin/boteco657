"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useState } from "react";
import { MenuItem } from "@/types";
import { CardItem } from "./cardItem";
import { X } from "lucide-react";

type ModalPromotionsProps = {
  title: string;
  items: MenuItem[];
};

export const ModalPromotions = ({ title, items }: ModalPromotionsProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const [api, setApi] = useState<CarouselApi>();

  const handleClose = () => {
    if (!api) {
      setIsOpen(false);
      return;
    }

    if (api.canScrollNext()) {
      api.scrollNext();
      return;
    }

    setIsOpen(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-2rem)] sm:max-w-2xl overflow-hidden"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 z-50 rounded-sm opacity-70 transition-opacity hover:opacity-100 p-1 border border-solid border-gray-200"
          aria-label="Próximo produto ou fechar"
        >
          <X className="size-6" />
        </button>
        <DialogHeader className="h-10 justify-center">
          <DialogTitle className="text-lg">{title}</DialogTitle>
        </DialogHeader>
        <div className="w-full min-w-0 px-10">
          {items.length > 1 ? (
            <Carousel setApi={setApi} className="w-full min-w-0">
              <CarouselContent>
                {items.map((item) => {
                  return (
                    <CarouselItem key={item.id} className="min-w-0">
                      <div className="w-full min-w-0 max-w-full overflow-hidden">
                        <CardItem item={item} />
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <CardItem item={items[0]} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
