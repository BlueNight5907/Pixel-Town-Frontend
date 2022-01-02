import React, { useEffect, useState } from 'react';
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
import {useDispatch} from "react-redux";
import {createRoom} from "../../stores/actions/Room.js"
const CreateRoomDrawer = (props) => {

    const { open, setClose, data} = props;
    const dispatch = useDispatch();
    const [formData,setFormData] = useState({
        mapId:data?.tid,
        roomName:"",
        roomPass:"",
        description:"",
        quantity:0
    })


    const classes = useStyles();
    useEffect(() => {
       if(data){
        setFormData({
            ...formData,
            mapId:data.tid,
            quantity:data.max
        })
       }
    //eslint(react-hooks/exhaustive-deps)
    }, [data])
    const handleSubmitForm = async ()=>{
        console.log(formData)
        dispatch(createRoom(formData))
        setClose()
        setFormData({
            mapId:data?.tid,
            roomName:"",
            roomPass:"",
            description:"",
            quantity:0
        })
    }
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
                    <b>{data?.name}</b>
                </Typography>
                <Typography variant='subtitle2' sx={classes.lowLightText}>
                    Description: {data?.des}
                </Typography>
                <Box sx={classes.displayTags}>
                    {
                        data?.tags?.map((e,i)=>{
                            return(
                                <Typography key={i} sx={classes.displayTag}>
                                    {e.tag}
                                </Typography>
                            )
                        })
                    }
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
                    label="Room name"
                    defaultValue="My room"
                    placeholder="Room Name"
                    onChange={(e) => setFormData({
                        ...formData,
                        roomName:e.target.value
                    })}
                />
                <Typography variant='subtitle1' sx={classes.lowLightText}>
                    <b>Set number of guests:</b>
                </Typography>
                <Box sx={classes.displaySlider}>
                    <EmojiPeopleIcon sx={classes.iconWhite}/>
                    <Slider
                        defaultValue={30}
                        valueLabelDisplay="auto"
                        min={data?.min}
                        max={data?.max}
                        onChange={(e) => setFormData({
                            ...formData,
                            quantity:e.target.value
                        })}
                    />
                </Box>
                <Typography variant='subtitle1' sx={classes.lowLightText}>
                    <b>Describe your room:</b>
                </Typography>
                <InputField
                    id="outlined-required"
                    label="Description"
                    multiline
                    onChange={(e) => setFormData({
                        ...formData,
                        description:e.target.value
                    })}
                />
                <Typography variant='subtitle1' sx={classes.lowLightText}>
                    <b>Set a password: (optional)</b>
                </Typography>
                <InputField
                    id="outlined-required"
                    label="Room password"
                    type="password"
                    onChange={(e) => setFormData({
                        ...formData,
                        password:e.target.value
                    })}
                />
            </Box>
            <CreateButton onClick={handleSubmitForm} disabled={formData.roomName===""?true:false}>
                Create room
            </CreateButton>
        </Drawer>
    );
};

export default CreateRoomDrawer;