import bweetReducer from './bweet';
import authReducer from './auth';
import modalReducer from './modal';
import { combineReducers } from 'redux';

export default combineReducers({
    bweets: bweetReducer,
    auth: authReducer,
    modal: modalReducer
});
