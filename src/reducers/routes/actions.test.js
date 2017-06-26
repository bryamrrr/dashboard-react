import {
  SET_ROUTE,
  setRoute,
} from './actions';

describe('Routes - Actions', () => {
  describe('SET_ROUTE', () => {
    test('has the correct type', () => {
      const action = setRoute();
      expect(action.type).toEqual(SET_ROUTE);
    });
    test('has the correct payload', () => {
      const action = setRoute({ title: 'Bienvenidos a Yachay', url: '/inicio' });
      expect(action.payload).toEqual({
        module: { title: 'Bienvenidos a Yachay', url: '/inicio' },
        view: {},
        method: {},
      });
    });
  });
});
