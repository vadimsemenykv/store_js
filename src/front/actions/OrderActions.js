import {
    CHANGE_ORDER_REQUEST, CHANGE_ORDER_SUCCESS, CHANGE_ORDER_FAIL,
    CHANGE_ORDER_STATUS_REQUEST, CHANGE_ORDER_STATUS_SUCCESS, CHANGE_ORDER_STATUS_FAIL
} from '../constants/Order';

export function changeOrderStatus(payload) {
    return (dispatch) => {
        dispatch({
            type: CHANGE_ORDER_STATUS_REQUEST,
            payload: payload
        });

        fetch('/api/catalog/orders/update-status', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    id: payload.id,
                    status: payload.status
                }
            })
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    dispatch({
                        type: CHANGE_ORDER_STATUS_SUCCESS,
                        payload: {
                            id: payload.id,
                            order: response.order
                        }
                    });
                } else {
                    dispatch({
                        type: CHANGE_ORDER_STATUS_FAIL,
                        payload: {...payload, errors: response.errors}
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: CHANGE_ORDER_STATUS_FAIL,
                    payload: {...payload, errors: [error.toString()]}
                });
            });
    };
}

export function changeOrder(payload) {
    return (dispatch) => {
        dispatch({
            type: CHANGE_ORDER_REQUEST,
            payload: payload
        });

        fetch('/api/catalog/orders/update', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    id: payload.id,
                    data: payload.data
                }
            })
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    dispatch({
                        type: CHANGE_ORDER_SUCCESS,
                        payload: {
                            id: payload.id,
                            order: response.order
                        }
                    });
                } else {
                    dispatch({
                        type: CHANGE_ORDER_FAIL,
                        payload: {...payload, errors: response.errors}
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: CHANGE_ORDER_FAIL,
                    payload: {...payload, errors: [error.toString()]}
                });
            });
    };
}
