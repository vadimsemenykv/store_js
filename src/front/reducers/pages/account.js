import { combineReducers } from 'redux'
import header from '../header'
import footer from '../footer'
import user from '../user'
import extraLinks from "../extraLinks";

export default combineReducers({
    header,
    footer,
    user,
    extraLinks
})