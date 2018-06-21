import { USER_CHANGE_INFO } from '../constants/User';

export function changeInfo(data) {
    return {
        type: USER_CHANGE_INFO,
        payload: data
    }
}