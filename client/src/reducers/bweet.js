import { INCREMENT_LIKES, DECREMENT_LIKES, SET_BWEETS } from '../actions/bweets';

export default (state = {bweets: []}, action) => {
    switch (action.type) {

        case SET_BWEETS:
            return { ...state, ...action.payload };

        case INCREMENT_LIKES:
            let newStateIncrement = { ...state };
            for (let i = 0; i < state.bweets.length; i++) {
                if (state.bweets[i].id === action.payload) {
                    newStateIncrement.bweets[i].liked = !newStateIncrement.bweets[i].liked;
                    newStateIncrement.bweets[i].likes++;
                    break;
                }
            }
            return newStateIncrement;

        case DECREMENT_LIKES:
            let newStateDecrement = { ...state };
            for (let i = 0; i < state.bweets.length; i++) {
                if (state.bweets[i].id === action.payload) {
                    newStateDecrement.bweets[i].liked = !newStateDecrement.bweets[i].liked;
                    newStateDecrement.bweets[i].likes--;
                    break;
                }
            }
            return newStateDecrement;

        default:
            return { ...state };
    }
}
