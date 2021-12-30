import React from 'react';
import { styled } from '@mui/system';
import { Paper } from '@mui/material';

const useStyles = ()=>({
    root:{
        width:'100%',
        position:'relative',
        height:{md:'30vh',xs:"200px"},
        backgroundColor:'transparent'
    },    
});

const Image = styled('img')({
    position:'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'100%',
    objectFit:'cover',
    zIndex:1,
});

export default function CarouselItem({src}){
    const classes = useStyles()
    return (
        <Paper elevation={0} sx={classes.root}>
            <Image src={src} />
        </Paper>
    )
};