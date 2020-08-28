import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import rootReducer from "./Reducer"

const initState = {}

const store = createStore(rootReducer, initState, applyMiddleware(thunk))
export default store