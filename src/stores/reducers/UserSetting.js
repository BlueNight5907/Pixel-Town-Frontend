import * as multiChar from "../../game/constant/character";
import { CHANGE_MIC_SETTING,CHANGE_CAMERA_SETTING } from "../types/UserSetting";
const mic = localStorage.getItem("mic") ? JSON.parse(localStorage.getItem("mic")) : true;
const camera = localStorage.getItem("camera") ? JSON.parse(localStorage.getItem("camera")) : true;
const characters = Object.values(multiChar);
const initialState = {
  mic: mic,
  camera:camera,
  characters: characters,
};

const userSettingReducer = (state = initialState, action) => {
    const {payload} = action
    switch (action.type) {
        case CHANGE_MIC_SETTING:
            return{
                ...state,
                mic:payload.data
            }
        case CHANGE_CAMERA_SETTING:
            return{
                ...state,
                camera:payload.data
            }
        default:
        return state;
    }
}
export default userSettingReducer;