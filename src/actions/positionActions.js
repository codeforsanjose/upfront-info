export const MOVE_POSITION = 'MOVE_POSITION';
export const BACK_POSITION = 'BACK_POSITION';

export const movePosition = intPosition => {
  return {
    type: MOVE_POSITION,
    payload: intPosition 
  } 
};
export const backPosition = () => {
  return {
    type: BACK_POSITION
  } 
};