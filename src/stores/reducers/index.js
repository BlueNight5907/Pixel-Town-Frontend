import { combineReducers } from "redux";
import authReducer from "./Auth";
import roomReducer from "./Room";
import roomDetailReducer from "./RoomDetail";
import joinRoomReducer from "./JoinRoom";
import userSettingReducer from "./UserSetting";

const rootReducer = combineReducers({
    authReducer, roomReducer, roomDetailReducer, joinRoomReducer, userSettingReducer
})

export default rootReducer;