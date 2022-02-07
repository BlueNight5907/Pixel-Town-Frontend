import { Grid, Typography } from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import CarouselItem from '../CarouselItem/CarouselItem';
import { useStyles } from './style';

export default function RoomDetails(data) {
    const {hostName, roomID, images, description} = data;

    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={12}>
                <Carousel>
                    {images.map((item, i) => <CarouselItem key={i} src={item.src} />)}
                </Carousel>
            </Grid>
            <Grid item xs={12}>
                <Typography sx={classes.text}>
                    <b>Hostname: </b>{hostName}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography sx={classes.text}>
                    <b>Room ID: </b>{roomID}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography paragraph sx={classes.text}>
                    <b>Description: </b>{description}
                </Typography>
            </Grid>
        </Grid>
    );
}