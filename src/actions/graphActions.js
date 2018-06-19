import axios from 'axios';

export const FETCH_GRAPH   = 'FETCH_GRAPH';
export const RECEIVE_GRAPH = 'RECEIVE_GRAPH';


export const fetchGraph = () => dispatch => {
  axios.get('./graph.json')
    .then(res => {
      dispatch(receiveGraph(res.data));
    })
    .catch(err => {
      console.log(err);
    })
};

export const receiveGraph = graph => {
  return {
    type: RECEIVE_GRAPH,
    payload: graph
  } 
};



