import bweetReducer from './bweet';
import { combineReducers } from 'redux';

export default combineReducers({ bweets: bweetReducer });