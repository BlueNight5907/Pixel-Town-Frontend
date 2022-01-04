import axios from "axios";
import {BASE_URL} from "../constants/config"
import axiosClient from "./axiosClient"
const instance = axios.create({
    baseURL:BASE_URL
})

export const loginApi = (user) => {
    const path = "/login"
    return instance.post(path, user)
}

export const getUser = (id) => {
    const path = "/account/user/"+id
    return instance.get(path)
}

export const logoutApi = (user) => {
    const path = "/logout"
    return axiosClient.post(path)
}

export const registerApi = (formData) => {
    const form = new FormData()
    Object.keys(formData).forEach(key => {
        form.append(key,formData[key])
    })
    const path = "/register"
    return instance.post(path, form, {headers:{
        'Content-Type': `multipart/form-data; boundary=${form._boundary}`
    }})
}

export const getUserByToken = ()=>{
    return axiosClient.get("/account/token")
}
export const updateAccountApi = (form)=>{
    const path = "/account"
    return axiosClient.put(path, form, {headers:{
        'Content-Type': `multipart/form-data; boundary=${form._boundary}`
    }})
}
export const changePassApi = (data) =>{
    const path = "/account/changepassword"
    return axiosClient.put(path,data)
}