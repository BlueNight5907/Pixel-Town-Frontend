import { combineReducers } from "redux";
import authReducer from "./Auth";
import roomReducer from "./Room";
import joinRoomReducer from "./JoinRoom";
import userSettingReducer from "./UserSetting";
import notificationReducer from "./Notification";
const rootReducer = combineReducers({
    authReducer,notificationReducer, roomReducer, joinRoomReducer, userSettingReducer
})

export default rootReducer;