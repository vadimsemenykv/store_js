import { USER_CHANGE_INFO_REQUEST } from '../constants/User';

const initialState = {
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case USER_CHANGE_INFO_REQUEST:
            return {...state, ...action.payload};
        default:
            return state;
    }

}