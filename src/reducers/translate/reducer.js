import { Record } from 'immutable';

import { SET_LANGUAGE } from './actions';
import es from '../../extra/translate/es.json';

const TranslateRecord = new Record({
  selected: 'es',
  strings: es,
  options: { es },
});


export const initialState = new TranslateRecord();

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LANGUAGE: {
      const newState = state.set('selected', action.payload);
      return newState.set('strings', newState.options[newState.selected]);
    }
    default:
      return state;
  }
}

export default reducer;
