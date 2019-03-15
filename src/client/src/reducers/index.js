import userReducer from './userReducer';
import windowReducer from './windowReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    user: userReducer,
    window: windowReducer
});