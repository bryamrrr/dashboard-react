import store from '../../reducers/store';

function httpRequest(method, url, data = {}) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${store.getState().auth.token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, config);
}

export default httpRequest;
