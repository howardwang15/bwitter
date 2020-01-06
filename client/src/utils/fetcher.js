import * as routes from '../config';

export const getAllBweets = async user => {
    const url = `${routes.API_URL}${routes.ALL_BWEETS_ROUTE}`;
    const res = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        }
    });
    return res.json();
}

export const addNewBweet = async (bweet, user) => {
    const url = `${routes.API_URL}${routes.ADD_NEW_BWEET_ROUTE}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, bweet })
    });
    return res.json();
}
