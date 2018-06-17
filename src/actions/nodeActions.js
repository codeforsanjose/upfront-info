import axios from 'axios';

export const MOVE_POSITION = 'MOVE_POSITION';

export const movePosition = intPosition => {
  return {
    type: MOVE_POSITION,
    payload: intPosition 
  } 
};

