import { GET_MY_ROOMS_REQUEST, GET_MY_ROOMS_SUCCESS, GET_MY_ROOMS_FAILED,
GET_WORLD_ROOMS_REQUEST, GET_WORLD_ROOMS_SUCCESS,GET_WORLD_ROOMS_FAILED,
DELETE_ROOM_REQUEST, DELETE_ROOM_FAILED, DELETE_ROOM_SUCCESS, CREATE_ROOM_FAILED,CREATE_ROOM_REQUEST,CREATE_ROOM_SUCCESS} from "../types/Room";
const initialState = {
  allSpaces:[],
  joinedSpaces:[],
  createdSpaces:[],
  worldRooms:[],
  loadingMyRooms: false,
  loadingWorldRoom:false,
  errorLoadingRoom:null,

  loadingCreateRoom:false,
  errorLoadingCreateRoom:null,

  loadingDeleteRoom:false,
  errorLoadingDeleteRoom:null
}

const roomReducer = (state = initialState, action) => {
  const {payload} = action;
  switch (action.type) {
    case GET_MY_ROOMS_REQUEST:
      return {
        ...state,
        allSpaces:[],
        joinedSpaces:[],
        createdSpaces:[],
        loadingMyRooms:true
      }
    case GET_MY_ROOMS_SUCCESS:
      return {
        ...state,
        loadingMyRooms:false,
        allSpaces: payload.data.allSpaces,
        createdSpaces:payload.data.createdSpaces,
        joinedSpaces:payload.data.joinedSpaces
      }
    case GET_MY_ROOMS_FAILED:
      return {
        ...state,
        loadingMyRooms:false,
        errorLoadingRoom:payload.error
      }
    case GET_WORLD_ROOMS_REQUEST:
      return {
        ...state,
        worldRooms:[],
        loadingWorldRooms:true
      }
    case GET_WORLD_ROOMS_SUCCESS:
      return {
        ...state,
        loadingWorldRooms:false,
        worldRooms: payload.data
      }
    case GET_WORLD_ROOMS_FAILED:
      return {
        ...state,
        loadingWorldRooms:false,
        errorLoadingRoom:payload.error
      }
    case DELETE_ROOM_REQUEST:
      return {
        ...state,
        loadingDeleteRoom:true
      }
    case DELETE_ROOM_SUCCESS:
      return {
        ...state,
        loadingDeleteRoom:false,
      }
    case DELETE_ROOM_FAILED:
      return {
        ...state,
        loadingDeleteRoom:false,
        myRooms:payload.error
      }
    case CREATE_ROOM_REQUEST:
      return {
        ...state,
        loadingCreateRoom:true
      }
    case CREATE_ROOM_SUCCESS:
      return {
        ...state,
        loadingCreateRoom:true
      }
    case CREATE_ROOM_FAILED:
      return {
        ...state,
        loadingCreateRoom:false,
        errorLoadingCreateRoom:payload.error
      }
    default:
      return state;
  }
}
export default roomReducer;