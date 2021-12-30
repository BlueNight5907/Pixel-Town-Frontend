import { AppBar, Avatar, Menu, MenuItem, Toolbar, Typography, Divider, ListItemIcon, InputBase, Stack, IconButton, Drawer, MenuList, Button, Paper, ListItemAvatar, ListItemText, Collapse, List } from "@mui/material";
import { AccountCircle, Settings, Logout, Palette, Search, Close, ArrowForwardIos } from '@mui/icons-material';
import React, { Fragment } from "react";
import { Box, styled } from "@mui/system";
import CustomizedHeaderButton from './CustomizedHeaderButton';
import { Link, NavLink, useLocation } from "react-router-dom";
import useStyles from "./style";
import bars from "./bars.png"
const headerMenu = [
    {
        name:'Dashboard',
        href:'/',
        img:'/assets/icons/home.svg',
    },
    {
        name:'Explore',
        href:'/explore',
        img:'/assets/icons/explore.png',
    },
    {
        name:'My rooms',
        href:'/myroom',
        img:'/assets/icons/gamer.png',
    },
    {
        name:'Create room',
        href:'/room/create',
        img:'/assets/icons/plus.png',
    }
]

const DrawerItem = (props)=>{
    const { data, ...other } = props;
    const [open,setOpen] = React.useState(false);
    const url = useLocation().pathname;
    let active = false;
    if(url.split('/')[0] === data.href.split('/')[0]){
        active = true
    }
    const hasSubmenu = data.subMenu?true:false;
    const addHref = ()=>{
        return!hasSubmenu?{to:data.href}:{className:active?'active':''}
    }
    return(
        <li>
            <MenuItem component={hasSubmenu?'div':NavLink} {...addHref()}
            {...other}
            onClick ={()=>{setOpen(open => !open)}}
            style={{gap:15}}>
                <ListItemAvatar style={{
                    minWidth:'unset'
                }}>
                    <Avatar variant='square'
                    style={{
                        width:24,
                        height:24
                    }}
                    src={data.img}/>
                </ListItemAvatar>
                <ListItemText>
                    {data.name}
                </ListItemText>
                {hasSubmenu&&<ArrowForwardIos className={open?'active':''}/>}
            </MenuItem>
            {hasSubmenu&&(
            <Collapse in={open} className='submenu'>
                <List>
                    {data.subMenu.map((e,i)=>(
                        <li key={i}>
                            <MenuItem component={NavLink} to={e.href}>
                                {e.name}
                            </MenuItem>
                        </li>
                    ))}
                </List>
            </Collapse>
            )}
        </li>
    )
}


const SearchBar = styled('div')(({ theme }) => ({
    position: 'relative',
    marginRight: 16,
    borderRadius: 20,
    backgroundColor: '#01101B',
    '&:hover': {
        backgroundColor: '#717CB470',
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 0,
            '&:focus': {
                width: '40ch',
            },
        },
    },
}));

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDrawer, setOpenDrawer] = React.useState(false)


    const handleDrawerOpen = () => {
        setOpenDrawer(true);
      };
      const handleDrawerClose = () => {
        setOpenDrawer(false);
      };
    
    //classes M-UI
    const classes = useStyles()

    const handleMenu_Open = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenu_Close = () => {
        setAnchorEl(null);
    }
    return (
    <Fragment>
        <AppBar
            position='sticky'
            component='header'
            sx={{
                marginBottom: 3,
                backgroundColor: '#011627',
                borderBottom: '#084d81 3px solid'
            }}
        >
            <Toolbar>
                <Button sx={classes.menuButton} onClick={handleDrawerOpen}>
                    <img style={{height:16,width:22}} src={bars} alt="Logo" />
                </Button>
                <Typography
                    variant='h5'
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    Pixel Town
                </Typography>
                <Stack spacing={2} direction="row" sx={{ 
                    mr: 2,
                    display:{
                        xs:"none",
                        md:"none",
                        lg:"flex"
                    }
                }}>
                    <CustomizedHeaderButton component={Link} to="/explore" variant='text'>Explore</CustomizedHeaderButton>
                    <CustomizedHeaderButton component={Link} to="/myroom" variant="text" disableElevation>My Rooms</CustomizedHeaderButton>
                    <CustomizedHeaderButton component={Link} to="/room/create" variant="text" disableElevation>Create Room</CustomizedHeaderButton>
                </Stack>
                <SearchBar sx={{
                    display:{
                        md:"block",
                        xs:"none"
                    }
                }}>
                    <SearchIconWrapper>
                        <Search />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder='Enter code or room name'
                    />
                </SearchBar>

                <CustomizedHeaderButton sx={{
                    paddingLeft:{xs:"unset",md:"10px"},
                    paddingRight:{xs:"unset",md:"7px"}
                }} onClick={handleMenu_Open}>
                    <Typography
                        variant='button'
                        color='#4BABFF'
                        mr={2}
                        sx={{
                            display:{
                                xs:"none",
                                md:"block",
                            }
                        }}
                    >
                        Nguyen Huynh Tat Dat
                    </Typography>
                    <Avatar
                        sx={{
                            width: 36,
                            height: 36,
                            bgcolor: '#c792ea'
                        }}
                    >
                        TD
                    </Avatar>
                </CustomizedHeaderButton>
                
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenu_Close}
                    onClick={handleMenu_Close}
                    PaperProps={{
                        elevation: 1,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            minWidth: 200,
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 43,
                                width: 10,
                                height: 10,
                                bgcolor: 'white',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem>
                        <ListItemIcon>
                            <AccountCircle fontSize="small" />
                        </ListItemIcon>
                        Account
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Palette fontSize="small" />
                        </ListItemIcon>
                        Edit Character
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>

            </Toolbar>
        </AppBar>
        <Drawer
                anchor='right'
                open={openDrawer}
                transitionDuration={300}
                PaperProps={{sx:classes.drawerPaper}}
                onClose={handleDrawerClose}
            >
                <Box sx={classes.drawerHeader}>
                    <Typography component='h3' variant='h6'>
                        Pixel Town
                    </Typography>
                    <IconButton
                    style={{
                        position:'absolute',
                        right:8,
                        top:10,
                        color:'#fff'
                    }}
                    onClick={handleDrawerClose}>
                        <Close/>
                    </IconButton>
                </Box>
                <Paper elevation={4} square sx={classes.drawerUser}>
                    <Avatar
                    sx={{
                        flexShrink:0
                    }}
                    src='/assets/users/rewards_login.webp'
                    />
                    <Typography>
                        Mở khóa các ưu đãi và lợi ích tuyệt vời
                    </Typography>
                    <Button component={Link} to='/login'>
                        Login / Register 
                    </Button>
                </Paper>

                <MenuList sx={classes.drawerMenu}>
                    {
                        headerMenu.map((e,i)=>(
                            <DrawerItem data={e} key={i}/>
                        ))
                    }
                </MenuList>
                
            </Drawer>
    </Fragment>
    );
};

export default Header