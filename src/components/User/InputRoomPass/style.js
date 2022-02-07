import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const useStyles = () => ({
    root:{
        backgroundColor: '#011627',
        color: 'white',
    },
    contentText:{
        color: '#ECEEEF',
    }
});

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
});