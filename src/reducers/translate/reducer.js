import { Record } from 'immutable';

import { SET_LANGUAGE } from './actions';
import { SET_ROUTE } from '../routes/actions'; // FIXME
import es from '../../extra/translate/es.json';
import en from '../../extra/translate/en.json';

const TranslateRecord = new Record({
  selected: 'es',
  strings: es,
  options: { es, en },
  routes: {
    module: {
      title: 'Bienvenido a Yachay',
      from: 'init',
    },
    view: {
      title: '',
      from: '',
    },
    method: {},
  },
});


export const initialState = new TranslateRecord();

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LANGUAGE: {
      const newState = state.set('selected', action.payload);
      const anotherState = newState.set('strings', newState.options[newState.selected]);
      return anotherState.set('routes', {
        module: {
          title: anotherState.strings.menu[anotherState.routes.module.from].title || '',
          from: anotherState.routes.module.from,
        },
        view: {
          title: anotherState.strings.menu[anotherState.routes.module.from][anotherState.routes.view.from] || '',
          from: anotherState.routes.view.from,
        },
        method: {},
      });
    }
    case SET_ROUTE: {
      return state
        .set('routes', {
          module: {
            title: state.strings.menu[action.payload.module].title || '',
            from: action.payload.module,
          },
          view: {
            title: state.strings.menu[action.payload.module][action.payload.view] || '',
            from: action.payload.view,
          },
          method: {},
        });
    }
    default:
      return state;
  }
}

export default reducer;
