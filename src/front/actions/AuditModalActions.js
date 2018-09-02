import {
    AUDIT_MODAL_OPEN,
    AUDIT_MODAL_REQUESTED_DATA_LOADING,
    AUDIT_MODAL_REQUEsTED_DATA_LOADING_ERROR,
    AUDIT_MODAL_REQUESTED_DATA_LOADED,
    AUDIT_MODAL_CANCEL,
} from '../constants/AuditModal';

export function show(auditId) {
    return (dispatch) => {
        dispatch({
            type: AUDIT_MODAL_OPEN,
            payload: auditId
        });

        fetch('/api/catalog/audit/' + this.props.offer.audit.toString(), {
            method: 'GET',
            credentials: 'same-origin',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'}
        })
            .then((response) => response.json())
            .then((response) => {
                // if (response.success) {
                this.toggleAuditModal();
                this.setState({
                    auditData: response.audit
                });
                console.log(response.audit);
                // } else {
                // dispatch({
                //     type: DECLINE_REJECT_OFFER_FAIL,
                //     payload: {offer: response.offer, errors: response.errors}
                // });
                // }
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
