import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import accountRootReducer from '../reducers/pages/account';
import catalogRootReducer from '../reducers/pages/catalog';

export function configureAccountStore(preloadedState) {
    return createStore(
        accountRootReducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware
        )
    );
}
export function configureCatalogStore(preloadedState) {
    return createStore(
        catalogRootReducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware
        )
    );
}
