import { combineReducers } from 'redux';
import user from './user';
import journey from './journey';
import contacts from './contacts';

const reducer = combineReducers({
  user,
  journey,
  contacts,
});

export default reducer;
