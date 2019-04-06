import userReducer from './userReducer';
import windowReducer from './windowReducer';
import noteReducer from './noteReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    user: userReducer,
    window: windowReducer,
    note: noteReducer
});