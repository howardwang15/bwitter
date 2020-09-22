export const INCREMENT_LIKES = 'INCREMENT_LIKES';
export const DECREMENT_LIKES = 'DECREMENT_LIKES';
export const SET_BWEETS = 'SET_BWEETS';

export const incrementLikeCountAction = (id) => ({
    type: INCREMENT_LIKES,
    payload: id,
});

export const decrementLikeCountAction = (id) => ({
    type: DECREMENT_LIKES,
    payload: id,
});

export const setBweetsAction = (bweets) => ({
    type: SET_BWEETS,
    payload: bweets,
});
