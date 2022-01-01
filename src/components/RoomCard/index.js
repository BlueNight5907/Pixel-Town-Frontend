import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardMedia, CardHeader, Typography, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/system';
import { Circle, StyledMenu, useStyles } from './style'
import RoomDetailsDialog from '../RoomDetailsDialog';
import RoomDetails from '../RoomDetails';
import {userRoom} from '../../mockData/TestData';
import { BASE_URL, MAIN_URL } from '../../constants/config';
import { getUser } from '../../api/userApi';
import { Link } from 'react-router-dom';

const RoomCard = (props) => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [hostInfor, setHostInfor] = useState({
        hostName:"Loading",
        avtSrc:"/assets/users/u40.jfif"
    })
    const { description,roomName, hostId, desImg, currentUser, maxUser , Id} = props;
    // handle Share button
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleShare_Open = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleShare_Close = () => {
        setAnchorEl(null);
    };

    const coppyRoomCode = ()=>{
        navigator.clipboard.writeText(Id)
    }

    const coppyRoomUrl = ()=>{
        navigator.clipboard.writeText(MAIN_URL+"/room/"+Id)
    }
    const classes = useStyles();

    useEffect(() => {
        let isFetching = true
        async function fetching(){
            const {data} = await getUser(hostId)
            if(isFetching){
                data&&setHostInfor({
                    hostName:data.name,
                    avtSrc:data.avatar?BASE_URL+data.avatar:"/assets/users/u40.jfif"
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
                    <Circle /> {currentUser}/{maxUser}
                </Typography>
                <Button sx={classes.button} component={Link} to={`/room/join/${Id}`} disableElevation size='medium'>Join room</Button>
                <IconButton
                    size='medium'
                    onClick={() => setOpenDialog(true)}
                >
                    <MoreVertIcon sx={classes.icon} />
                </IconButton>
            </CardActions>
            <RoomDetailsDialog
                openDialog = {openDialog}
                setOpenDialog = {setOpenDialog}
                title = {roomName}
                Id={Id}
            >
                <RoomDetails hostName={hostInfor.hostName} roomID={Id} images={userRoom.images} description={description} />
            </RoomDetailsDialog>
        </Card>
    );
};

export default RoomCard