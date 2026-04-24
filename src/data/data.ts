import type { ICategoria } from "../types/categoria";
import type { Product } from "../types/product";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Classic Burger",
    price: 5500,
    categoryId: "burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    description: "Carne, queso cheddar, lechuga, tomate y salsa especial.",
  },
  {
    id: 2,
    name: "Double Bacon Burger",
    price: 7200,
    categoryId: "burgers",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    description: "Doble medallon, bacon crocante y cheddar.",
  },
  {
    id: 3,
    name: "Napolitana Pizza",
    price: 8900,
    categoryId: "pizza",
    image:
      "https://images.unsplash.com/photo-1548365328-8b849e7d19ea?auto=format&fit=crop&w=800&q=80",
    description: "Salsa de tomate, muzarella y rodajas de tomate fresco.",
  },
  {
    id: 4,
    name: "Pepperoni Pizza",
    price: 9400,
    categoryId: "pizza",
    image:
      "https://images.unsplash.com/photo-1594007654729-407eedc4fe0f?auto=format&fit=crop&w=800&q=80",
    description: "Masa artesanal con pepperoni y queso.",
  },
  {
    id: 5,
    name: "Lemonade",
    price: 2800,
    categoryId: "drinks",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    description: "Limonada fresca con menta.",
  },
  {
    id: 6,
    name: "Iced Coffee",
    price: 3200,
    categoryId: "drinks",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
    description: "Cafe frio con hielo y toque de vainilla.",
  },
  {
    id: 7,
    name: "Brownie",
    price: 3400,
    categoryId: "desserts",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    description: "Brownie de chocolate con nueces.",
  },
  {
    id: 8,
    name: "Cheesecake",
    price: 3900,
    categoryId: "desserts",
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
    description: "Cheesecake cremoso con frutos rojos.",
  },
];

export const getCategories = (): ICategoria[] => {
  return [
    { id: "all", label: "Todos" },
    { id: "burgers", label: "Burgers" },
    { id: "pizza", label: "Pizzas" },
    { id: "drinks", label: "Bebidas" },
    { id: "desserts", label: "Postres" },
  ];
};
