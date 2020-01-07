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

export const deleteBweet = async (id, user) => {
    const url = `${routes.API_URL}${routes.DELETE_BWEET_ROUTE}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    });
    return res.json();
}

export const registerUser = async user => {
    const url = `${routes.API_URL}${routes.REGISTER_USER_ROUTE}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user })
    });
    return res.json();
}

export const signInUser = async user => {
    const url = `${routes.API_URL}${routes.LOGIN_USER_ROUTE}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user })
    });
    return res.json();
}
