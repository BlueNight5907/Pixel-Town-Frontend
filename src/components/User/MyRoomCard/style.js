import { Menu } from '@mui/material';
import { styled } from '@mui/system';

export const Circle = styled('div')({
    marginRight: '10px',
    height: '12px',
    width: '12px',
    backgroundColor: '#3DDB84',
    borderRadius: 50,
    display: 'inline-block'
});

export const StyledMenu = styled((props) => (
    <Menu
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 8,
        minWidth: 120,
        color: 'rgb(55, 65, 81)',
        boxShadow: 4 /*'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',*/
    },
}));

export const useStyles = () => ({
    root: {
        width: '100%',
        position: 'relative',
        display: "block",
        alignItems: 'center',
        borderRadius: '10px',
        boxShadow:"unset"
    },
    theme: {
        border: '#132F4C 2px solid',
        background: '#001E3C',
        color: '#ffffff',
    },
    cardSharingAction: {
        position: 'absolute',
        top: 2,
        right: 2,
        borderRadius: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        '&:hover':{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        '&:hover .MuiButtonBase-root .MuiSvgIcon-root': {
            color: '#4BABFF',
        }
    },
    cardHeader: {
        position: 'absolute',
        padding: '5px 14px',
        top: 0,
        left: 0,
    },
    cardAction: {
        padding: '0px 12px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    avt: {
        width: 36,
        height: 36,
        position: 'relative'
    },
    icon: {
        color: 'white',
    },
    button: {
        borderRadius: 20,
        padding: '5px 20px'
    },
    media: {
        height: '200px'
    }
});