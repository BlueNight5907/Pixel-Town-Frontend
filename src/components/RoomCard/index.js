import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardMedia, CardHeader, Typography, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/system';
import { Circle, StyledMenu, useStyles } from './style'
import RoomDetailsDialog from '../RoomDetailsDialog';
import RoomDetails from '../RoomDetails';
import PasswordFormDialog from '../InputRoomPass';
import {userRoom} from '../../mockData/TestData';
import { ASP_APP_FOLDER, MAIN_URL } from '../../constants/config';
import { getUser } from '../../api/userApi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RoomCard = (props) => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const {currentUser} = useSelector(state => state.authReducer)
    const [hostInfor, setHostInfor] = useState({
        hostName:"Loading",
        avtSrc:"/assets/users/u40.jfif"
    })
    const { description,roomName, hostId, desImg, maxUser , Id, password, userJoinRoom} = props;
    // handle Share button
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [numberUser,setNumberUser] = React.useState(0);
    const handleShare_Open = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleShare_Close = () => {
        setAnchorEl(null);
    };

    useEffect(()=>{
        let hasUser = false;
        let length = userJoinRoom?.length
        for(let i = 0;i < length ;i++){
            if(userJoinRoom[i].userId === currentUser.id){
                hasUser = true
                break
            }
        }
        if(hasUser){
            setNumberUser(length)
        }
        else{
            setNumberUser(length + 1)
        }
    },[userJoinRoom])
    // for enter room password
    const [openPassForm, setOpenPassForm] = React.useState(false);


    const coppyRoomCode = ()=>{
        navigator.clipboard.writeText(Id)
    }

    const coppyRoomUrl = ()=>{
        navigator.clipboard.writeText(MAIN_URL+"/room/"+Id)
    }
    const classes = useStyles();

    const withPassType = ()=>{
        if(password){
            return{
                onClick:() => {
                    setOpenPassForm(password&&true);
                }
            }
        }
        return {
            component:Link,
            to:`/room/join/${Id}`
        }
    }
    

    useEffect(() => {
        let isFetching = true
        async function fetching(){
            const {data} = await getUser(hostId)
            if(isFetching){
                data&&setHostInfor({
                    hostName:data.name,
                    avtSrc:data.avatar?ASP_APP_FOLDER+data.avatar:"/assets/users/u40.jfif"
                })
            }
        }
        fetching()
        return () => {
            isFetching = false
        }
    }, [hostId])
    return (
        <Card
            elevation={0}
            sx={{
                ...classes.root,
                ...classes.theme
            }}
        >
            <CardHeader
                avatar={
                    <Avatar
                        sx={classes.avt}
                        src={hostInfor.avtSrc}
                    />
                }
                action={
                    <Box>
                        <IconButton
                            onClick={handleShare_Open}
                        >
                            <ShareIcon
                                sx={classes.icon}
                            />
                        </IconButton>
                        <StyledMenu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleShare_Close}
                        >
                            <MenuItem onClick={()=>{
                                handleShare_Close()
                                coppyRoomUrl()
                            }}>
                                Get URL
                            </MenuItem>
                            <MenuItem onClick={()=>{
                                handleShare_Close()
                                coppyRoomCode()
                            }} disableRipple>
                                Get Code
                            </MenuItem>
                        </StyledMenu>
                    </Box>
                }
                title={roomName}
                subheader={
                    <Typography variant='subtitle2' color='primary'>{hostInfor.hostName}</Typography>
                }
                sx={classes.cardHeader}
            />
            <CardMedia
                style={classes.media}
                image={desImg}
            />

            <CardActions
                sx={classes.cardAction}
            >
                <Typography variant='subtitle2'>
                    <Circle /> {numberUser}/{maxUser}
                </Typography>

                <Button
                    sx={classes.button}
                    disableElevation
                    size='medium'
                    {
                        ...withPassType()
                    }
                    >
                    
                    Join room
                </Button>

                <IconButton
                    size='medium'
                    onClick={() => setOpenDialog(true)}
                >
                    <MoreVertIcon sx={classes.icon} />
                </IconButton>
            </CardActions>
            <RoomDetailsDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                title={roomName}
                Id={Id}
                {...withPassType()}
            >
                <RoomDetails hostName={hostInfor.hostName} roomID={Id} images={userRoom.images} description={description} />
            </RoomDetailsDialog>
            {password&&(
            <PasswordFormDialog
                open={openPassForm}
                setOpen={setOpenPassForm}
                password={password}
                to={`/room/join/${Id}`}
            />)}
        </Card>
    );
};

export default RoomCard