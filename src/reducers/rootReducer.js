import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

// custom reducers
import positionReducer from './positionReducer';
import nodeReducer from './nodeReducer';
import mapReducer from './mapReducer';
import lookupTableReducer from './lookupTableReducer';

const rootReducer = combineReducers({
	form: formReducer,
  position: positionReducer,
  graph: nodeReducer,
  map: mapReducer,
  lookup: lookupTableReducer
});

export default rootReducer;