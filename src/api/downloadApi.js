import {ASP_APP_FOLDER} from "../constants/config"
import fileDownload from 'js-file-download'
import axios from "axios"
const instance = axios.create({
    baseURL:ASP_APP_FOLDER
})

export const downloadFile = (url,name)=>{
    instance.get(url,{
        responseType: 'blob',
        headers: {
            "Access-Control-Allow-Origin":"*",
        },
        
    }).then((res)=>{
        fileDownload(res.data, name)
    })
}