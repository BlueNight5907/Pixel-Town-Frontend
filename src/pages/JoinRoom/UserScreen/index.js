import { Paper,Stack, IconButton, Avatar } from '@mui/material'
import React, { useState } from 'react'
import {MicOffRounded, MicRounded, Videocam, VideocamOff} from '@mui/icons-material'
const useStyles = ()=>({
    root:{
        border:theme => '1px solid '+theme.main.bgColor,
        position:"relative",
        width:"100%",
        paddingBottom:"56.25%",
        borderRadius:"10px",
        backgroundColor:theme => theme.main.bgColor,
        "& .video-container":{
            position:'absolute',
            width:"100%",
            height:"100%",
        },
        "&:hover .control-button-group":{
            visibility:"visible"
        },
        "&:hover .mic-off":{
            visibility:"hidden"
        }
    },
    controlBtns:{
        position:"absolute",
        bottom:5,
        width:"100%",
        visibility:"hidden",
        transition:"visibility 0.3s ease-in-out"
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
        height:30
    }
})

function UserScreen() {
    const [micActive,setMicActive] = useState(true)
    const [camActive,setCamActive] = useState(true)
    const classes = useStyles()
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

                <Avatar sx = {classes.avt}/>
            </div>
        </Paper>
    )
}

export default UserScreen