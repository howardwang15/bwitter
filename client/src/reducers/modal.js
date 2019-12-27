import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal';

export default (state = { modalOpened: false }, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return { ...state, modalOpened: true };
        
        case CLOSE_MODAL:
            return { ...state, modalOpened: false };

        default:
            return { ...state };
    }
};
