import {
    SET_ERRORS
} from '../constants/FormErrors'

const initialState = {
    validationErrors: []
};

export default function formErrors(state = initialState, action) {
    switch (action.type) {
        case SET_ERRORS:
            let validationErrors = state.validationErrors;
            validationErrors[action.payload.id] = action.payload.errors;
            return { ...state, validationErrors: validationErrors };
        default:
            return state;
    }
}