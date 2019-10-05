import bweetReducer from './bweet';
import authReducer from './auth';
import { combineReducers } from 'redux';

export default combineReducers({ bweets: bweetReducer, auth: authReducer });