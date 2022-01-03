import { styled } from '@mui/material/styles';
import { TextField } from "@mui/material";

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

export const useStyles = () => ({
    saveButton: {
        borderRadius: '50px',
        marginTop: '10px',
    },
    displayForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
});