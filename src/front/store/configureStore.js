import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import accountRootReducer from '../reducers/pages/account'

export function configureAccountStore(preloadedState) {
    return createStore(
        accountRootReducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware
        )
    );
}