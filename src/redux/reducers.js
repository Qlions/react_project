import { combineReducers} from "redux";

import counter from "./reducers/counter"
import userInfo from "./reducers/userInfo"
import page1 from "./reducers/page1"

export default combineReducers({
    counter,
    userInfo,
    page1
})