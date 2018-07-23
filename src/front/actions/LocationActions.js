import {LOCATION_CHANGE} from '../constants/Location';

export function changeLocation(location) {
    return {
        type: LOCATION_CHANGE,
        payload: location
    };
}
