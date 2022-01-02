import React from 'react';
import { Button, Card, CardActions, CardMedia, CardHeader, Typography, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/system';
import { Circle, StyledMenu, useStyles } from './style'
import RoomDetailsDialog from '../RoomDetailsDialog';
import RoomDetails from '../RoomDetails';
import PasswordFormDialog from '../InputRoomPass';
import { userRoom } from '../../mockData/TestData';

const MyRoomCard = (props) => {
    // handle Share button
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleShare_Open = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleShare_Close = () => {
        setAnchorEl(null);
    };

    // for details dialog
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
                    <Circle /> {currentUser}/{maxUser}
                </Typography>
                <Button
                    sx={classes.button}
                    disableElevation
                    size='medium'
                    onClick={() => {
                        console.log('click');
                    }}>
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
            >
                <RoomDetails hostName={userRoom.hostName} roomID={userRoom.roomID} images={userRoom.images} description={userRoom.description} />
            </RoomDetailsDialog>
        </Card>
    );
};

export default MyRoomCard;