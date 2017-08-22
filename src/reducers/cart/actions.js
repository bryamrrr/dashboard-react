import _ from 'lodash';

import constants from '../../extra/constants';
import httpRequest from '../../extra/http-request';

import store from '../store';

export const TOGGLE_CART = 'TOGGLE_CART';
export const CLOSE_CART = 'CLOSE_CART';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const SET_PACKAGES = 'SET_PACKAGES';
export const ADD_PACKAGE = 'ADD_PACKAGE';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SELECT_PERIOD = 'SELECT_PERIOD';
export const SET_CART = 'SET_CART';
export const ITEM_DELETED = 'ITEM_DELETED';

export function toggleCart() {
  return { type: TOGGLE_CART };
}

export function closeCart() {
  return { type: CLOSE_CART };
}

export function addProduct(item) {
  return {
    type: ADD_PRODUCT,
    payload: {
      item,
    },
  };
}

export function addPackage(item, packageData) {
  return {
    type: ADD_PACKAGE,
    payload: {
      item,
      packageData,
    },
  };
}

export function setPackages(productId, packages) {
  return {
    type: SET_PACKAGES,
    payload: { productId, packages },
  };
}

export function deleteItem(item) {
  return {
    type: DELETE_ITEM,
    payload: item,
  };
}

export function selectPeriod(item, selected) {
  return {
    type: SELECT_PERIOD,
    payload: {
      item,
      selected,
    },
  };
}

export function setCart(data) {
  return {
    type: SET_CART,
    payload: data,
  };
}

export function itemDeleted() {
  return { type: ITEM_DELETED };
}

export function fetchPackages(itemId, countryProductId) {
  return async (dispatch) => {
    const url = `${constants.urls.API_SONQO}/packages/${countryProductId}`;
    const { data: { results } } = await httpRequest('GET', url);
    dispatch(setPackages(itemId, results));
  };
}

export function fetchCart(email, id) {
  return async (dispatch) => {
    const url = `${constants.urls.API_CART}/carts`;
    const dataToSend = {
      owner: {
        email,
        fk_user_id: id,
      },
    };
    const config = { hideToaster: true };
    const { data, meta } = await httpRequest('POST', url, dataToSend, config);

    if (meta.ok) {
      dispatch(setCart(data));
    }
  };
}

export function deleteItemFromBackend(itemId) {
  return async (dispatch) => {
    const cartId = store.getState().get('cart').id;
    const url = `${constants.urls.API_CART}/carts/${cartId}/items/${itemId}`;
    const config = { successMessage: 'Producto eliminado correctamente del carrito' };
    httpRequest('DELETE', url, null, config);
    dispatch(itemDeleted());
  };
}

export function fetchProductFromBackend(item, category, push) {
  return async (dispatch) => {
    const cartId = store.getState().get('cart').id;

    const productData = Object.assign({}, item, {
      type: 'product',
      category,
      fk_item_id: item.id || item.countryProductId,
    });

    const url = `${constants.urls.API_CART}/carts/${cartId}/items`;
    const config = { successMessage: 'Producto agregado al carrito de compras' };
    const { data, meta } = await httpRequest('POST', url, productData, config);
    const urlPush = `/detalle-producto/${data.id}/paquetes`;
    if (meta.ok) {
      dispatch(addProduct(data));
      if (push) push(urlPush);
    }
  };
}

export function addPackageToBackend(item, packageData, push) {
  return async (dispatch) => {
    const state = store.getState();
    const cartId = state.get('cart').id;
    const itemId = state.get('cart').items.get(item).id;

    const products = Object.assign({},
      _.mapKeys(packageData.remainingProducts, (key) => {
        if (key.countryProductId) return key.countryProductId;
        return key.id;
      }),
    );

    const countryProductId = state.get('cart').items.get(item).fk_item_id
      || state.get('cart').items.get(item).id;
    const product = {
      [countryProductId]: state.get('cart').items.get(item),
    };

    const selectedItem = {
      periodSlug: packageData.periodSlug,
      price: packageData.price,
      periodId: packageData.periodId,
      periodName: packageData.periodName,
      currencySymbol: packageData.currencySymbol,
    };

    const dataToSend = {
      period: packageData.periodName,
      selected: selectedItem,
      name: packageData.name,
      type: 'package',
      products: Object.assign({}, products, product),
      fk_item_id: countryProductId,
    };

    // Send package (product) to API
    const url = `${constants.urls.API_CART}/carts/${cartId}/items`;
    const config = { successMessage: 'Paquete agregado al carrito de compras' };
    const { data, meta } = await httpRequest('POST', url, dataToSend, config);

    const urlPush = '/catalogo/dominios';
    if (meta.ok) {
      // Delete single item to cart
      const urlDelete = `${constants.urls.API_CART}/carts/${cartId}/items/${itemId}`;
      const configDelete = { hideToaster: true };
      httpRequest('DELETE', urlDelete, null, configDelete);
      dispatch(addPackage(item, data));
      if (push) push(urlPush);
    }
  };
}
