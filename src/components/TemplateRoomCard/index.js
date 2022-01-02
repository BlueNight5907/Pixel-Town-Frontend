import React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useStyles } from './style';

const TemplateRoomCard = (props) => {
    const theme = useTheme();

    const { name, source, description, onClick } = props;

    const classes = useStyles();

    return (
        <Card sx={classes.root} onClick={onClick}>
                <CardMedia
                    component="img"
                    sx={classes.media}
                    image={source}
                />
                <CardContent sx={classes.cardContent}>
                    <Typography component="div" variant="h5" sx={classes.templateName}>
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" sx={classes.templateDescription}>
                        {description}
                    </Typography>
                </CardContent>
        </Card>
    );
};

export default TemplateRoomCard;
