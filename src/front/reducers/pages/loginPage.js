import { combineReducers } from 'redux'
import header from '../header'
import loginForm from '../loginForm'
import footer from '../footer'
import extraLinks from '../extraLinks'

export default combineReducers({
    header,
    loginForm,
    footer,
    extraLinks
})