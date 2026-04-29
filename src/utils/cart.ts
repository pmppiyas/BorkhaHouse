import { ICart } from '@/interface/product.interface';

export const getCart = (): ICart[] => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('cart') || '[]');
};

export const saveCart = (cart: ICart[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
};

export const removeFromCart = (slug: string) => {
  const cart = getCart();
  const updated = cart.filter((item) => item.slug !== slug);

  saveCart(updated);
};

export const removeMultipleFromCart = (slugs: string[]) => {
  const cart = getCart();
  const updated = cart.filter((item) => !slugs.includes(item.slug));

  saveCart(updated);
};

export const clearCart = () => {
  localStorage.removeItem('cart');
  window.dispatchEvent(new Event('cartUpdated'));
};
