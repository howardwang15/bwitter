import { SET_USER } from '../actions/user';

export default (state = { user: null }, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };

        default:
            return { ...state };
    }
}
