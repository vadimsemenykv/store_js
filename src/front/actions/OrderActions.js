import {
    CHANGE_ORDER_STATUS_FAIL,
    // CHANGE_ORDER_REQUEST,
    // CHANGE_ORDER_SUCCESS,
    // CHANGE_ORDER_FAIL,
    CHANGE_ORDER_STATUS_REQUEST, CHANGE_ORDER_STATUS_SUCCESS,
    // CHANGE_ORDER_STATUS_SUCCESS,
    // CHANGE_ORDER_STATUS_FAIL
} from '../constants/Order';

export function changeOrderStatus(data) {
    return (dispatch) => {
        dispatch({
            type: CHANGE_ORDER_STATUS_REQUEST,
            payload: data
        });

        fetch('/api/catalog/orders/change-status', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    id: data.id,
                    status: data.status
                }
            })
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    dispatch({
                        type: CHANGE_ORDER_STATUS_SUCCESS,
                        payload: data
                    });
                } else {
                    dispatch({
                        type: CHANGE_ORDER_STATUS_FAIL,
                        payload: {...data, success: response.success, errors: response.errors}
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: CHANGE_ORDER_STATUS_FAIL,
                    payload: {...data, success: false, errors: [error.toString()]}
                });
            });
    };
}
