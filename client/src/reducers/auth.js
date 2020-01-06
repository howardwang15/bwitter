import { SET_USER, LOGOUT } from '../actions/user';

export default (state = { user: null }, action) => {
    switch (action.type) {
        case SET_USER:
            localStorage.setItem('user', JSON.stringify(action.payload));
            return { ...state, user: action.payload };

        case LOGOUT:
            localStorage.removeItem('user');
            return { ...state, user: null };

        default:
            return { ...state };
    }
}
