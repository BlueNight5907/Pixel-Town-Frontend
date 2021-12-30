import React from 'react';
import { Button, Card, CardActions, CardMedia, CardHeader, Typography, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/system';
import { Circle, StyledMenu, useStyles } from './style'
import RoomDetailsDialog from '../RoomDetailsDialog';
import RoomDetails from '../RoomDetails';
import {userRoom} from '../../mockData/TestData';

const RoomCard = (props) => {
    // handle Share button
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleShare_Open = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleShare_Close = () => {
        setAnchorEl(null);
    };

    const [openDialog, setOpenDialog] = React.useState(false);
    const { avtSrc, roomName, hostName, desImg, currentUser, maxUser } = props;

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
                avatar={
                    <Avatar
                        sx={classes.avt}
                        src={avtSrc}
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
                            <MenuItem onClick={handleShare_Close}>
                                Get URL
                            </MenuItem>
                            <MenuItem onClick={handleShare_Close} disableRipple>
                                Get Code
                            </MenuItem>
                        </StyledMenu>
                    </Box>
                }
                title={roomName}
                subheader={
                    <Typography variant='subtitle2' color='primary'>{hostName}</Typography>
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
                <Button sx={classes.button} disableElevation size='medium'>Join room</Button>
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
            >
                <RoomDetails hostName={userRoom.hostName} roomID={userRoom.roomID} images={userRoom.images} description={userRoom.description} />
            </RoomDetailsDialog>
        </Card>
    );
};

export default RoomCard