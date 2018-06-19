import axios from 'axios';

import {
  RECEIVE_ZONING_TABLE,
  RECEIVE_PERMIT_TABLE,
  FETCH_ZONING_TABLE,
  FETCH_PERMIT_TABLE
} from '../actions/lookupTableActions';

const initialState = {
  zoningTable: undefined,
  permitTable: undefined
};

const lookupTableReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch(action.type) {
      case RECEIVE_PERMIT_TABLE:
        newState.permitTable = action.payload;
        return newState;
      case RECEIVE_ZONING_TABLE:
        newState.zoningTable = action.payload;
        return newState;
      default:
        return newState;
  }
};

export default lookupTableReducer;