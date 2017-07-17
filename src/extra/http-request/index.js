import fetch from 'isomorphic-fetch';

import store from '../../reducers/store';

import { showToaster } from '../../reducers/toaster/actions';

export default async (method, url, data = {}) => {
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

    if (response.meta.ok) {
      response.data = await response.meta.json();
    } else if (response.meta.status === 401) {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        store.dispatch(showToaster('error', 'Acceso denegado.'));
      }
    } else if (response.meta.status === 403) {
      store.dispatch(showToaster('error', 'Redireccionando al home.'));
    } else if (response.meta.status === 500) {
      store.dispatch(showToaster('error', 'Error del servidor.'));
    } else {
      store.dispatch(showToaster('error'));
    }
  } catch (error) {
    console.log('Error unhandled', error);
  }

  return response;
};
