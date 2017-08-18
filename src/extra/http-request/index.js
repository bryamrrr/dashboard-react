import fetch from 'isomorphic-fetch';

import store from '../../reducers/store';

import { showToaster } from '../../reducers/toaster/actions';

export default async (method, url, data = {}, options = {
  successMessage: 'Éxito',
  hideToaster: method === 'GET',
}) => {
  const token = (typeof localStorage !== 'undefined')
    ? localStorage.getItem('token')
    : '';

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: (method === 'GET')
      ? null
      : JSON.stringify(data),
  };

  let response = {};

  try {
    response = {
      meta: await fetch(url, config),
      data: {},
    };

    response.data = await response.meta.json();
    if (response.meta.ok) {
      if (!options.hideToaster) {
        store.dispatch(showToaster('success', options.successMessage));
      }
    } else if (response.meta.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      store.dispatch(showToaster('error', response.data.userMessage || 'Acceso denegado.'));
    } else if (response.meta.status === 403) {
      store.dispatch(showToaster('error', response.data.userMessage || 'Redireccionando al home.'));
    } else if (response.meta.status === 404) {
      store.dispatch(showToaster('error', response.data.userMessage || 'Recurso no encontrado.'));
    } else if (response.meta.status === 500) {
      store.dispatch(showToaster('error', response.data.userMessage || 'Error del servidor.'));
    } else {
      store.dispatch(showToaster('error', 'Hubo un error'));
    }
  } catch (error) {
    console.log('Error unhandled', error);
  }

  return response;
};
