import { combineReducers } from 'redux'
import header from '../header'
import footer from '../footer'
import extraLinks from '../extraLinks'

//TODO rename with uppercase
export default combineReducers({
    header,
    footer,
    extraLinks
})