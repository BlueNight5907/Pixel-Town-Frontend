import { getFilesApi, getFilesLastApi, getMessagesApi, joinRoomApi, userInRoomApi } from "../../api/roomApi"
import { GET_FILES_FAILED, GET_FILES_LAST_SUCCESS, GET_FILES_REQUEST, GET_FILES_SUCCESS, GET_MESSAGES_FAILED, GET_MESSAGES_REQUEST,GET_MESSAGES_SUCCESS, GET_USERS_IN_ROOM_FAILED, GET_USERS_IN_ROOM_REQUEST, GET_USERS_IN_ROOM_SUCCESS, JOIN_ROOM_FAILED, JOIN_ROOM_REQUEST, JOIN_ROOM_SUCCESS, SET_READY_TO_JOIN } from "../types/JoinRoom"

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
                    state:user.state,
                    userImg:user.avatar,
                    name:user.name
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

export const getAllPeople = (roomId) => {
    return async(dispatch)=>{
        //loading get myroom
        dispatch({type:GET_USERS_IN_ROOM_REQUEST})
        try{
            const {data} = await userInRoomApi(roomId)
            let users = data.value?.map(user =>{
                return {
                    characterId:user.characterId,
                    userId:user.userId,
                    time:user.time,
                    state:user.state,
                    userImg:user.avatar,
                    name:user.name
                }
            })
            setTimeout(() => {
                dispatch({
                    type:GET_USERS_IN_ROOM_SUCCESS,
                    payload:{
                        data:users
                    }
                })
            }, 1000);
        }
        catch(error){
            console.log(error.response?.data ? error.response.data : error.message)
            setTimeout(() => {
                dispatch({
                type: GET_USERS_IN_ROOM_FAILED,
                payload: {
                    error: error.response?.data ? error.response.data.value : error.message,
                },
              });
            }, 1000);
        }
    }
}


export const getMessages = (roomId,time)=>{
    return async(dispatch, getState)=>{
        //loading get myroom
        dispatch({type:GET_MESSAGES_REQUEST})
        try{
            const {data} = await getMessagesApi(roomId,time)

            setTimeout(() => {
                dispatch({
                    type:GET_MESSAGES_SUCCESS,
                    payload:{
                        data:data.value.reverse()
                    }
                })
            }, 1000);
        }
        catch(error){
            console.log(error.response?.data ? error.response.data : error.message)
            setTimeout(() => {
                dispatch({
                type: GET_MESSAGES_FAILED,
                payload: {
                    error: error.response?.data ? error.response.data.value : error.message,
                },
              });
            }, 1000);
        }
    }
}

export const getfiles = (roomId,time)=>{
    return async(dispatch, getState)=>{
        //loading get myroom
        dispatch({type:GET_FILES_REQUEST})
        try{
            const {data} = await getFilesApi(roomId,time)

            setTimeout(() => {
                dispatch({
                    type:GET_FILES_SUCCESS,
                    payload:{
                        data:data.value.reverse()
                    }
                })
            }, 1000);
        }
        catch(error){
            console.log(error.response?.data ? error.response.data : error.message)
            setTimeout(() => {
                dispatch({
                type: GET_FILES_FAILED,
                payload: {
                    error: error.response?.data ? error.response.data.value : error.message,
                },
              });
            }, 1000);
        }
    }
}

export const getfilesLast = (roomId,time)=>{
    return async(dispatch, getState)=>{
        //loading get myroom
        dispatch({type:GET_FILES_REQUEST})
        try{
            const {data} = await getFilesLastApi(roomId,time)

            setTimeout(() => {
                dispatch({
                    type:GET_FILES_LAST_SUCCESS,
                    payload:{
                        data:data.value.reverse()
                    }
                })
            }, 1000);
        }
        catch(error){
            console.log(error.response?.data ? error.response.data : error.message)
            setTimeout(() => {
                dispatch({
                type: GET_FILES_FAILED,
                payload: {
                    error: error.response?.data ? error.response.data.value : error.message,
                },
              });
            }, 1000);
        }
    }
}