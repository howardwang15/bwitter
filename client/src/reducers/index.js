import { combineReducers } from 'redux';
import bweetReducer from './bweet';
import authReducer from './auth';
import modalReducer from './modal';

export default combineReducers({
    bweets: bweetReducer,
    auth: authReducer,
    modal: modalReducer,
});
