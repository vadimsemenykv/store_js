import {
    PASSWORD_INPUT_TYPE_SWITCH
} from '../constants/Registration'

const initialState = {
    likePassword: true
};

export default function loginForm(state = initialState, action) {
    switch (action.type) {
        case PASSWORD_INPUT_TYPE_SWITCH:
            return { ...state, likePassword: action.payload.likePassword };
        default:
            return state;
    }
}