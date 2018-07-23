import {
    ACCEPTING_OFFER_ORDER_RESERVE_REQUEST, ACCEPTING_OFFER_ORDER_RESERVE_SUCCESS,
    DECLINE_REJECT_OFFER_REQUEST, DECLINE_REJECT_OFFER_SUCCESS
} from '../constants/Offer';

const initialState = {
    list: [],
    changedAt: (new Date()).toISOString()
};

export default function listOffers(state = initialState, action) {
    let offerIndex = '';
    switch (action.type) {
        case DECLINE_REJECT_OFFER_REQUEST:
            offerIndex = state.list.findIndex((offer) => {
                return action.payload._id.toString() === offer._id.toString();
            });
            state.list[offerIndex].requestLoading = true;
            return {...state, changedAt: (new Date()).toISOString()};

        case DECLINE_REJECT_OFFER_SUCCESS:
            offerIndex = state.list.findIndex((offer) => {
                return action.payload._id.toString() === offer._id.toString();
            });
            state.list[offerIndex] = action.payload;
            return {...state, changedAt: (new Date()).toISOString()};
        case ACCEPTING_OFFER_ORDER_RESERVE_REQUEST:
            offerIndex = state.list.findIndex((offer) => {
                return action.payload._id.toString() === offer._id.toString();
            });
            state.list[offerIndex].requestLoading = true;
            return {...state, changedAt: (new Date()).toISOString()};
        case ACCEPTING_OFFER_ORDER_RESERVE_SUCCESS:
            offerIndex = state.list.findIndex((offer) => {
                return action.payload._id.toString() === offer._id.toString();
            });
            state.list[offerIndex] = action.payload;
            return {...state, changedAt: (new Date()).toISOString()};
        default:
            return {list: state.list, changedAt: state.changedAt ? state.changedAt : initialState.changedAt};
    }
}
