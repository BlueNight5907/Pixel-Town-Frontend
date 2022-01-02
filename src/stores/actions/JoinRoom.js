import { joinRoomApi } from "../../api/roomApi"
import { JOIN_ROOM_FAILED, JOIN_ROOM_REQUEST, JOIN_ROOM_SUCCESS, SET_READY_TO_JOIN } from "../types/JoinRoom"

export const joinRoom = (roomId,CharacterID)=>{
    return async(dispatch, getState)=>{
        //loading get myroom
        dispatch({type:JOIN_ROOM_REQUEST})
        try{
            const {data} = await joinRoomApi(roomId,CharacterID)
            const infor = data?.value
            let {room, userInRoom} = infor
            let roomInfor = {
                id:room.id,
                description:room.description,
                quantity:room.quantity,
                roomName:room.roomName,
                roomPass:room.roomPass,
                hostId:room.userId,
                mapId:room.mapId,
            }
            let users = userInRoom?.map(user =>{
                return {
                    characterId:user.characterId,
                    userId:user.userId,
                    time:user.time,
                    state:user.state
                }
            })
            setTimeout(() => {
                dispatch({
                    type: JOIN_ROOM_SUCCESS,
                    payload: {
                        data: {
                            roomInfor,
                            users
                        },
                    },
                });
                dispatch({
                    type:SET_READY_TO_JOIN,
                    payload:{
                        data:true
                    }
                })
                const stateAfter = getState();
                console.log("Room Details after dispatch: ", stateAfter.joinRoomReducer);
            }, 1000);
        }
        catch(error){
            console.log(error.response?.data ? error.response.data : error.message)
            setTimeout(() => {
                dispatch({
                type: JOIN_ROOM_FAILED,
                payload: {
                    error: error.response?.data ? error.response.data : error.message,
                },
              });
            }, 1000);
        }
    }
}