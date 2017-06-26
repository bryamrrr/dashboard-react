export const SET_ROUTE = 'SET_ROUTE';

export function setRoute(module = {}, view = {}, method = {}) {
  return {
    type: SET_ROUTE,
    payload: {
      module,
      view,
      method,
    },
  };
}
