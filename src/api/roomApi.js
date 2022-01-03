import { BASE_URL } from "../constants/config"
import axiosClient from "./axiosClient"
export const getMyRooms = (path)=>{
    return axiosClient.get(BASE_URL+path)
}
export const getWorldRooms = (path)=>{
    return axiosClient.get(BASE_URL+path)
}

export const createRoomApi = (formData)=>{
    const form = new FormData();
    Object.keys(formData).forEach(key => {
        form.append(key,formData[key])
    })
    console.log(form)
    const path = "/room"
    return axiosClient.post(path,form, {headers:{
        'Content-Type': `multipart/form-data; boundary=${form._boundary}`
    }})
}
export const joinRoomApi = (roomId,CharacterID)=>{
    const path = "/room/"+roomId
    return axiosClient.post(BASE_URL+path,{CharacterID})
}

export const getMessagesApi = (roomId, time) => {
    const path = `/messages/${roomId}/${time}`
    return axiosClient.get(path)
}

export const userInRoomApi = (roomId) => {
    const path = "/room/people/"+roomId
    return axiosClient.get(path)
}