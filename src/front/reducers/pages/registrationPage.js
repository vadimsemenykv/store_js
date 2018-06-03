import { combineReducers } from 'redux'
import header from '../header'
import footer from '../footer'
import extraLinks from '../extraLinks'

export default combineReducers({
    header,
    footer,
    extraLinks
})