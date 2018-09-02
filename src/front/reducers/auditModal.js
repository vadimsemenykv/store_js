import {
    AUDIT_MODAL_OPEN,
    AUDIT_MODAL_DATA_LOADING_ERROR,
    AUDIT_MODAL_DATA_LOADED,
    AUDIT_MODAL_CANCEL,
} from '../constants/AuditModal';

const initialState = {
    opened: false,
    data: []
};

export default function auditModal(state = initialState, action) {
    switch (action.type) {
        case AUDIT_MODAL_OPEN:
            state.opened = true;
            return {...state};
        case AUDIT_MODAL_DATA_LOADED:
            state.data = action.payload;
            return {...state};
        case AUDIT_MODAL_CANCEL:
            state.data = [];
            state.opened = false;
            return {...state};
        default:
            return state;
    }
}
