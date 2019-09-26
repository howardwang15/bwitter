export const INCREMENT_LIKES = 'INCREMENT_LIKES';
export const DECREMENT_LIKES = 'DECREMENT_LIKES';
export const FETCH_BWEETS = 'FETCH_BWEETS';

export const incrementLikeCount = id => {
    return {
        type: INCREMENT_LIKES,
        payload: id
    };
}

export const decrementLikeCount = id => {
    return {
        type: DECREMENT_LIKES,
        payload: id
    };
}

export const fetchBweets = userID => {
    return {
        type: FETCH_BWEETS,
        payload: userID
    };
}

