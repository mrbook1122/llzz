import {combineReducers} from "redux";
import {SET_CURRENT_KEY, SET_PATH} from "../actions";

const currentKey = (state = 0, action) => {
    switch (action.type) {
        case SET_CURRENT_KEY:
            return action.key
        default:
            return state
    }
}

const path = (state = '/', action) => {
    switch (action.type) {
        case SET_PATH:
            return action.path
        default:
            return state
    }
}

export default combineReducers({
    currentKey,
    path
})