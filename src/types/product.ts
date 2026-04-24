export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: string;
  image: string;
  description: string;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}
