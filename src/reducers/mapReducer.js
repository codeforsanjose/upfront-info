import { 
  CHANGE_POINT_COORDINATES,
  SET_ZONING_ABBREVIATION,
  SET_ZONING_DESCRIPTION
} from '../actions/mapActions';

const initialState = {
  point: {x: 0, y: 0},
  zoningAbbreviation: "",
  zoningDescription: ""
};

const mapReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch(action.type) {
      case CHANGE_POINT_COORDINATES:
        newState.point = action.payload;
        return newState;
      case SET_ZONING_ABBREVIATION:
        newState.zoningAbbreviation = action.payload;
        return newState;
      case SET_ZONING_DESCRIPTION: 
        newState.zoningDescription = action.payload;
        return newState;
      default:
        return state;
  }
};

export default mapReducer;