export const CHANGE_STATE = 'CHANGE_STATE';

function changeState(newState) {
  return {
    type: CHANGE_STATE,
    payload: newState,
  };
}

export function goToState(newState) {
  return async (dispatch) => {
    dispatch(changeState(newState));
    // TODO
  };
}
