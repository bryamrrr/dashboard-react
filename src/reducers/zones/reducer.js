import { Map as map } from 'immutable';

export const initialState = map({
  1: { id: 1, name: 'pe' },
  2: { id: 2, name: 'com.pe' },
  3: { id: 3, name: 'net' },
});


function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;
