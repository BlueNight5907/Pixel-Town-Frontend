import {REMOVE_USER_IN_ROOM , ADD_NEW_USER_TO_ROOM,JOIN_ROOM_REQUEST,JOIN_ROOM_FAILED,JOIN_ROOM_SUCCESS,SET_CHARACTER,
ADD_NEW_MESSAGE,GET_MESSAGES_FAILED,GET_MESSAGES_REQUEST,GET_MESSAGES_SUCCESS,GET_USERS_IN_ROOM_FAILED,GET_USERS_IN_ROOM_REQUEST,GET_USERS_IN_ROOM_SUCCESS,SET_READY_TO_JOIN, GET_FILES_REQUEST, GET_FILES_SUCCESS, GET_FILES_FAILED, ADD_NEW_FILES, GET_FILES_LAST_SUCCESS } from "../types/JoinRoom";
const initialState = {
    roomInfor:{},
    users:[],
    messages:[],
    files:[],
    myCharacter:null,
    readyToJoin:false,
    loadingJoinRoom: false,
    errorLoadingJoinRoom:null,
    loadingUsers: false,
    errorLoadingUsers:null,
    loadingMessage: false,
    errorLoadingMessage:null,
    loadingFile: false,
    errorLoadingFile:null,
}

const joinRoomReducer = (state = initialState, action) => {
    const {payload} = action;
    switch (action.type) {
        case ADD_NEW_FILES:
            return{
                ...state,
                files:[...state.files,payload.data]
            }
        case GET_FILES_REQUEST:
            return {
                ...state,
                loadingFile:true
            }
        case GET_FILES_SUCCESS:
            return {
                ...state,
                loadingFile:false,
                files:[...payload.data,...state.files]
            }
        case GET_FILES_LAST_SUCCESS:
            return {
                ...state,
                loadingFile:false,
                files:[...state.files,...payload.data]
            }
        case GET_FILES_FAILED:
            return {
                ...state,
                loadingFile:false,
                errorLoadingMessage:payload.error
            }
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
                loadingJoinRoom:true,
                users:[],
                messages:[],
                files:[]
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
                messages:[...payload.data,...state.messages]
            }
        case GET_MESSAGES_FAILED:
            return {
                ...state,
                loadingMessage:false,
                errorLoadingMessage:payload.error
            }
        case ADD_NEW_MESSAGE:
            console.log(payload)
            return {
                ...state,
                loadingMessage:false,
                messages:[...state.messages,payload.data]
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