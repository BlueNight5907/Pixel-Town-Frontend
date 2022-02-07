import { ArrowBackIos } from '@mui/icons-material'
import { Avatar, Box, Button, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ConnectionContext } from '../../../../Context/ConnectionProvider'
import {useDispatch, useSelector} from "react-redux"
import { getMessages } from '../../../../stores/actions/JoinRoom'
import { ADD_NEW_MESSAGE } from '../../../../stores/types/JoinRoom'
import { ASP_APP_FOLDER, MAIN_URL } from '../../../../constants/config'
import { useRef } from 'react'
const MessageInput = ({emojiObject})=>{
    const [message,setMessage] = useState("")
    const {useSignalR} = useContext(ConnectionContext)
    const {sendLongMessage, signalR} = useSignalR
    const dispatch = useDispatch()
    useEffect(()=>{
        if(emojiObject){
            setMessage(mess => mess + emojiObject.emoji)
        }   
    },[emojiObject])

    useEffect(()=>{
        if(signalR){
            signalR.off("UserSendLongMessage")
            signalR.on("UserSendLongMessage",(data)=>{
                if(!data?.time){
                    return
                }
                dispatch({
                    type:ADD_NEW_MESSAGE,
                    payload:{
                        data:data
                    }
                })
            })
        }   
    },[signalR])

    const handleChange = (event)=>{
        setMessage(event.target.value)
    }

    const sendMessage = ()=>{
        sendLongMessage(message)
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
        position:"relative",
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
    const {userId, message, avatar, time, name} = data
    const {currentUser} = useSelector(state => state.authReducer)
    const myID = currentUser?.id
    const tranProps = ()=>{
        return (userId !== myID)?{
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
        return (userId !== myID)?{
            "& .message-box":{
                gap:1,
                "& .message-detail":{
                    fontSize:"13px",
                    fontWeight:"500",
                    textAlign:"justify",
                    padding:1,
                    borderRadius:2,
                    backgroundColor:"#fff",
                    maxWidth:"80%",
                    
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
                textAlign:"justify",
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
                    userId !== myID?(
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
                                src={avatar?ASP_APP_FOLDER+avatar:MAIN_URL+"/assets/users/u16.jfif"}
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
                    {new Date(time).toLocaleString()}
                </Typography>
            </Grid>
        </Grid>
    )
}


function ChatPanel({close}) {
    const {messages, roomInfor} = useSelector(state => state.joinRoomReducer)
    const dispatch = useDispatch();
    const messageList = useRef(null);
    const lastAnchor =  useRef(null);
    const lastMessage = useRef(null);
    const [fetchMess, setFetchMess] = useState(false)
    const scrollToBottom = () => {
        return lastAnchor.current.scrollIntoView({ behavior: "smooth" });
    }
    const scrollToMessPosition = (position)=>{
        let childs = messageList.current.childNodes
        if(!childs || childs.length === 0 ){
            return
        }
        let childLength = childs.length
        let scrollHeight = 0
        for(let i = 0;i<childLength;i++){
            if(childLength - i - 1 < position){
                break
            }
            scrollHeight += childs[i].scrollHeight
        }
        messageList.current.scrollTop = scrollHeight
    }
    const handleScroll= (e)=>{
        const top = e.target.scrollTop === 0
        
        if(top){
            setFetchMess(true)
            lastMessage.current = e.target.childElementCount
        }
    }

    useEffect(() => {
        let timeOut
        if(fetchMess){
            timeOut = setTimeout(() => {
                setFetchMess(false)
                clearTimeout(timeOut)
            }, 2000);
            dispatch(getMessages(roomInfor.id, messages.at(0)?.time))

        }
    }, [fetchMess])

    useEffect(()=>{
        if(roomInfor?.hostId != null && messages?.length === 0){
            setFetchMess(true)
            dispatch(getMessages(roomInfor.id, Date.now()))
            let timeOut = setTimeout(() => {
                setFetchMess(false)
                clearTimeout(timeOut)
            }, 1000);
        }
    },[])

    useEffect(()=>{
        if(!fetchMess){
            scrollToBottom()
        }
        else{
            let messageLength = messages.length
            if(messageLength > 0 && lastMessage.current){
                scrollToMessPosition(lastMessage.current)
            }
        }
    },[messages])

    const classes = useStyles()
    return (
        <Paper sx={classes.root} square>
            {
                fetchMess&&(
                    <Paper sx={{
                        position:"absolute",
                        top:50,
                        left:0,
                        padding:1,
                        width:"100%",
                        zIndex:101,
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        gap:1,
                        color:"#0d978f",
                        backgroundColor:"rgba(255,255,255,0.8)"
                    }}>
                        <CircularProgress size={30} sx={{
                            color:"#24b53a"
                        }} />
                        <Typography color="inherit">
                            Loading old message...
                        </Typography>
                    </Paper>
                )
            }
            <Box className="panel-title" sx={classes.title}>
                <Typography component={"h3"} variant='h6'>
                    Chats
                </Typography>
                <ArrowBackIos onClick={close}/>
            </Box>

            <Paper onScroll={handleScroll}
            sx={classes.listMsg} ref={messageList} square elevation={0}>
                
                {
                    messages.map((data,i)=>{
                        return(
                            <MessageBox key={i} data={data}/>
                        )
                    })
                }
                <div ref={lastAnchor}/>
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
