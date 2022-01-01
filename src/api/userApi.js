import axios from "axios";
import {BASE_URL} from "../constants/config"
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
    return instance.post(path)
}