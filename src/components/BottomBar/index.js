import { ArrowBackIosNewRounded, ChatBubbleOutlineRounded, Mood, Settings } from '@mui/icons-material';
import { Avatar, Paper, Stack, Badge, Typography, Button, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useContext, useEffect, useState } from 'react'
import Picker from 'emoji-picker-react'
import {ConnectionContext} from '../../Context/ConnectionProvider'
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

const MessageBox = (props)=>{
    const [open,setOpen] = useState(false)
    const [chosenEmoji,setChosenEmoji] = useState(null)
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
      };
    return(
        <Paper sx ={{
            position:"absolute",
            bottom:'110%',
            right:"50%",
            width:"100%",
            transform:"translateX(50%)",
            padding:"2px 5px 5px",
            display:"flex",
            flexDirection:"column",
            borderRadius:"20px",
            color:"#fff",
            backgroundColor: theme => theme.main.bgColor
        }} elevation={2}>
            <Stack 
            sx = {{margin:"0 5px 2px"}}
            direction = "row" alignItems="center" justifyContent = "space-between">
                <Typography variant = "body2">
                    Chat Icons
                </Typography>
                <IconButton size="small" color="inherit" onClick = {()=> setOpen(s => !s)}>
                    <ArrowBackIosNewRounded fontSize = "small" sx = {{
                        transform:open?"rotate(90deg)":"rotate(-90deg)"
                    }}/>
                </IconButton>
            </Stack>
            {
                open&&<Picker pickerStyle={{width:"100%",boxShadow:"none",marginBottom:16}} onEmojiClick={onEmojiClick}/>
            }
            <MessageInput emojiObject={chosenEmoji}/>
        </Paper>
    )
}
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(1)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.0)',
        opacity: 0,
      },
    },
  }));
const useStyles = ()=>({
    root:{
        padding:"5px 5px",
        position:"fixed",
        bottom:10,
        left:'50%',
        transform:"translateX(-50%)",
        borderRadius:'30px',
        minWidth:300,
        backgroundColor:theme => theme.main.bgColor,
        color:"#fff"
    },
    userBtn:{
        '&:hover':{
            backgroundColor:"rgba(255,255,255,0.3)"
        },
        textTransform:"capitalize",
        display:"flex",
        flexDirection:"column",
        alignItems:"start",
        padding:"0px 10px",
        maxWidth:120,
        overFlow:"hidden"
    }
})



function BottomBar() {
    const classes = useStyles()
    const [openMessBox,setOpenMessBox] = useState(false)
    const handleMessIconClick = () =>{
        setOpenMessBox(state => !state)
    }
    return (
        <Paper sx={classes.root} elevation={3}>
            <Stack spacing={0.5} alignItems="center" direction="row">
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar sx ={classes.avatar}/>
                </StyledBadge>
                <Button color ="inherit" sx={classes.userBtn}>
                    <Typography 
                    sx ={{
                        fontSize:12
                    }}
                    variant="body2" component="span">
                        Nguyễn Văn Huy
                    </Typography>
                    <Typography 
                    sx ={{
                        color:"rgba(255, 255, 255, 0.7)",
                        fontSize:10
                    }}
                    variant="caption" component="span">
                        Online
                    </Typography>
                </Button>
                <IconButton color="inherit">
                    <Settings/>
                </IconButton>
                <IconButton color="inherit" onClick = {handleMessIconClick}>
                    <ChatBubbleOutlineRounded/>
                </IconButton>
                <IconButton color="inherit">
                    <Mood/>
                </IconButton>
            </Stack>
            {
                openMessBox&&<MessageBox/>
            }



        </Paper>
    )
}

export default BottomBar
