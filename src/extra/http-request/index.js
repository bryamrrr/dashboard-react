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
      }
      console.log('Response with status code 401, redirecting to Login');
    } else if (response.meta.status === 403) {
      console.log('Response with status code 403, redirecting to Home');
    } else if (response.meta.status === 500) {
      console.log('Response with status code 500, dont know what to do');
    } else {
      console.log(`Unhandled status ${response.status}`);
    }
  } catch (error) {
    console.log('Error unhandled', error);
  }

  return response;
};
