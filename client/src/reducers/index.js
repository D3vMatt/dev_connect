import { combineReducers } from 'redux';
import alerts from './alert';

const rootReducer = combineReducers({
  alerts,
});

export default rootReducer;
