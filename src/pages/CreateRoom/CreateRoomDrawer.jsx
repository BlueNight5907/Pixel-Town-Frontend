import React from 'react';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useStyles, DrawerHeader, InputField, CreateButton } from './style';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import Slider from '@mui/material/Slider';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const CreateRoomDrawer = (props) => {
    const { open, setClose} = props;

    const classes = useStyles();
    return (
        <Drawer //Right drawer
            sx={classes.sideBarRight}
            variant="persistent"
            anchor="right"
            open={open}
            elevation={10}
        >
            <DrawerHeader>
                <Typography ml={2} variant='h5' sx={classes.highLightText}>
                    <b>Create room</b>
                </Typography>
                <IconButton onClick={setClose} sx={classes.closeIcon}>
                    <CloseIcon />
                </IconButton>
            </DrawerHeader>
            <Divider
                variant='middle'
                sx={classes.drawerHeaderDivider}
            />
            <Box sx={classes.displayCreateDetail}>
                <Typography variant='h5' sx={classes.highLightText}>
                    <b>Template name</b>
                </Typography>
                <Typography variant='subtitle2' sx={classes.lowLightText}>
                    Description: Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                </Typography>
                <Box sx={classes.displayTags}>
                    <Typography sx={classes.displayTag}>
                        Executive offices
                    </Typography>
                    <Typography sx={classes.displayTag}>
                        Meeting spaces
                    </Typography>
                    <Typography sx={classes.displayTag}>
                        Home sofa
                    </Typography>
                </Box>
            </Box>
            <Divider
                sx={classes.drawerHeaderDivider}
            />
            <Box
                sx={classes.displayCreateDetail}
                component='form'
                autoComplete='off'
            >
                <Typography variant='h5' sx={classes.highLightText}>
                    <b>Room information</b>
                </Typography>
                <Typography variant='subtitle1' sx={classes.lowLightText}>
                    <b>Name your room: (Appears at the end of URL)</b>
                </Typography>
                <Box sx={classes.displayWarning}>
                    <BoltRoundedIcon />
                    <Typography variant='subtitle2'>
                        <b>Once room's created, room's name cannot be changed.</b>
                    </Typography>
                </Box>
                <InputField
                    required
                    id="outlined-required"
                    label="Room name"
                    defaultValue="My room"
                    placeholder="Room Name"
                />
                <Typography variant='subtitle1' sx={classes.lowLightText}>
                    <b>Set number of guests:</b>
                </Typography>
                <Box sx={classes.displaySlider}>
                    <EmojiPeopleIcon sx={classes.iconWhite}/>
                    <Slider
                        defaultValue={30}
                        valueLabelDisplay="auto"
                        min={2}
                        max={50}
                    />
                </Box>
                <Typography variant='subtitle1' sx={classes.lowLightText}>
                    <b>Set a password: (optional)</b>
                </Typography>
                <InputField
                    id="outlined-required"
                    label="Room password"
                    type="password"
                />
            </Box>
            <CreateButton>
                Create room
            </CreateButton>
        </Drawer>
    );
};

export default CreateRoomDrawer;