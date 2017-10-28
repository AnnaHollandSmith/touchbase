import { combineReducers } from 'redux';
import user from './user';
import journey from './journey';

const reducer = combineReducers({
  user,
  journey,
});

export default reducer;
