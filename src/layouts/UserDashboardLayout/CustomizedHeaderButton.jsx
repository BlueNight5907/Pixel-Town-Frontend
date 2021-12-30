import { styled } from '@mui/material/styles';
import { Button } from "@mui/material";

const CustomizedHeaderButton = styled(Button)((({ theme }) =>({
    //backgroundColor: '#202331',
    borderRadius: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    padding: '8px 20px',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
        backgroundColor: '#717CB470',

    },
})));

export default CustomizedHeaderButton