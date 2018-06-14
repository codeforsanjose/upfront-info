import { CHANGE_POINT_COORDINATES } from '../actions/mapActions';

const initialState = {
  point: {x: 0, y: 0},
  zoningAbbreviation: "",
  zoningDescription: ""
};

const mapReducer = (state = initialState, action) => {
  const newState = Object.assign(state, {});
  switch(action.type) {
      case CHANGE_POINT_COORDINATES:
        newState.point = action.payload;
        return newState
        break;
      default:
        return newState;
  }
};

export default nodeReducer;