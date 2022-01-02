import {REMOVE_USER_IN_ROOM , ADD_NEW_USER_TO_ROOM,JOIN_ROOM_REQUEST,JOIN_ROOM_FAILED,JOIN_ROOM_SUCCESS,SET_CHARACTER,
ADD_NEW_MESSAGE,GET_MESSAGES_FAILED,GET_MESSAGES_REQUEST,GET_MESSAGES_SUCCESS,GET_USERS_IN_ROOM_FAILED,GET_USERS_IN_ROOM_REQUEST,GET_USERS_IN_ROOM_SUCCESS,SET_READY_TO_JOIN } from "../types/JoinRoom";
const initialState = {
    roomInfor:{},
    users:[],
    message:[],
    myCharacter:null,
    readyToJoin:false,
    loadingJoinRoom: false,
    errorLoadingJoinRoom:null,
    loadingUsers: false,
    errorLoadingUsers:null,
    loadingMessage: false,
    errorLoadingMessage:null,
}

const joinRoomReducer = (state = initialState, action) => {
    const {payload} = action;
    switch (action.type) {
        case ADD_NEW_USER_TO_ROOM:
            return {
                ...state,
                users:[...state.users,payload.data]
            }
        case SET_READY_TO_JOIN:
            return{
                ...state,
                readyToJoin:payload.data
            }
        case REMOVE_USER_IN_ROOM:
            return {
                ...state,
                users:state.users.filter(user => user.userId !== payload.data)
            }
        case JOIN_ROOM_REQUEST:
            return {
                ...state,
                loadingJoinRoom:true
            }
        case JOIN_ROOM_SUCCESS:
            return {
                ...state,
                loadingJoinRoom:false,
                users:payload.data.users,
                roomInfor:payload.data.roomInfor,
                errorLoadingJoinRoom:null,
            }
        case JOIN_ROOM_FAILED:
            return {
                ...state,
                loadingJoinRoom:false,
                errorLoadingUsers:payload.error
            }
        case GET_USERS_IN_ROOM_REQUEST:
            return {
                ...state,
                loadingUsers:true
            }
        case GET_USERS_IN_ROOM_SUCCESS:
            return {
                ...state,
                loadingUsers:false,
                users:payload.data
            }
        case GET_USERS_IN_ROOM_FAILED:
            return {
                ...state,
                loadingUsers:false,
                errorLoadingUsers:payload.error
            }
        case GET_MESSAGES_REQUEST:
            return {
                ...state,
                loadingMessage:true
            }
        case GET_MESSAGES_SUCCESS:
            return {
                ...state,
                loadingMessage:false,
                message:[...state.message,...payload.data]
            }
        case GET_MESSAGES_FAILED:
            return {
                ...state,
                loadingMessage:false,
                errorLoadingMessage:payload.error
            }
        case ADD_NEW_MESSAGE:
            return {
                ...state,
                loadingMessage:false,
                message:[...state.message,...payload.data]
            }
        case SET_CHARACTER:
            return{
                ...state,
                myCharacter:payload.data
            }
        default:
            return state;
    }
}
export default joinRoomReducer;