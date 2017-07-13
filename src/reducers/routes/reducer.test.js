import {
  SET_ROUTE,
  setRoute,
} from './actions.js';

import reducer, { initialState } from './reducer';

describe('Routes - Reducer', () => {
  test('returns initial state by default', () => {
    const action = { type: '' };
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  test('set the correct route', () => {
    const action = {
      type: SET_ROUTE,
      payload: {
        module: {
          title: 'Catálogo',
          url: '',
        },
        view: {
          title: 'Planes de Hosting',
          url: '',
        },
        method: {},
      }
    };

    expect(reducer(undefined, action).module.title).toEqual('Catálogo');
    expect(reducer(undefined, action).view.title).toEqual('Planes de Hosting');
    expect(reducer(undefined, action).method.title).toBeUndefined();
  });
});
