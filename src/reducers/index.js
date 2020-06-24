import { combineReducers } from "redux";
import authedUser from "./authedUser";
import questions from "./questions";
import users from "./users";
import { loadingBarReducer } from "react-redux-loading";
export default combineReducers({
    authedUser,
    questions,
    users,
    loadingBar: loadingBarReducer
})