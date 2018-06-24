import {USER_CHANGE_INFO_FAIL, USER_CHANGE_INFO_REQUEST, USER_CHANGE_INFO_SUCCESS} from '../constants/User';

export function changeInfo(data) {
    return {
        type: USER_CHANGE_INFO_REQUEST,
        payload: data
    }

    // return (dispatch) => {
    //     dispatch({
    //         type: USER_CHANGE_INFO_REQUEST,
    //         payload: data
    //     });
    //
    //     fetch(url, {
    //         method: 'PATCH',
    //         credentials: "same-origin",
    //         headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    //         body: JSON.stringify({
    //             form: {name: 'user_info_form', data: data}
    //         })
    //     })
    //         .then(response => response.json())
    //         .then(response => {
    //             if (response.success) {
    //                 dispatch({
    //                     type: USER_CHANGE_INFO_SUCCESS,
    //                     payload: data
    //                 });
    //
    //                 // this.setState({isEditMode: false});
    //             } else {
    //                 dispatch({
    //                     type: USER_CHANGE_INFO_FAIL,
    //                     payload: data//TODO change this!!!
    //                 });
    //
    //                 // this.setState({serverValidationError: response.validationErrors});
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             dispatch({
    //                 type: USER_CHANGE_INFO_FAIL,
    //                 payload: data//TODO change this!!!
    //             })
    //         });
    // }
}