import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

// custom reducers
import positionReducer from './positionReducer';
import nodeReducer from './nodeReducer';

const rootReducer = combineReducers({
	form: formReducer,
  position: positionReducer
});

export default rootReducer;