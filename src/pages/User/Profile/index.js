import { Grid, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import ProfileForm from '../../../components/User/ProfileForm';
import MyRoom from '../MyRoom';
import { useStyles } from './style';

export default function Profile(){
    const classes = useStyles();
    
    return (
        <Fragment>
            <Grid container spacing={5} >
                <Grid item xs={12} md={4}>
                    <ProfileForm />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant='h6' sx={classes.highLightText}>My room:</Typography>
                    <MyRoom />
                </Grid>
            </Grid>
        </Fragment>
    );
}