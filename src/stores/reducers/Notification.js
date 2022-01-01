import { SET_SMALL_NOTIFICATION,DELETE_BIG_NOTIFICATION,DELETE_SMALL_NOTIFICATION,RESET_NOTIFICATION_STATE,
SET_BIG_NOTIFICATION,SET_NOTIFICATION_STATE, SET_LOADING, REMOVE_LOADING } from "../types/Notification";
const initialState = {
    smallNotification: "",
    bigNotification: "",
    state:null,
    loading:false
  };
  
const notificationReducer = (state = initialState, action) => {
    const {payload} = action
    switch (action.type) {
        case SET_SMALL_NOTIFICATION:
            return{
                ...state,
                smallNotification:payload.data
            }
        case DELETE_SMALL_NOTIFICATION:
            return{
                ...state,
                smallNotification:""
            }
        case SET_BIG_NOTIFICATION:
        return{
            ...state,
            bigNotification:payload.data
        }
        case DELETE_BIG_NOTIFICATION:
            return{
                ...state,
                bigNotification:""
            }
        case SET_LOADING:
            return{
                ...state,
                loading:true
            }
        case REMOVE_LOADING:
            return{
                ...state,
                loading:false
            }
        default:
        return state;
    }
}
export default notificationReducer;