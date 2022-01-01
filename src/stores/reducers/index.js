import { combineReducers } from "redux";
import authReducer from "./Auth";
import roomReducer from "./Room";
import roomDetailReducer from "./RoomDetail";
import joinRoomReducer from "./JoinRoom";
import userSettingReducer from "./UserSetting";
import notificationReducer from "./Notification";
const rootReducer = combineReducers({
    authReducer,notificationReducer, roomReducer, roomDetailReducer, joinRoomReducer, userSettingReducer
})

export default rootReducer;