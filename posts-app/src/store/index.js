import { createStore } from 'redux';
import { combineReducers } from 'redux';
import post from "./reducers/post";

const rootReducer = combineReducers({
    post,
})
const store = createStore(rootReducer);

export default store;