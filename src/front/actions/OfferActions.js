import {
    DECLINE_REJECT_OFFER_REQUEST, DECLINE_REJECT_OFFER_SUCCESS, DECLINE_REJECT_OFFER_FAIL,
    ACCEPTING_OFFER_ORDER_RESERVE_REQUEST, ACCEPTING_OFFER_ORDER_RESERVE_SUCCESS, ACCEPTING_OFFER_ORDER_RESERVE_FAIL
} from '../constants/Offer';

export function declineOffer(offer) {
    return (dispatch) => {
        dispatch({
            type: DECLINE_REJECT_OFFER_REQUEST,
            payload: offer
        });

        fetch('/api/catalog/offers/decline', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({offer: {id: offer._id}})
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    dispatch({
                        type: DECLINE_REJECT_OFFER_SUCCESS,
                        payload: response.offer
                    });
                } else {
                    dispatch({
                        type: DECLINE_REJECT_OFFER_FAIL,
                        payload: {offer: response.offer, errors: response.errors}
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: DECLINE_REJECT_OFFER_FAIL,
                    payload: {offer: offer, errors: [error.toString()]}
                });
            });
    };
}

export function declineAndProposeNewOffer(offer) {
    return (dispatch) => {
        dispatch({
            type: DECLINE_REJECT_OFFER_REQUEST,
            payload: offer
        });

        fetch('/api/catalog/offers/decline', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({offer: {id: offer._id}})
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    dispatch({
                        type: DECLINE_REJECT_OFFER_SUCCESS,
                        payload: response.offer
                    });
                    window.location.replace('/catalog/offers/create/' + offer.order._id.toString() + '?offer=' + offer._id.toString());
                } else {
                    dispatch({
                        type: DECLINE_REJECT_OFFER_FAIL,
                        payload: {offer: response.offer, errors: response.errors}
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: DECLINE_REJECT_OFFER_FAIL,
                    payload: {offer: offer, errors: [error.toString()]}
                });
            });
    };
}

export function startAcceptingOffer(offer) {
    return (dispatch) => {
        dispatch({
            type: ACCEPTING_OFFER_ORDER_RESERVE_REQUEST,
            payload: offer
        });
        fetch('/api/catalog/contracts/reserve', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({orderId: offer.order._id})
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    dispatch({
                        type: ACCEPTING_OFFER_ORDER_RESERVE_SUCCESS,
                        payload: offer
                    });
                    window.location.replace('/catalog/offers/accept/' + offer._id.toString());
                } else {
                    dispatch({
                        type: DECLINE_REJECT_OFFER_FAIL,
                        payload: {offer: offer, errors: response.errors}
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: DECLINE_REJECT_OFFER_FAIL,
                    payload: {offer: offer, errors: [error.toString()]}
                });
            });
    };
}
