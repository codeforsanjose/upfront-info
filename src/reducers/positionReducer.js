import { MOVE_POSITION } from '../actions/positionActions';

const positionReducer = (state = 1, action) => {
  switch(action.type) {
    case MOVE_POSITION:
      return action.payload;
      break;
    default:
      return state;
  }
};

export default positionReducer;