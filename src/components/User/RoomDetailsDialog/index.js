import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useStyles } from './style';
import { Divider, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RoomDetailsDialog = (props) => {
    
    const { setOpenUpdateDialog,title, children, openDialog, setOpenDialog, onClick, to, hostId} = props;
    const {currentUser} = useSelector(state => state.authReducer)
    const navigate = useNavigate()
    const handleClose = () => {
        setOpenDialog(false);
    };
    const classes = useStyles();
    return (
        <Dialog
            fullWidth
            maxWidth='sm'
            onClose={handleClose}
            open={openDialog}
            sx={classes.root}
            PaperProps={{sx:{
                borderRadius:2,
                backgroundColor:"transparent"
            }}}
        >
            <Paper sx={classes.paperRoot}>
                <DialogTitle sx={classes.dialogTitle}>
                    {title}
                    <IconButton onClick={handleClose} sx={classes.closeIcon}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Divider variant='middle' />
                <DialogContent sx={classes.dialogContent}>
                    {children}
                </DialogContent>
                <DialogActions>
                    {
                        hostId === currentUser?.id&&(
                            <Button 
                            size='large'
                            sx={{
                                minWidth:100,
                                borderRadius:5,
                                padding:1,
                                height:"unset",
                                color:"rgb(52, 125, 235)",
                                "&:hover":{
                                    color:theme => theme.main.btnColor,
                                    backgroundColor:"rgba(235, 64, 52,0.6)"
                                }
                            }} autoFocus 
                            onClick={()=>{
                                setOpenUpdateDialog(true)
                                handleClose()
                            }}>
                                Edit
                            </Button>
                        )
                    }


                    <Button 
                    size='large'
                    sx={{
                        minWidth:100,
                        borderRadius:5,
                        padding:1,
                        height:"unset",
                        "&:hover":{
                            color:"rgb(52, 125, 235)"
                        }
                    }} autoFocus 
                    
                    onClick={()=>{
                        if(onClick){
                            onClick()
                        }
                        else{
                            navigate(to)
                        }
                    }}>
                        Join
                    </Button>
                </DialogActions>
            </Paper>
        </Dialog>
    );
}

export default RoomDetailsDialog;