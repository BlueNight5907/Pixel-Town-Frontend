import React, { Fragment, useEffect, useState } from 'react';
import { Box, Stack, Button,InputAdornment, TextField } from "@mui/material";
import AvartarWithUploadButton from "../ProfileAvatar";
import { useStyles } from "./style";
import {Link} from "react-router-dom";
import {AccountCircle,GppGood,AlternateEmail,Business,Celebration, ManageAccounts} from "@mui/icons-material"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getUser, updateUser } from '../../../stores/actions/Auth';
import {SET_SMALL_NOTIFICATION} from "../../../stores/types/Notification"
import ChangePasswordDialog from "./ChangePasswordDialog"
const ProfileForm = (props) => {
    const dispatch = useDispatch()
    const {currentUser,loadingUpdateUser} = useSelector(state => state.authReducer)
    const [formData,setFormData] = useState({
        name:"",
        birthday:"1999-01-01",
        address:"",

    })
    const [file,setFile] = useState(null)
    const [openPassDialog,setOpenPassDialog] = useState(false)
    const handleFileChange = (file) => {
        setFile(file)
    }
    const classes = useStyles();
    useEffect(()=>{
        if(!loadingUpdateUser){
            dispatch(getUser())
        }
    },[loadingUpdateUser, dispatch])

    useEffect(()=>{
        console.log(currentUser)
        setFormData({
            name:currentUser?.name,
            birthday:currentUser?.birthday || "1999-01-01",
            address:currentUser?.address,
        })
    },[currentUser])
    const validateUpdate = () =>{
        let error = ""
        if(!formData.name){
            error = "Display name does not empty!!!"
        }
        else if(!formData.birthday){
            error = "Birthday does not empty!!!"
        }
        else if(!formData.address){
            error = "Address does not empty!!!"
        }
        if(error){
            dispatch({
                type:SET_SMALL_NOTIFICATION,
                payload:{
                    data:error
                }
            })
        }
        else{
            updateAccount()
        }

    }
    const updateAccount = ()=>{
        const form = new FormData();
        form.append("name",formData.name)
        form.append("address",formData.address)
        form.append("birthday", formData.birthday.split("-").reverse().join("/"))
        if(file){
            form.append("image", file)
        }
        if(!loadingUpdateUser){
            dispatch(updateUser(form))
        }
    }

    return (
        <Fragment>
            <Box sx={classes.displayForm}>
                <AvartarWithUploadButton src={currentUser?.avatar} onChange={handleFileChange}/>
                <TextField
                    label="Display Name"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <AccountCircle sx={{
                                color:theme => theme.main.btnColor
                            }}/>
                            </InputAdornment>
                        ),
                        fullWidth:true,
                        defaultValue:currentUser?.name,
                        onChange:(e) => setFormData({
                            ...formData,
                            name:e.target.value
                        })
                    }}
                    variant="standard"
                    sx={classes.txtField}
                />
                <TextField
                    label="Email"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <AlternateEmail sx={{
                                color:theme => theme.main.btnColor
                            }}/>
                            </InputAdornment>
                        ),
                        fullWidth:true,
                        readOnly:true,
                        defaultValue:currentUser?.email,
                        type:"email"
                    }}
                    variant="standard"
                    sx={classes.txtField}
                />

                <Stack gap={1} direction="row"
                alignItems="end"
                sx={{width:"100%"}}
                >
                    <TextField
                        label="Password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <GppGood sx={{
                                    color:theme => theme.main.btnColor
                                }}/>
                                </InputAdornment>
                            ),
                            fullWidth:true,
                            defaultValue:"****************",
                            readOnly:true,
                        }}
                        variant="standard"
                        sx={{
                            ...classes.txtField,
                            flexGrow:1
                        }}
                    />
                    <Button variant='contained' onClick = {()=>{setOpenPassDialog(true)}}>
                        Change
                    </Button>
                </Stack>

                <TextField
                    label="Address"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <Business sx={{
                                color:theme => theme.main.btnColor
                            }}/>
                            </InputAdornment>
                        ),
                        fullWidth:true,
                        defaultValue:currentUser?.address,
                        onChange:(e) => setFormData({
                            ...formData,
                            address:e.target.value
                        })
                    }}
                    variant="standard"
                    sx={classes.txtField}
                />
                <TextField
                    label="Birthday"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <Celebration sx={{
                                color:theme => theme.main.btnColor
                            }}/>
                            </InputAdornment>
                        ),
                        fullWidth:true,
                        type:"date",
                        value:formData.birthday,
                        onChange:(e) => {setFormData({
                            ...formData,
                            birthday:e.target.value
                        })
                        console.log(e.target.value)
                        }
                    }}
                    
                    variant="standard"
                    sx={classes.txtField}
                />
                <TextField
                    label="Account Type"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <ManageAccounts sx={{
                                color:theme => theme.main.btnColor
                            }}/>
                            </InputAdornment>
                        ),
                        fullWidth:true,
                        defaultValue:currentUser?.type,
                        readOnly:true
                    }}
                    variant="standard"
                    sx={classes.txtField}
                />
                <Stack direction={"row"} justifyContent="center" gap={2}>
                    <Button variant="outlined"
                    component={Link}
                    to="/" 
                    size='large' color="primary" sx={classes.saveButton}
                    disabled={loadingUpdateUser}>
                        Dashboard
                    </Button>
                    <Button 
                    onClick = {validateUpdate}
                    variant="outlined" size='large' color="success" sx={classes.saveButton}
                    disabled={loadingUpdateUser}>
                        Save
                    </Button>
                </Stack>
            </Box>
            <ChangePasswordDialog open={openPassDialog} setOpen={setOpenPassDialog}/>
        </Fragment>
        
    );
}

export default ProfileForm;