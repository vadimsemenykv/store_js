import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS
} from '../constants/Login'

export function login(user) {

    return (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST,
            payload: user
        });

        setTimeout(() => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: [1,2,3,4,5]
            })
        }, 1000)
    }
}

export function switchOn() {
    return (dispatch) => {
        console.log(55);
        dispatch({
            type: 'SWITCH_ON',
            payload: {likePassword: false}
        });
    }
}