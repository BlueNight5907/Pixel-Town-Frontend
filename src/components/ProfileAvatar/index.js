import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useStyles } from './style';

const Input = styled("input")({
    display: "none",
});
 
const AvartarWithUploadButton = (props) => {
    const { src } = props;

    const classes = useStyles();
    return (
        <Box sx={classes.displayAvatar}>
            <UserAvatar src={src} />
            <Box>
                <Input 
                accept="image/*" 
                id="icon-button-file" 
                type="file" 
                onChange={(e) => {
                    console.log(e.target.files[0]);
                }}/>
                <IconButton 
                    sx={classes.displayUploadButton}
                    aria-label="upload picture"
                    component="span"
                >
                    <PhotoCamera />
                </IconButton>
            </Box>
        </Box>
    );
};

const UserAvatar = styled(Avatar)({
    width: '200px',
    height: '200px',
    alignSelf: 'center',
    border: 'solid 0.5px white',
    "&:hover": {
        cursor: 'pointer'
    }
});

export default AvartarWithUploadButton;