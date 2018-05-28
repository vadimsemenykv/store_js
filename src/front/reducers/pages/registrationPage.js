import { combineReducers } from 'redux'
import header from '../header'
import registrationForm from '../registrationForm'
import footer from '../footer'
import extraLinks from '../extraLinks'
import formErrors from '../formErrors'

export default combineReducers({
    header,
    footer,
    extraLinks,
    formErrors
})