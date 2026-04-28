import type { CartItem, Product } from "../types/product";

const CART_KEY = "foodStoreCart";

export const readCart = (): CartItem[] => {
  const rawValue = localStorage.getItem(CART_KEY);

  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue) as CartItem[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
};

export const writeCart = (items: CartItem[]): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const clearCart = (): void => {
  writeCart([]);
};

export const addToCart = (product: Product): CartItem[] => {
  const cart = readCart();
  const existingItem = cart.find((item) => item.productId === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  writeCart(cart);
  return cart;
};

export const updateCartQuantity = (
  productId: number,
  quantity: number
): CartItem[] => {
  const cart = readCart();
  const item = cart.find((cartItem) => cartItem.productId === productId);

  if (!item) {
    return cart;
  }

  item.quantity = quantity;

  const filteredCart = cart.filter((cartItem) => cartItem.quantity > 0);
  writeCart(filteredCart);
  return filteredCart;
};

export const getCartTotal = (): number => {
  return readCart().reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const getCartItemsCount = (): number => {
  return readCart().reduce((acc, item) => acc + item.quantity, 0);
};
