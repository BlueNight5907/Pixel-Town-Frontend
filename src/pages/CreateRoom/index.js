import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemText from '@mui/material/ListItemText';
import { useStyles, Main, AppBar, DrawerHeader } from './style';
import { Button, ListItemButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { templates } from '../../mockData/TestData'
import TemplateRoomCard from '../../components/TemplateRoomCard';
import CreateRoomDrawer from './CreateRoomDrawer';
import { Link } from 'react-router-dom';

export default function CreateRoom() {

    // Left drawer
    const [leftOpen, setLeftOpen] = React.useState(false);

    const handleLeftOpen = () => {
        setLeftOpen(true);
    };

    const handleLeftClose = () => {
        setLeftOpen(false);
    };

    // Right drawer
    const [rightOpen, setRightOpen] = React.useState(false);

    const handleRightOpen = () => {
        setRightOpen(true);
    };

    const handleRightClose = () => {
        setRightOpen(false);
    };

    // Select template item list
    const [selectedIndex, setSelectedIndex] = React.useState('0');

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const classes = useStyles();

    return (
        <Box sx={classes.box}>
            <AppBar
                open={leftOpen}
                sx={classes.header}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        onClick={leftOpen === false ? handleLeftOpen : handleLeftClose}
                        edge="start"
                        sx={classes.menuIcon}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Pixel Town
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer // Left drawer
                sx={classes.sideBarLeft}
                variant="persistent"
                anchor="left"
                open={leftOpen}
                elevation={10}
            >
                <DrawerHeader>
                    <Typography ml={2} variant='h6' sx={classes.highLightText}>
                        <b>Templates</b>
                    </Typography>
                </DrawerHeader>
                <Divider
                    variant='middle'
                    sx={classes.drawerHeaderDivider}
                />
                <List>
                    {templates.map((template) => (
                        <ListItemButton
                            key={template.id}
                            selected={selectedIndex === template.id}
                            onClick={(event) => handleListItemClick(event, template.id)}
                            sx={classes.listItemButton}
                        >
                            <ListItemText
                                className='text'
                                primary={template.type}
                                sx={classes.drawerListItem} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <CreateRoomDrawer // Right drawer
                open={rightOpen}
                setClose={handleRightClose}
            />
            <Main open={leftOpen}>
                <Button
                    sx={classes.backButton}
                    component={Link}
                    to = "/"
                >
                    <ArrowBackIosIcon fontSize='small' />
                    Back to dashboard
                </Button>
                <Typography variant='h5' sx={classes.highLightText}>
                    <b>Select a template</b>
                </Typography>
                {templates.map((template, key) => {
                    const Category = () => (
                        <Typography my={2} variant='h6' sx={classes.lowLightText}>
                            <b>{template.type}</b>
                        </Typography>
                    );
                    const { templateRooms } = template;
                    console.log(templateRooms);
                    return (
                        <Fragment
                            key={key}
                        >
                            <Category />
                            <Box sx={classes.groupTemplate}>
                                {templateRooms && templateRooms.map((room, index) => {
                                    return (
                                        <TemplateRoomCard
                                            onClick={handleRightOpen}
                                            name={room.name}
                                            source={room.src}
                                            description={room.des}
                                            key={index}
                                        />
                                    )
                                })}
                            </Box>
                        </Fragment>
                    )
                })}
            </Main>
        </Box>
    );
}
