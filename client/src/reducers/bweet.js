import { INCREMENT_LIKES, DECREMENT_LIKES, FETCH_BWEETS } from '../actions/bweets';

const bweets = [
    {
        user: {
            firstName: 'Howard',
            lastName: 'Wang',
            handle: 'howardwang15',
            picture: 'https://tinyurl.com/y4ea26gh'
        },
        text: 'This is my final Bweet',
        timestamp: new Date(),
        id: 'somehash',
        liked: true,
        likes: 1
    },
    {
        user: {
            firstName: 'Howard',
            lastName: 'Wang',
            handle: 'howardwang15',
            picture: 'https://tinyurl.com/y4ea26gh'
        },
        text: 'Hello Bwitter! Seems like I\'m the first one here...',
        timestamp: new Date(),
        id: 'anotherhash',
        liked: false,
        likes: 0
    }
]

export default (state = {bweets: bweets}, action) => {
    switch (action.type) {
        case FETCH_BWEETS:
            return { ...state };

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
