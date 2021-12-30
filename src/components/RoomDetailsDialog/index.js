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

const RoomDetailsDialog = (props) => {
    const { title, children, openDialog, setOpenDialog } = props;

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
                borderRadius:5,
                backgroundColor:"transparent"
            }}}
        >
            <Paper sx={classes.paperRoot}>
                <DialogTitle>
                    {title}
                    <IconButton onClick={handleClose} sx={classes.closeIcon}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Divider variant='middle' />
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button sx={{
                        minWidth:150,
                        borderRadius:5,
                        "&:hover":{
                            color:theme => theme.main.btnColor
                        }
                    }} autoFocus onClick={handleClose}>
                        Join
                    </Button>
                </DialogActions>
            </Paper>
        </Dialog>
    );
}

export default RoomDetailsDialog;