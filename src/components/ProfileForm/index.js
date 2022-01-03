import React, { useEffect, useState } from 'react';
import { Box, Button, Divider } from "@mui/material";
import AvartarWithUploadButton from "../ProfileAvatar";
import { InputField, useStyles } from "./style";

const ProfileForm = (props) => {
    const {data} = props;
    
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        birthday:"",
        address:"",
        about:""
    })
    const classes = useStyles();
    return (
        <Box sx={classes.displayForm}>
            <AvartarWithUploadButton src="https://i.imgur.com/t5ImUu6.gif"/>
            <InputField
                label="Name"
                fullWidth
                defaultValue={data?.name}
                onChange={(e) => setFormData({
                    ...formData,
                    name:e.target.value
                })}
            />
            <InputField
                label="Email"
                fullWidth
                defaultValue={data?.email}
                onChange={(e) => setFormData({
                    ...formData,
                    email:e.target.value
                })}
            />
            <InputField
                label="Birthday"
                fullWidth
                defaultValue={data?.birthday}
                onChange={(e) => setFormData({
                    ...formData,
                    birthday:e.target.value
                })}
            />
            <InputField
                label="Address"
                fullWidth
                defaultValue={data?.address}
                onChange={(e) => setFormData({
                    ...formData,
                    address:e.target.value
                })}
            />
            <InputField
                label="About me"
                multiline
                defaultValue={data?.about}
                placeholder=""
                rows={6}
                fullWidth
                onChange={(e) => setFormData({
                    ...formData,
                    about:e.target.value
                })}
            />
            <Button variant="outlined" size='large' color="success" style={classes.saveButton}>
                Save
            </Button>
        </Box>
    );
}

export default ProfileForm;