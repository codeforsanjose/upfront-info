import { RECEIVE_GRAPH } from '../actions/graphActions';

const initialState = {nodes: undefined}

const nodeReducer = (state = initialState, action) => {
  switch(action.type) {
      case RECEIVE_GRAPH:
        return action.payload;
        break;
      default:
        return state;
  }
};

export default nodeReducer;