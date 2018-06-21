import { USER_CHANGE_INFO } from '../constants/User';

const initialState = {
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case USER_CHANGE_INFO:
            return {...state, ...action.payload};
        default:
            return state;
    }

}