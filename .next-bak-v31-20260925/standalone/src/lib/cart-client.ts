/**
 * Client-side Cart Utility
 * Uses localStorage for cart state management
 * Dispatches custom events for cross-component synchronization
 */

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  comparePrice?: number;
  quantity: number;
}

export interface CartData {
  items: CartItem[];
  total: number;
  itemCount: number;
}

const CART_KEY = 'tamkinly_cart';

export function getCart(): CartData {
  if (typeof window === 'undefined') {
    return { items: [], total: 0, itemCount: 0 };
  }
  
  try {
    const cartData = localStorage.getItem(CART_KEY);
    if (cartData) {
      const cart = JSON.parse(cartData);
      return {
        items: cart.items || [],
        total: cart.items?.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0) || 0,
        itemCount: cart.items?.reduce((sum: number, item: CartItem) => sum + item.quantity, 0) || 0,
      };
    }
  } catch {
    // Ignore errors
  }
  
  return { items: [], total: 0, itemCount: 0 };
}

export function addToCart(item: Omit<CartItem, 'quantity'>): CartData {
  const cart = getCart();
  
  const existingIndex = cart.items.findIndex(i => i.productId === item.productId);
  
  if (existingIndex >= 0) {
    // Product already in cart - don't add again (digital products are one-time purchases)
    return cart;
  }
  
  const newItems = [...cart.items, { ...item, quantity: 1 }];
  const newCart: CartData = {
    items: newItems,
    total: newItems.reduce((sum, i) => sum + i.price, 0),
    itemCount: newItems.length,
  };
  
  localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  
  // Dispatch custom event for other components to listen
  window.dispatchEvent(new CustomEvent('cart-updated'));
  
  return newCart;
}

export function removeFromCart(productId: string): CartData {
  const cart = getCart();
  const newItems = cart.items.filter(i => i.productId !== productId);
  const newCart: CartData = {
    items: newItems,
    total: newItems.reduce((sum, i) => sum + i.price, 0),
    itemCount: newItems.length,
  };
  
  localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  window.dispatchEvent(new CustomEvent('cart-updated'));
  
  return newCart;
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new CustomEvent('cart-updated'));
}
