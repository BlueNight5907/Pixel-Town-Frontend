import { Paper,Stack, IconButton, Avatar } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'
import {MicOffRounded, MicRounded, Videocam, VideocamOff} from '@mui/icons-material'
import { useSelector } from 'react-redux'
import {ASP_APP_FOLDER} from "../../../../constants/config"
const useStyles = ()=>({
    root:{
        border:theme => '1px solid '+theme.main.bgColor,
        position:"absolute",
        right:10,
        bottom:10,
        width:150,
        height:100,
        borderRadius:"10px",
        overflow:"hidden",
        backgroundColor:theme => theme.main.bgColor,
        "& .video-container":{
            position:'relative',
            width:"inherit",
            height:"inherit",
        },
        "&:hover .control-button-group":{
            visibility:"visible"
        },
        "&:hover .mic-off":{
            visibility:"hidden"
        },
        "& video":{
            position:"absolute",
            width:"100%",
            height:"100%",
            zIndex:5,
            top:"0",
            left:"0",
        }
    },
    controlBtns:{
        position:"absolute",
        bottom:5,
        width:"100%",
        visibility:"hidden",
        transition:"visibility 0.3s ease-in-out",
        zIndex:10
    },
    micOff:{
        position:"absolute",
        top:5,
        left:5,
        color:"#de3336",
        fontSize:"18px",
        visibility:"visible",
    },
    avt:{
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%,-50%)",
        width:30,
        height:30,
        zIndex:7
    }
})
const getListOfVideoInputs = async () => {
    // Get the details of audio and video output of the device
    const enumerateDevices = await navigator.mediaDevices.enumerateDevices();

    //Filter video outputs (for devices with multiple cameras)
    return enumerateDevices.filter((device) => device.kind === "videoinput");
  };
const initializeMedia = async (videoScreen,camActive,micActive) => {

    if (!("mediaDevices" in navigator)) {
      navigator.mediaDevices = {};
    }

    if (!("getUserMedia" in navigator.mediaDevices)) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        var getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        if (!getUserMedia) {
          return Promise.reject(new Error("getUserMedia Not Implemented"));
        }

        return new Promise((resolve, reject) => {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    //Get the details of video inputs of the device
    const videoInputs = await getListOfVideoInputs();
    console.log(videoInputs)
    //The device has a camera
    if (videoInputs.length) {
      navigator.mediaDevices
        .getUserMedia({
            video: camActive?{ width: 1280, height: 720,aspectRatio:{exact:3/2} }:camActive,
            audio:micActive?{noiseSuppression:true}:camActive?false:true
        })
        .then((stream) => {
          if(videoScreen){videoScreen.srcObject = stream}
          else{
            stream.getTracks().forEach(function(track) {
                track.stop();
            });
          };
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("The device does not have a camera");
    }
  };
function SmallScreen() {
    const {currentUser} = useSelector(state => state.authReducer)
    const [micActive,setMicActive] = useState(true)
    const [camActive,setCamActive] = useState(true)
    const videoRef = useRef(null)
    const classes = useStyles()
    useEffect(() => {
        if(camActive){
            initializeMedia(videoRef.current,camActive,micActive)
        }
        return ()=>{
            initializeMedia(null,false,false)
        }
    }, [camActive,micActive])
    return (
        <Paper sx = {classes.root} elevation ={3}>
            <div className="video-container">
                {!micActive&&<MicOffRounded className="mic-off" sx={classes.micOff}/>}

                <Stack sx = {classes.controlBtns} 
                className = "control-button-group"
                justifyContent="center"
                alignItems="center" spacing={1}
                direction="row">
                    <IconButton size="small"
                    sx = {{
                        color:micActive?"rgb(6, 214, 160)":"#fff",
                    }}
                    onClick = {()=> setMicActive(s => !s)}>
                        {
                            micActive?<MicRounded fontSize="small"/>:<MicOffRounded fontSize="small"/>
                        }
                    </IconButton>
                    <IconButton 
                    sx = {{
                        color:camActive?"rgb(6, 214, 160)":"#fff",
                    }}
                    size="small"  color="inherit" onClick = {()=> setCamActive(s => !s)}>
                        {
                            camActive?<Videocam fontSize="small"/>:<VideocamOff fontSize="small"/>
                        }
                    </IconButton>
                </Stack>

                {!camActive?(
                    <Avatar sx = {classes.avt}
                    src={ASP_APP_FOLDER + currentUser.avatar || "/public/users/u3.png"}
                    />
                ):(
                    <video autoPlay ref={videoRef} muted>

                    </video>
                )}

                

            </div>
        </Paper>
    )
}

export default SmallScreen
