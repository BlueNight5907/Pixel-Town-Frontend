import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useStyles, InputField } from './style';
import { Paper, Typography } from '@mui/material';

export default function PasswordFormDialog(props) {
    const { open, setOpen } = props;

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    borderRadius: '12px',
                    backgroundColor: "transparent"
                }
            }}
        >
            <Paper
                sx={classes.root}
            >
                <DialogTitle>Enter room password:</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={classes.contentText}>
                        <Typography mb={2}>This room is protected, please enter room password before join.</Typography>
                        <Typography>If you don't have have password, try to contact the host or pray for it open free!!!</Typography>
                    </DialogContentText>
                    <InputField
                        margin="dense"
                        id="password"
                        label="Room password"
                        type="password"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Enter Room</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Paper>
        </Dialog>

    );
}
