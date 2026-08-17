import { LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";

export interface Category {
  id: string;
  name: string;
  description?: string;
  image: StaticImageData;
  icon: LucideIcon; // Name of lucide-react icon
  featured?: boolean; // Large card span
}

export interface MenuItem {
  id: string;
  categoryId: string;
  subcategory?: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: StaticImageData | string;
  isAvailable: boolean;
  estimatedTime?: string;
  isHighlighted?: boolean;
  isNotOpenable?: boolean
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}
