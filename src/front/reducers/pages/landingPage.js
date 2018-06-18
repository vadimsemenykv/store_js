import { combineReducers } from 'redux'
import header from '../header'
import footer from '../footer'
import user from '../user'
//TODO rename with uppercase
export default combineReducers({
    header,
    footer,
    user
})