import {
  SET_LANGUAGE,
  setLanguage,
} from './actions';

describe('Translate - Actions', () => {
  describe('SET_LANGUAGE', () => {
    test('has the correct type', () => {
      const action = setLanguage();
      expect(action.type).toEqual(SET_LANGUAGE);
    });
    test('has the correct payload', () => {
      const action = setLanguage('es');
      expect(action.payload).toEqual('es');
    });
  });
});
