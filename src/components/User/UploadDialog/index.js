import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import "./style.css"
import { Grid, IconButton } from '@mui/material';
import { ClearRounded, Close } from '@mui/icons-material';
const useStyles = (fullscreen)=>({
    paper:{
        padding:"10px 20px",
        borderRadius:fullscreen?"0":"20px",
        position:"relative",
    }
})

const CustomDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 20,
              top: 20,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

function UploadDialog({open,handleClose,onFileChange,...other}) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles(fullScreen);
    const fileRef = React.useRef(null)
    const img = React.useRef(null)
    const wrapper = React.useRef(null)
    let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
    const handleFileChange = () => {
        const fileName = document.querySelector(".upload-file-name");
        const file = fileRef.current.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = function(){
            const result = reader.result;
            if(file.name.match(/.(jpg|jpeg|png|gif|jfif|svg)$/i)){
              img.current.src = result;
            }
            wrapper.current.classList.add("active");
            }
            reader.readAsDataURL(file);
        }
        if(fileRef.current.value){
            let valueStore = fileRef.current.value.match(regExp);
            fileName.textContent = valueStore;
        }
        
    }

    const handleClick = ()=>{
        console.log(wrapper.current.classList)
        fileRef.current.click()
    }

    const deleteFile = ()=>{
        img.current.src = "/assets/background/uploadbackground.svg";
        wrapper.current.classList.remove("active");
    }

    const acceptFile = ()=>{
        const file = fileRef.current.files[0];
        if(file){
            onFileChange(file);
            deleteFile();
            handleClose();
        }
    }
  return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        PaperProps={{sx:classes.paper}}
      >
          <CustomDialogTitle onClose={handleClose}>
                Upload File
          </CustomDialogTitle>
        <DialogContent>
            <div className="upload-container">
                <div ref={wrapper} className="upload-wrapper">
                    <div className="image">
                        <img ref={img} src="/assets/background/uploadbackground.svg" alt=""/>
                    </div>
                    <div className="content">
                    <div className="icon">
                        <i className="fas fa-cloud-upload-alt"></i>
                    </div>
                    <div className="upload-text">
                        No file chosen, yet!
                    </div>
                    </div>
                    <IconButton id="upload-cancel-btn" onClick={deleteFile}>
                        <ClearRounded/>
                    </IconButton>
                    <div className="upload-file-name">
                    File name here
                    </div>
                </div>
                <Grid container gap={2}>
                    <button onClick={handleClick} id="upload-custom-btn">Choose a file</button>
                    <button onClick={acceptFile} id="upload-accept-btn">Accept</button>
                </Grid>
                <input ref={fileRef} onChange={handleFileChange} id="upload-default-btn" type="file" hidden/>
            </div>
        </DialogContent>
      </Dialog>
  );
}
export default UploadDialog
