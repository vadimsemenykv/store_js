import {LOCATION_CHANGE} from '../constants/Location';

const initialState = {
};

export default function location(state = initialState, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            window.replace(action.payload);
            return state;
        default:
            return state;
    }
}
