import { ArrowBackIos } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ConnectionContext } from '../../../Context/ConnectionProvider'

import { messages } from '../../../mockData/users'

const MessageInput = ({emojiObject})=>{
    const [message,setMessage] = useState("")
    const {useSignalR} = useContext(ConnectionContext)
    const {sendShortMessage} = useSignalR
    useEffect(()=>{
        if(emojiObject){
            setMessage(mess => mess + emojiObject.emoji)
        }   
    },[emojiObject])

    const handleChange = (event)=>{
        setMessage(event.target.value)
    }

    const sendMessage = ()=>{
        sendShortMessage(message)
        setMessage("")
    }

    return(
        <Stack flexDirection="row"
        alignItems="center"
        sx={{
            backgroundColor:"#fff",
            padding:0.5,
            borderRadius:4,
            "& input":{
                border:"none",
                outline:"none",
                paddingLeft:1,
                height:"100%",
                paddingRight:1,
                fontSize:14,
                fontWeight:500
            }
        }}>
            <input type="text" style={{flexGrow:1}} onChange = {handleChange} value={message}/>
            <Button
            sx={{
                textTransform:"capitalize",
                margin:0,
                borderRadius:3,
                background:"rgb(6, 214, 160)",
                transition:"background 0.2s ease-in-out",
                color:"#000",
                height:30,
                '&:hover':{
                    background:"rgb(81,226,189)"
                },
                marginTop:"0!important",
            }}
            disabled = {message.length <= 0}
            onClick = {sendMessage}
            >Send</Button>
        </Stack>
    )
}

const useStyles =()=>({
    root:{
        height:"inherit",
        backgroundColor:"inherit",
        display:"flex",
        flexDirection:"column",
    },
    title:{
        padding:"10px",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        color:"#fff",
        flexGrow:0,
        flexShrink:0,
        

    },
    listMsg:{
        flexGrow:1,
        backgroundColor:"inherit",
        display:"flex",
        flexDirection:"column",
        gap:"10px",
        overflowX:"hidden",
        overflowY:"auto",
        padding:"0 5px",
        "&::-webkit-scrollbar": {
            width: '5px',
            borderRadius:"10px"
        },  
        "&::-webkit-scrollbar-track": {
            background: "rgba(255,255,255,0.9)",
            borderRadius:"10px"
          },
           
        "&::-webkit-scrollbar-thumb": {
            background: theme => theme.main.bgColor,
            borderRadius:"10px"
        }, 
        "&::-webkit-scrollbar-thumb:hover ":{
            background: theme => theme.main.btnColor
        }
    },
    bottomBox:{
        padding:"0 5px 10px",
        color:"#fff",
        flexGrow:0,
        flexShrink:0,
        
    }
})

const MessageBox = ({data,...other})=>{
    const {userID, message, userImg, name} = data
    const myID = 1
    const tranProps = ()=>{
        return (userID !== myID)?{
            alignItems:"start",
            sx:{
                "& .time-span":{
                    marginLeft:"45px"
                }
            }
        }:{
            alignItems:"end"
        }
    }

    const getClass = ()=>{
        return (userID !== myID)?{
            "& .message-box":{
                gap:1,
                "& .message-detail":{
                    fontSize:"13px",
                    fontWeight:"500",
                    textAlign:"justify",
                    padding:1,
                    borderRadius:2,
                    backgroundColor:"#fff",
                    maxWidth:"80%"
                },
                "& .avt":{
                    width:35,
                    height:35
                }
            }
            
        }:{
            padding:1,
            borderRadius:"20px 5px 5px 20px",
            backgroundColor:theme => theme.main.btnColor,
            "& .message-detail":{
                fontSize:"13px",
                fontWeight:"500",
                textAlign:"justify"
            },
            maxWidth:"80%"
        }
    }

    return(
        <Grid container sx={{
            width:"100%"
        }} {...tranProps()} flexDirection="column">
            <Grid item sx ={{...getClass()}}>
                {
                    userID !== myID?(
                        <>
                            <Typography className="user-name" 
                            sx={{
                                marginBottom:1,
                                marginLeft:0.5,
                                textTransform:"capitalize"
                            }}
                            color="white" variant="body2">
                                {name}
                            </Typography>
                            <Grid container className="message-box">
                                <Avatar 
                                src={userImg}
                                className="avt"/>
                                <Typography className="message-detail">
                                    {message}
                                </Typography>
                            </Grid>
                        </>
                        
                    ):(
                    <>
                        <Typography className="message-detail">
                            {message}
                        </Typography>
                    </>
                    )
                } 
            </Grid>
            <Grid item>
                <Typography className="time-span" color="white" component="span" variant="caption">
                    {new Date().toLocaleString()}
                </Typography>
            </Grid>
        </Grid>
    )
}


function ChatPanel({close}) {
    const classes = useStyles()
    return (
        <Paper sx={classes.root} square>
            <Box className="panel-title" sx={classes.title}>
                <Typography component={"h3"} variant='h6'>
                    Chats
                </Typography>
                <ArrowBackIos onClick={close}/>
            </Box>

            <Paper sx={classes.listMsg} square elevation={0}>
                {
                    messages.map((data,i)=>{
                        return(
                            <MessageBox key={i} data={data}/>
                        )
                    })
                }
                
            </Paper>

            <Box sx={classes.bottomBox}>
                <Typography variant="caption" component={"p"} sx={{
                    paddingLeft:1,
                    paddingBottom:0.5,
                    marginTop:0.5,
                    borderTop:"2px solid rgb(81,226,189)"
                }}>
                    Enter your message
                </Typography>
                <MessageInput/>
            </Box>
        </Paper>
    )
}

export default ChatPanel
