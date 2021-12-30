import { GET_ROOM_DETAIL_REQUEST, GET_ROOM_DETAIL_FAILED, GET_ROOM_DETAIL_SUCCESS } from "../types/RoomDetail";
const initialState = {
    roomInfor:{},
    loadingRoomInfor: false,
    errorLoadingRoomInfor:null,
}

const roomDetailReducer = (state = initialState, action) => {
    const {payload} = action;
    switch (action.type) {
        case GET_ROOM_DETAIL_REQUEST:
            return {
                ...state,
                loadingRoomInfor:true
            }
        case GET_ROOM_DETAIL_SUCCESS:
            return {
                ...state,
                loadingRoomInfor:false,
                roomInfor:{
                    ...state.roomInfor,
                    ...payload.data
                }
            }
        case GET_ROOM_DETAIL_FAILED:
            return {
                ...state,
                loadingRoomInfor:false,
                errorLoadingRoomInfor:payload.error
            }
        default:
            return state;
    }
}
export default roomDetailReducer;