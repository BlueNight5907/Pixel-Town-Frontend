import { deleteRoomApi, getMyRooms, getWorldRooms } from "../../api/roomApi";
import { GET_MY_ROOMS_REQUEST, GET_MY_ROOMS_SUCCESS, GET_MY_ROOMS_FAILED,
    GET_WORLD_ROOMS_REQUEST, GET_WORLD_ROOMS_SUCCESS,GET_WORLD_ROOMS_FAILED, CREATE_ROOM_REQUEST, CREATE_ROOM_SUCCESS, CREATE_ROOM_FAILED, DELETE_ROOM_REQUEST, DELETE_ROOM_SUCCESS, DELETE_ROOM_FAILED } from "../types/Room";
import {createRoomApi} from "../../api/roomApi"
import { REMOVE_LOADING, SET_LOADING, SET_SMALL_NOTIFICATION } from "../types/Notification";
export const getUserRooms = (path)=>{
    return async(dispatch, getState)=>{

        //loading get myroom
        dispatch({type:GET_MY_ROOMS_REQUEST})
        const {currentUser} = getState().authReducer;
        try{
            const result = await getMyRooms(path);
            const data = result.data;
            const {create, join} = data;
            const createdSpaces = create.map((room)=>{
                return{
                    id:room.id,
                    description:room.description,
                    imageUrl:room.imageUrl,
                    quantity:room.quantity,
                    roomName:room.roomName,
                    pass:room.roomPass,
                    hostId:room.userId,
                    userJoinRoom:room.userJoinRoom,
                    mapId:room.mapId
                }
            })

            const joinedSpaces = join.map((room)=>{
                return{
                    id:room.id,
                    description:room.description,
                    imageUrl:room.imageUrl,
                    quantity:room.quantity,
                    roomName:room.roomName,
                    pass:room.roomPass,
                    hostId:room.userId,
                    userJoinRoom:room.userJoinRoom,
                    mapId:room.mapId
                }
            }).filter(room => {
                if(room.hostId !== currentUser.id){
                    return true
                }
                return false
            })

            
            let temp = joinedSpaces.filter((e)=>{
                for(let i = 0; i< createdSpaces.length;i++){
                    if(e.id === createdSpaces[i].id){
                        return false
                    }
                }
                return true
            });
            let allSpaces = [...createdSpaces,...temp]
            setTimeout(() => {
                dispatch({
                    type:GET_MY_ROOMS_SUCCESS,
                    payload:{
                        data:{
                            createdSpaces,
                            joinedSpaces,
                            allSpaces
                        }
                    }
                })
            }, 1000);
            console.log(data)
        }
        catch(error){
            console.log(error)
            setTimeout(() => {
              dispatch({
                type: GET_MY_ROOMS_FAILED,
                payload: {
                  error: error.response?.data ? error.response.data.value : error.message,
                },
              });
            }, 1000);
        }
    }
}

export const getExploreRooms = (path)=>{
    return async(dispatch, getState)=>{
        const {currentUser} = getState().authReducer;
        //loading get myroom
        dispatch({type:GET_WORLD_ROOMS_REQUEST})
        try{
            const result = await getWorldRooms(path);
            const data = result.data;
            console.log(data)
            const allRooms = data?.map((room)=>{
                const hasPass = room.userJoinRoom?.filter(e => e.userId == currentUser.id).length == 0 || room.userId !== currentUser.id
                return{
                    id:room.id,
                    description:room.description,
                    imageUrl:room.imageUrl,
                    quantity:room.quantity,
                    roomName:room.roomName,
                    roomPass:hasPass && room.roomPass,
                    hostId:room.userId,
                    userJoinRoom:room.userJoinRoom,
                    mapId:room.mapId
                }
            })


            
            setTimeout(() => {
                dispatch({
                    type:GET_WORLD_ROOMS_SUCCESS,
                    payload:{
                        data:allRooms
                    }
                })
            }, 1000);
        }
        catch(error){
            console.log(error)
            setTimeout(() => {
              dispatch({
                type: GET_WORLD_ROOMS_FAILED,
                payload: {
                  error: error.response?.data ? error.response.data.value : error.message,
                },
              });
            }, 1000);
        }
    }
}

export const createRoom = (formData)=>{
    return async(dispatch)=>{

        //loading get myroom
        dispatch({type:CREATE_ROOM_REQUEST})
        dispatch({
            type:SET_LOADING
        })
        try{
            console.log(formData)
            const {data} = await createRoomApi(formData);


            
            setTimeout(() => {
                dispatch({
                    type:REMOVE_LOADING
                })
                dispatch({
                    type:CREATE_ROOM_SUCCESS
                })
                dispatch({
                    type:SET_SMALL_NOTIFICATION,
                    payload:{
                        data:"Create Room Successfully"
                    }
                })
            }, 1000);
        }
        catch(error){
            console.log(error.response?.data ? error.response.data : error.message)
            setTimeout(() => {
                dispatch({
                    type:REMOVE_LOADING
                })
                dispatch({
                type: CREATE_ROOM_FAILED,
                payload: {
                    error: error.response?.data ? error.response.data.value : error.message,
                },
              });
            }, 1000);
        }
    }
}


export const deleteRoom = (roomId)=>{
    return async(dispatch)=>{

        //loading get myroom
        dispatch({type:DELETE_ROOM_REQUEST})
        dispatch({
            type:SET_LOADING
        })
        try{
            const {data} = await deleteRoomApi(roomId);


            
            setTimeout(() => {
                dispatch({
                    type:REMOVE_LOADING
                })
                dispatch({
                    type:DELETE_ROOM_SUCCESS
                })
                dispatch({
                    type:SET_SMALL_NOTIFICATION,
                    payload:{
                        data:"Delete Room Successfully"
                    }
                })
            }, 1000);
        }
        catch(error){
            console.log(error.response?.data ? error.response.data : error.message)
            setTimeout(() => {
                dispatch({
                    type:REMOVE_LOADING
                })
                dispatch({
                type: DELETE_ROOM_FAILED,
                payload: {
                    error: error.response?.data ? error.response.data.value : error.message,
                },
              });
            }, 1000);
        }
    }
}

