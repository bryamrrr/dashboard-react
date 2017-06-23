export const TOGGLE_CART = 'TOGGLE_CART';
export const CLOSE_CART = 'CLOSE_CART';
export const ADD_PRODUCT = 'ADD_PRODUCT';

export function toggleCart() {
  return { type: TOGGLE_CART };
}

export function closeCart() {
  return { type: CLOSE_CART };
}

export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
}
