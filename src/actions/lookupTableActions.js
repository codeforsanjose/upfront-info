import axios from 'axios';

export const RECEIVE_ZONING_TABLE = 'RECEIVE_ZONING_TABLE';
export const RECEIVE_PERMIT_TABLE = 'RECEIVE_PERMIT_TABLE';
export const FETCH_ZONING_TABLE = 'FETCH_ZONING_TABLE';
export const FETCH_PERMIT_TABLE = 'FETCH_PERMIT_TABLE';

export const fetchZoningTable = () => dispatch => {
  axios.get('./zoningTable.json')
    .then(res => {
      dispatch(receiveZoningTable(res.data));
    })
    .catch(err => {
      console.log(err); 
    })
};

export const fetchPermitTable = () => dispatch => {
  axios.get('./permitTable.json')
    .then(res => {
      dispatch(receivePermitTable(res.data));
    })
    .catch(err => {
      console.log(err);
    })
};

export const receiveZoningTable = table => {
  return {
    type: RECEIVE_ZONING_TABLE,
    payload: table 
  }
};

export const receivePermitTable = table => {
  return {
    type: RECEIVE_PERMIT_TABLE,
    payload: table
  }
};