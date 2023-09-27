import {combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { legacy_createStore as createStore } from 'redux';


import cartItems from './Reducers/cartItem'

const reducers = combineReducers ({
    cartItems:cartItems
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;