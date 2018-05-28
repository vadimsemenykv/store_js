import {
    PASSWORD_INPUT_TYPE_SWITCH
} from '../constants/Registration'

export function switchOn(likePassword) {
    return (dispatch) => {
        dispatch({
            type: PASSWORD_INPUT_TYPE_SWITCH,
            payload: {likePassword: !likePassword}
        });
    }
}