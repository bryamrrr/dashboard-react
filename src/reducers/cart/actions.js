export const TOGGLE_CART = 'TOGGLE_CART';
export const CLOSE_CART = 'CLOSE_CART';

export function toggleCart() {
  return { type: TOGGLE_CART };
}

export function closeCart() {
  return { type: CLOSE_CART };
}
