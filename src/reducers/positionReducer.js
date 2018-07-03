import { MOVE_POSITION, BACK_POSITION } from '../actions/positionActions';

const initialState = { currentPosition: '1', history: ['1']}

const positionReducer = (state = initialState, action) => {
  switch(action.type) {
    case MOVE_POSITION:
      // We do not want to go back to position 5, as it is not a view the user can see.
      if (action.payload !== '5') {
        state.history.push(action.payload)
      }
      return Object.assign({}, state, { currentPosition: action.payload, history: state.history });
      break;
    case BACK_POSITION:
      state.history.pop();
      return Object.assign({}, state, { currentPosition: state.history.slice(-1)[0], history: state.history });
    default:
      return state;
  }
};

export default positionReducer;