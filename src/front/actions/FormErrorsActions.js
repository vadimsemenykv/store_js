import {
    SET_ERRORS
} from '../constants/FormErrors'

export function setErrors(errors, formId) {
    return (dispatch) => {
        dispatch({
            type: SET_ERRORS,
            payload: { id: formId, errors: errors }
        });
    }
}