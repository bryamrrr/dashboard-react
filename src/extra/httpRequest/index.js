export default (method, url, data = {}) => {
  const config = {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return fetch(url, config);
};
