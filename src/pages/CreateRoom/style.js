import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { Button, TextField } from '@mui/material';
import { borderRadius } from '@mui/system';

const leftDrawer = 240;
const rightDrawer = 450;

export const InputField = styled(TextField)({
    "& .MuiInputLabel-root": {
        color: '#4BABFF',
    },
    "&:hover .MuiInputLabel-root": {
        color: '#DEE2E5'
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#ECEEEF",
        fontWeight: 'bold',
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: '#4BABFF',
            color: '#4BABFF',
        },
        "&:hover fieldset": {
            borderColor: "#DEE2E5",
            borderWidth: "2px",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#ECEEEF",
            borderWidth: "3px"
        },
        "&.Mui-focused .MuiOutlinedInput-input": {
            color: '#ECEEEF'
        }
    },
    "& .MuiOutlinedInput-input": {
        color: '#4BABFF',
        "&:hover": {
            color: '#DEE2E5'
        },
    },
    marginBottom: '14px',
});

export const CreateButton = styled(Button)({
    position: 'relative',
    color: '#3DDB84',
    backgroundColor: 'transparent',
    border: 'solid 2px #3DDB84',
    borderRadius: '20px',
    margin: '18px' 
});

export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        marginTop:80,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${leftDrawer-50}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 20,
        }),
    }),
);

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${leftDrawer}px)`,
        marginLeft: `${leftDrawer}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export const useStyles = () => ({
    box: {
        display: 'flex',
    },
    header: {
        position: 'fixed',
        marginBottom: 3,
        backgroundColor: '#011627',
        borderBottom: '#084d81 3px solid'
    },
    menuIcon: {
        mr: 2,
    },
    sideBarLeft: {
        width: leftDrawer,
        '& .MuiDrawer-paper': {
            width: leftDrawer,
            boxSizing: 'border-box',
            backgroundColor: '#001E3C',
        },
    },
    sideBarRight: {
        '& .MuiDrawer-paper': {
            width: rightDrawer,
            boxSizing: 'border-box',
            backgroundColor: '#001E3C',
        },
    },
    drawerHeaderDivider: {
        borderBottom: '#084d81 2px solid'
    },
    drawerListItem: {
        display: 'flex',
        ml: 4,
        color: '#B2BAC2',
        //alignItems: 'center',
        //justifyContent: 'center'

    },
    normalText: {
        color: '#B2BAC2',
        fontSize: '14px',
        mb: 1
    },
    highLightText: {
        color: 'white',
        mb: 1
    },
    lowLightText: {
        color: '#DEE2E5',
        mb: 2
    },
    listItemButton: {
        mx: 2,
        borderRadius: '8px',
        '&:hover': {
            backgroundColor: '#00000044',
            '& .text': {
                color: '#ECEEEF',
            }
        },
    },
    backButton: {
        mb: 2,
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    groupTemplate: {
        mt: 2,
        width: {
            xs: '100%',
            md: '75%',
            lg: '60%'
        }
    },
    closeIcon: {
        position: 'absolute',
        right: 8,
        top: 12,
        color: '#FFFFFF'
    },
    displayTags: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        width: '100%',
        px: 1
    },
    displayTag: {
        color: '#BE9AF6',
        fontSize: '15px',
        fontWeight: 'bold',
        lineHeight: '1.8',
    },
    displayCreateDetail: {
        position: 'relative',
        padding: '18px 18px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    displayWarning: {
        fontWeight: '200',
        fontSize: '10px',
        lineHeight: '18px',
        color: 'rgb(255, 218, 86)',
        margin: '0px 0px 13px',
        display: 'flex',
        alignItems: 'center',
    },
    displaySlider: {
        margin: '0px 0px 13px',
        display: 'flex',
        alignItems: 'center',
    },
    iconWhite: {
        color: 'white',
        mr: 2
    }
});