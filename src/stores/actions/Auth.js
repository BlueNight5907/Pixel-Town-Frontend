import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, REGISTER_REQUEST, REGISTER_FAIL, REGISTER_SUCCESS, GET_USER_REQUEST, GET_USER_FAIL, GET_USER_SUCCESS, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL} from "../types/Auth"
import { getUserByToken, loginApi, logoutApi, registerApi, updateAccountApi } from "../../api/userApi"

export const login = (form) => {
    return async (dispatch, getState) => {
        try{
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

        } catch (error) {
            console.log(error.response?.data ? error.response.data : error.message)
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


export const logout = () => {
  return async (dispatch) => {
      try{
          //Gọi Api
          const result = await logoutApi();
          const data = result.data;
          localStorage.removeItem(
            "user"
          );
          dispatch({
            type:LOGOUT
          })

      } catch (error) {
          console.log(error)
        }
  }
}

export const register = (form) => {
  return async (dispatch, getState) => {
      try{
          //Vao trạng thái chờ đăng nhập
          dispatch({
              type:REGISTER_REQUEST
          })
          //Gọi Api
          const {data} = await registerApi(form);

          setTimeout(() => {
            dispatch({
              type: REGISTER_SUCCESS,
              payload: {
                data:data.value,
              },
            });
          }, 1500);
          

      } catch (error) {
          console.log(error.response?.data ? error.response.data : error.message)
          setTimeout(() => {
            dispatch({
              type: REGISTER_FAIL,
              payload: {
                error: error.response?.data ? error.response.data.value : error.message,
              },
            });
          }, 1500);
          
        }
  }
}

export const getUser = ()=>{
  return async (dispatch,getState) => {
    //Vao trạng thái chờ đăng nhập
    dispatch({
      type:GET_USER_REQUEST
    })
    try{
      const {currentUser} = getState().authReducer;
      const {data} = await getUserByToken()
      let birthday = data.birthday.split("T")[0]
      const user = {
        ...currentUser,
        ...data,
        birthday
      }
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );
      setTimeout(() => {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: {
            data: user,
          },
        });
      }, 1000);

  } catch (error) {
      console.log(error.response?.data ? error.response.data : error.message)
      setTimeout(() => {
        dispatch({
          type: GET_USER_FAIL,
          payload: {
            error: error.response?.data ? error.response.data.value : error.message,
          },
        });
      }, 1500);
      
    }
  }
}

export const updateUser = (form)=>{
  return async (dispatch,getState) => {
    //Vao trạng thái chờ đăng nhập
    dispatch({
      type:UPDATE_USER_REQUEST
    })
    try{
      await updateAccountApi(form);
      setTimeout(() => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: {},
        });
      }, 1000);

  } catch (error) {
      console.log(error.response?.data ? error.response.data : error.message)
      setTimeout(() => {
        dispatch({
          type: UPDATE_USER_FAIL,
          payload: {
            error: error.response?.data ? error.response.data.value : error.message,
          },
        });
      }, 1500);
      
    }
  }
}