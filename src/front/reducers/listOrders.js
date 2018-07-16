import {CHANGE_ORDER_STATUS_REQUEST, CHANGE_ORDER_STATUS_SUCCESS} from '../constants/Order';

const initialState = {
    list: [],
    changedAt: (new Date()).toISOString()
};

export default function listOrders(state = initialState, action) {
    let orderIndex = '';
    switch (action.type) {
        case CHANGE_ORDER_STATUS_REQUEST:
            orderIndex = state.list.findIndex((order) => {
                return action.payload.id === order._id.toString();
            });
            state.list[orderIndex].requestLoading = true;
            return {...state, changedAt: (new Date()).toISOString()};

        case CHANGE_ORDER_STATUS_SUCCESS:
            orderIndex = state.list.findIndex((order) => {
                return action.payload.id === order._id.toString();
            });
            state.list[orderIndex].status = action.payload.status;
            state.list[orderIndex].requestLoading = false;
            return {...state, changedAt: (new Date()).toISOString()};

        default:
            return {list: state.list, changedAt: state.changedAt ? state.changedAt : initialState.changedAt};
    }
}
