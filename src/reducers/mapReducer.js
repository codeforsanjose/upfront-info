import { 
  CHANGE_POINT_COORDINATES,
  SET_ZONING_ABBREVIATION,
  SET_ZONING_DESCRIPTION,
  SET_ADDRESS,
} from '../actions/mapActions';

const initialState = {
  point: {x: 0, y: 0},
  zoningAbbreviation: "N/A",
  zoningDescription: "N/A",
  address: "",
  name: ""
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
      case SET_ADDRESS:
        newState.address = action.payload.address;
        newState.name = action.payload.name;
        return newState;
      default:
        return state;
  }
};

export default mapReducer;