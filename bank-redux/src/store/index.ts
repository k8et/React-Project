import {applyMiddleware, combineReducers, createStore} from "redux";
import {cashReducer} from "./bank/cashReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {customerReducer} from "./bank/customerReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    cash: cashReducer,
    customer: customerReducer,
})
export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))