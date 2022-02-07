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
import { useNavigate } from 'react-router-dom';

export default function PasswordFormDialog(props) {
    const { open, setOpen, password, to } = props;
    const navigate = useNavigate()
    const [passEnter,setPassEnter] = React.useState("")
    const [error,setError] = React.useState("")
    const handleClose = () => {
        setOpen(false);
    };
    const handleSumbmitPassword = ()=>{
        console.log(password, passEnter);
        if(password === passEnter){
            handleClose()
            navigate(to)
        }
        else{
            setError("Wrong password!! Please try again.")
        }
        
    }

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
                        This room is protected, please enter room password before join.
                    </DialogContentText>
                    <DialogContentText sx={classes.contentText}>
                        If you don't have have password, try to contact the host or pray for it open free!!!
                    </DialogContentText>
                    <br/>
                    <InputField
                        margin="dense"
                        id="password"
                        label="Room password"
                        type="password"
                        fullWidth
                        value={passEnter}
                        onChange={(e)=>{setPassEnter(e.target.value)
                            if(e.target.value.length === 0){
                                setError("")
                            }
                        }}
                    />
                    {error&&(
                        <Typography sx={{
                            mt:2,
                            ml:1,
                            color:"#ff5151"
                        }}>
                            {error}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSumbmitPassword} disabled={passEnter.length>0?false:true}>Enter Room</Button>
                </DialogActions>
            </Paper>
        </Dialog>

    );
}
