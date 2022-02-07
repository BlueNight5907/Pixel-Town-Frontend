import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useStyles } from './style';
import { ASP_APP_FOLDER } from '../../../constants/config';
import {useRef, useState, useEffect} from "react"
const Input = styled("input")({
    display: "none",
});
 
const AvartarWithUploadButton = (props) => {
    const { src, onChange } = props;
    const classes = useStyles();
    const fileRef = useRef(null);
    const [imgSrc,setImgSrc] = useState();
    const handleChangeProfileImg = (e)=>{
        const file = fileRef.current.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = function(){
            const result = reader.result;
            setImgSrc(result);
            }
            reader.readAsDataURL(file);
            onChange(file);
        }
    }

    useEffect(() => {
        setImgSrc(ASP_APP_FOLDER + src)
    }, [src])
    return (
        <Box sx={classes.displayAvatar}>
            <UserAvatar src={imgSrc || ASP_APP_FOLDER + "/public/users/u3.png"} />
            <Box>
                <Input 
                accept="image/*" 
                id="icon-button-file" 
                type="file"
                ref = {fileRef}
                onChange = {handleChangeProfileImg}
                />
                <IconButton 
                    sx={classes.displayUploadButton}
                    aria-label="upload picture"
                    component="span"
                    onClick = {()=>{
                        fileRef.current.click()
                    }}
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