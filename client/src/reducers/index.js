import { combineReducers } from 'redux';
import alerts from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';

const rootReducer = combineReducers({
  alerts,
  auth,
  profile,
  post,
});

export default rootReducer;
