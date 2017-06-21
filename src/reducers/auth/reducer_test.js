import reducer from './reducer';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from '../../actions';

describe('Reducer - Auth', () => {
  let action;

  beforeEach(() => {
    action = {
      type: LOGIN_REQUEST,
      payload: {
        username: 'admin',
        password: '123456',
      },
    };
  });

  test('stores user credentials', () => {
    expect(reducer(undefined, action).creds).toEqual({
      username: 'admin',
      password: '123456',
    });
  });
});