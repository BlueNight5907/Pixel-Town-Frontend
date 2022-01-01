import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { DELETE_SMALL_NOTIFICATION } from '../../stores/types/Notification';

export default function NotificationDialog() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const {smallNotification} = useSelector(state => state.notificationReducer)
  const handleClose = () => {
    setOpen(false);
    dispatch({type:DELETE_SMALL_NOTIFICATION})
  };
  React.useEffect(() => {
      if(smallNotification){
        setOpen(true)
      }
  }, [smallNotification])
  return (
    <div>
      <Dialog open={open} PaperProps={{
        sx:{
          minWidth:{xs:300,sm:400},
          borderRadius:3,
          backgroundColor: theme => theme.main.bgColor,
          color:"#fff"
        }
      }}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText color="inherit">
            {smallNotification}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}