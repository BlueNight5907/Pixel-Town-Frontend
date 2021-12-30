import React, { useContext, useState } from 'react';
import { ConnectionContext } from '../../Context/ConnectionProvider';
import { useEffect } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import { Delete, Send } from '@mui/icons-material';
import { Link } from 'react-router-dom';
function Home() {
    const {useSignalR} = useContext(ConnectionContext)
    const {signalR} = useSignalR
    const [roomID, setRoomID] = useState("");
    const [username, setUserName] = useState("");
    const [character, setCharacter] = useState("");
    const [roomName, setRoomName] = useState("");

    const [roomCreate, setRoomCreate] = useState(null);
    useEffect(()=>{
        let claim = false
        if(signalR){
            signalR.on("created", data =>{
                setRoomCreate(data)
            });
            signalR.on("joined",  data =>{
                console.log(data)
            })
            signalR.on("allroom",  data =>{
                console.log(data)
            })
        }

        if(claim){
            signalR.off("created")
            signalR.off("joined")
            signalR.off("allroom")
        }
        return claim = true
    },[signalR])

    const createRoom = ()=>{
        signalR.invoke("CreateRoom",roomName)

    }
    const joinRoom = ()=>{
        signalR.invoke("Join",roomID, username, character);

    }

    const allRoom = ()=>{
        signalR.invoke("GetAllRoom")

    }

    return (
        <Box
        sx={{
            width: 500,
            maxWidth: '100%',
            marginLeft:2
        }}
        >
            <br/>
            <Stack direction="column" spacing={2}>
                <TextField fullWidth onChange={(e)=>{setRoomID(e.target.value)}} value={roomID} label="Room ID" id="fullWidth" />
                <TextField fullWidth onChange={(e)=>{setUserName(e.target.value)}} value={username} label="User Name" id="fullWidth" />
                <TextField fullWidth onChange={(e)=>{setCharacter(e.target.value)}} value={character} label="Character" id="fullWidth" />
                <TextField fullWidth onChange={(e)=>{setRoomName(e.target.value)}} value={roomName} label="Room Name" id="fullWidth" />
            </Stack>
            
            <br/>
            <br/>
            <Stack direction="row" spacing={2}>
                <Button onClick={createRoom} variant="contained" color='success' endIcon={<Send />}>
                    Create
                </Button>

                <Button  onClick={joinRoom} variant="contained" endIcon={<Send />}>
                    Join
                </Button>

                <Button variant="outlined" color="info" startIcon={<Delete/>}>
                    Delete
                </Button>

                <Button onClick={allRoom} variant="outlined" color="info" startIcon={<Delete/>}>
                    Get All
                </Button>
            </Stack>

            <br/>
            {roomCreate&&(<Link to={"/room/"+roomCreate}>Goto Room {roomCreate}</Link>)}
        </Box>
    )
}

export default Home
