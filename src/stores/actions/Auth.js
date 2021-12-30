import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL} from "../types/Auth"
import { loginApi } from "../../api/userApi"
export const login = (form) => {
    return async (dispatch, getState) => {
        try{
            const stateBefore = getState();
            console.log("AuthReducer before dispatch: ", stateBefore.authReducer);
            //Vao trạng thái chờ đăng nhập
            dispatch({
                type:LOGIN_REQUEST
            })
            //Gọi Api
            const result = await loginApi(form);
            const data = result.data;

            const user = {
                accessToken:data.token,
                email:data.account.value.email,
                id:data.account.value.id,
                name:data.account.value.name,
                type:data.account.value.type,
                avatar:data.account.value.avatar,
                active:data.account.value.active,
                address:data.account.value.address,
            }
            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );
            
            setTimeout(() => {
              dispatch({
                  type: LOGIN_SUCCESS,
                  payload: {
                    data: user,
                  },
              });
            }, 1500);
            const stateAfter = getState();
            console.log("AuthReducer before dispatch: ", stateAfter.authReducer);

        } catch (error) {
            console.log(error)
            setTimeout(() => {
              dispatch({
                type: LOGIN_FAIL,
                payload: {
                  error: error.response?.data ? error.response.data : error.message,
                },
              });
            }, 1500);
            
          }
    }
}