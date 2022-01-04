import { Grid } from '@mui/material'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyRoomCard from '../../components/MyRoomCard';
import { getUserRooms } from '../../stores/actions/Room';

const MyRoom = () => {
    const dispatch = useDispatch()
    const {createdSpaces} = useSelector(state => state.roomReducer)
    useEffect(() => {
        dispatch(getUserRooms("/room/myroom"))
    }, [])
    return (
        <Grid container spacing={4} sx={{
            marginBottom:10
        }}>
            {
            createdSpaces.map((room, i)=>{
                return(
                    <Grid item xs={12} sm={6} md={6} lg={6} key={i}> 
                        <MyRoomCard
                            Id = {room.id}
                            roomName={room.roomName}
                            hostId={room.hostId}
                            desImg="https://media.sketchfab.com/models/9363665ee7b94a16b6aba18a89d70be9/thumbnails/b5c7bc7d6dfe496fac3463b45e535ef8/b4b17aa65e68425ab4aea8db1f136202.jpeg"
                            maxUser={room.quantity}
                            description={room.description}
                            password={room.roomPass}
                            userJoinRoom = {room.userJoinRoom}
                        />
                    </Grid>
                )
            })}
            
        </Grid>
    );
};

export default MyRoom;