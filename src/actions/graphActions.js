import axios from 'axios';

export const FETCH_GRAPH   = 'FETCH_GRAPH';
export const FETCH_ZONING_TABLE = 'FETCH_ZONING_TABLE';
export const FETCH_PERMIT_TABLE = 'FETCH_PERMIT_TABLE';

export const RECEIVE_GRAPH = 'RECEIVE_GRAPH';
export const RECEIVE_ZONING_TABLE = 'RECEIVE_ZONING_TABLE';
export const RECEIVE_PERMIT_TABLE = 'RECEIVE_PERMIT_TABLE';

export const receiveGraph = graph => {
  return {
    type: RECEIVE_GRAPH,
    payload: graph
  } 
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

export const fetchGraph = () => dispatch => {
  axios.get('./graph.json')
    .then(res => {
      dispatch(receiveGraph(res.data));
    })
    .catch(err => {
      console.log(err);
    })
};

// Maybe put into own actions someday

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

