import axios from 'axios';

export const CHANGE_POINT_COORDINATES = 'CHANGE_POINTS_COORDINATES';
export const CHANGE_CENTER_COORDINATES = 'CHANGE_CENTER_COORDINATES';
export const SET_ZONING_ABBREVIATION = 'SET_ZONING_ABBREVIATION';
export const SET_ZONING_DESCRIPTION = 'SET_ZONING_DESCRIPTION';

export const changePointCoordinates = point => {
  return {
    type: CHANGE_POINT_COORDINATES,
    payload: point 
  } 
};

export const setZoning

