import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardMedia, CardHeader, Typography, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/system';
import { Circle, StyledMenu, useStyles } from './style'
import RoomDetailsDialog from '../RoomDetailsDialog';
import RoomDetails from '../RoomDetails';
import PasswordFormDialog from '../InputRoomPass';
import { userRoom } from '../../../mockData/TestData';
import { useSelector } from 'react-redux';
import { getUser } from '../../../api/userApi';
import { ASP_APP_FOLDER } from '../../../constants/config';
import { Link } from 'react-router-dom';
import UpdateRoomDialog from 'src/components/UpdateRoomDialog';

const MyRoomCard = (props) => {
    const { roomInfor,description,roomName, hostId, desImg, maxUser , Id, password, userJoinRoom} = props;
    const {currentUser} = useSelector(state => state.authReducer)
    const [hostInfor, setHostInfor] = useState({
        hostName:"Loading"
    })
    const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
    const [numberUser,setNumberUser] = React.useState(0);
    // handle Share button
    const [anchorEl, setAnchorEl] = React.useState(null);
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

    useEffect(() => {
        let isFetching = true
        async function fetching(){
            const {data} = await getUser(hostId)
            if(isFetching){
                data&&setHostInfor({
                    hostName:data.name
                })
            }
        }
        fetching()
        return () => {
            isFetching = false
        }
    }, [hostId])

    // for details dialog
    const [openDialog, setOpenDialog] = React.useState(false);

    const classes = useStyles();
    return (
        <Card
            elevation={0}
            sx={{
                ...classes.root,
                ...classes.theme
            }}
        >
            <CardHeader
                sx={classes.cardHeader}
                title={
                    <Typography 
                        variant='subtitle2'
                        sx={{
                            padding: '5px 10px',
                            border: '1px white',
                            borderRadius: '20px',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        }}
                    >
                        {roomName}
                    </Typography>
                }
            />
            <Box sx={classes.cardSharingAction}>
                <IconButton
                    onClick={handleShare_Open}
                >
                    <ShareIcon
                        fontSize='small'
                        sx={classes.icon}
                    />
                </IconButton>
                <StyledMenu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleShare_Close}
                >
                    <MenuItem onClick={handleShare_Close}>
                        Get URL
                    </MenuItem>
                    <MenuItem onClick={handleShare_Close} disableRipple>
                        Get Code
                    </MenuItem>
                </StyledMenu>
            </Box>
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
                    component={Link}
                    to={`/room/join/${Id}`}>
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
                setOpenUpdateDialog={setOpenUpdateDialog}
                title={roomName}
                to={`/room/join/${Id}`}
                hostId={hostId}
            >
                <RoomDetails hostName={hostInfor.hostName} roomID={Id} images={userRoom.images} description={description} />
            </RoomDetailsDialog>
            {
                hostId === currentUser?.id&&(
                    <UpdateRoomDialog open={openUpdateDialog}
                    roomInfor={roomInfor}
                    setOpen={setOpenUpdateDialog}/>
                )
            }
        </Card>
    );
};

export default MyRoomCard;