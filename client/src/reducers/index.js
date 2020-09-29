import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import plan from "./plan";

export default combineReducers({
    auth,
    profile,plan
    
});