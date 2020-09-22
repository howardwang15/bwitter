export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';

export const setUserAction = (user) => ({
    type: SET_USER,
    payload: user,
});

export const logoutAction = () => ({
    type: LOGOUT,
});
