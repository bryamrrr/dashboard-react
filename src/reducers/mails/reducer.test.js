import reducer, { initialState } from './reducer';

import {
  SET_MAILS,
  SET_MAIL_PRICES,
} from './actions';

describe('Domains - Reducer', () => {
  let action;

  beforeEach(() => {
    action = {
      type: SET_MAILS,
      payload: [{
        period: "Anual",
        price: 178,
        id: "aeb662ef-0117-450a-91e2-a067893e9767",
        description: [
          "100 GB",
          "10 cuentas",
        ],
      }],
    }
  });

  test('return initialState by default', () => {
    const action = { type: '' };
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  test('sets prices with the correct payload', () => {
    const newState = reducer(undefined, action);
    expect(newState.get('aeb662ef-0117-450a-91e2-a067893e9767')).toEqual({
      period: "Anual",
      price: 178,
      id: "aeb662ef-0117-450a-91e2-a067893e9767",
      description: [
        "100 GB",
        "10 cuentas",
      ],
    });
  });

  test('sets mail prices with the correct payload', () => {
    const state = reducer(undefined, action);

    const newAction = {
      type: SET_MAIL_PRICES,
      payload: [
        {
          prices: {
            renew: [],
            buy: [{price: 346, periodId: 'dc30bc56-56db-4b5e-bc26-c00df46d4d44', period : '1 1 A\u00f1o', currencySymbol: 'S/'}, {"price": 657.4, "periodId": "fc2dd957-4220-4ca9-af54-0f0b8646b411", "period": "2 2 A\u00f1os", "currencySymbol": "S/"
            }]
          },
          id: 'aeb662ef-0117-450a-91e2-a067893e9767',
          zone: null,
          name: 'buzon 10',
        },
      ],
    };

    const newState = reducer(state, newAction);

    expect(newState.get('aeb662ef-0117-450a-91e2-a067893e9767').description).toEqual([
        "100 GB",
        "10 cuentas",
      ]);
    expect(newState.get('aeb662ef-0117-450a-91e2-a067893e9767').prices).toEqual({
      renew: [],
      buy: [{price: 346, periodId: 'dc30bc56-56db-4b5e-bc26-c00df46d4d44', period : '1 1 A\u00f1o', currencySymbol: 'S/'}, {"price": 657.4, "periodId": "fc2dd957-4220-4ca9-af54-0f0b8646b411", "period": "2 2 A\u00f1os", "currencySymbol": "S/"
      }]
    });
  });
});
