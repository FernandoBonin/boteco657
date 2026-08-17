import type { Metadata } from "next";
import { categories } from "../../../data/menu";

interface Props {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const category = categories.find(
    (category) => category.id === slug
  );

  if (!category) {
    return {
      title: "Categoria não encontrada",
      description: "Categoria não encontrada no cardápio.",
    };
  }

  return {
    title: `${category.name} | Boteco 647`,
    description: category.description,
  };
}

export default function CategoryLayout({
  children,
}: Props) {
  return children;
}