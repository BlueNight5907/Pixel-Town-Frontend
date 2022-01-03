import { Search } from '@mui/icons-material';
import { Button, Grid, InputBase, styled, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import RoomCard from '../../components/RoomCard';
import { getExploreRooms, getUserRooms} from '../../stores/actions/Room';

const StyledButton = styled(Button)({
    
    padding:"10px 20px",
    border:"none",
    borderRadius:"18px",
    color:"rgba(255,255,255,0.7)",
    "&:hover":{
        backgroundColor:"rgb(102 106 129)",
        color:'#fff'
    },
    textTransform:"capitalize"
})
const FilterButton = ({name, onClick, selected, index})=>{
    return(
        <StyledButton sx={{
            backgroundColor:index===selected?"rgb(84, 92, 143)":"inherit",
            color:index===selected&&"#fff"
        }}
        onClick={()=> onClick(index)}
        >{name}</StyledButton>
    )
}
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 0,
            '&:focus': {
                width: '40ch',
            },
        },
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const SearchBar = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 20,
    backgroundColor: '#717CB470',
    '&:hover': {
        backgroundColor: '#717CB470',
    },
    marginLeft: 0,
    width: '100%',
    color:"#fff",
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const pathMap = {"/":"/room/myroom","/explore":"/room"}
const UserDashboard = () => {
    const {pathname} = useLocation()
    const dispatch = useDispatch()
    const [selected,setSelected] = useState(0)
    const {allSpaces, joinedSpaces, createdSpaces, worldRooms} = useSelector(state => state.roomReducer)
    const [rooms, setRooms] = useState([])
    console.log(worldRooms)
    useEffect(()=>{
        if(pathname === "/"){
            setSelected(0)
            console.log("fetch myroom")
            dispatch(getUserRooms(pathMap[pathname]))
        }
        else if(pathname === "/explore"){
            setSelected(3)
            console.log("fetch world")
            dispatch(getExploreRooms(pathMap[pathname]))
        }
    },[pathname,dispatch])

    useEffect(()=>{
        switch(selected){
            case 0:
                setRooms(allSpaces)
                break
            case 1:
                setRooms(joinedSpaces)
                break
            case 2:
                setRooms(createdSpaces)
                break
            default:
                setRooms(worldRooms)
        }
    },[selected,allSpaces,joinedSpaces,createdSpaces,worldRooms])

    const filter = (index)=>{
        setSelected(index)
    }


    return (
        <Fragment>
            {pathname === "/"?(<Box sx={{
                width:"100%",
                marginBottom:"24px",
                display:"flex",
                justifyContent:"end",
                flexWrap:"wrap",
                gap:1
            }}>
                <FilterButton index={0} selected={selected} onClick={filter}  name="All Spaces"/>
                <FilterButton index={1} selected={selected} onClick={filter} name="Joined Spaces"/>
                <FilterButton index={2} selected={selected} onClick={filter} name="Created Spaces"/>
            </Box>
            ):(
                <Box sx={{
                    width:"100%",
                    marginBottom:"24px",
                    display:"flex",
                    justifyContent:"space-between",
                    flexWrap:"wrap",
                    alignItems:"center",
                    gap:1,
                }}>
                    <Typography sx={{
                        color:"#fff",
                        fontSize:16,
                        fontWeight:600,
                        marginLeft:2
                    }}>
                        World Explore
                    </Typography>
                    <SearchBar sx={{
                        display:{
                            md:"none",
                            xs:"block"
                        }
                    }}>
                        <SearchIconWrapper>
                            <Search color='info'/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder='Enter code or room name'
                        />
                    </SearchBar>
                </Box>
            )}

            <Grid container spacing={2} sx={{
            marginBottom:10
            }}>
                {
                    rooms.map((room,i)=>{
                        return(
                            <Grid key={i} item xs={12} sm={6} md={6} lg={4} xl = {3}>
                                <RoomCard
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
                    })
                }
            </Grid>
        </Fragment>
    );
};

export default UserDashboard;