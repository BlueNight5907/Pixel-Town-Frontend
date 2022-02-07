import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Alert } from '@mui/material';
import { changePassApi } from '../../../../api/userApi';
import {LoadingButton} from "@mui/lab"
import { BookmarkAdded } from '@mui/icons-material';

async function fetch(values,setFetch,setError){
  setError("")
  try{
    const {data} = await changePassApi({oldPassword:values.oldPassword,Password:values.Password})
    
    setTimeout(() => {

      setFetch(false)
      if(data.value === true){
        setError("Change password successfully")
      }
    }, 1000);
    console.log(data)
  }
  catch(error){
    console.log(error.response?.data ? error.response.data : error.message)
      setTimeout(() => {
          setFetch(false)
          setError(error.response?.data ? error.response.data.value : error.message)
      }, 1000);
  }
  
}
export default function ChangePasswordDialog({open, setOpen}) {
  const handleClose = () => {
    setOpen(false);
  };
  const [isFetching,setFetching] = React.useState(false)
  const [error,setError] = React.useState(false)
  const [data, setData] = useState({
    oldPassword:"",
    Password:"",
    confirmPassword:""
  })
  const handleSubmit = ()=>{
    let isErr = false
    if(!(data.Password || data.confirmPassword || data.oldPassword)){
      setError("Password does not empty !!!!")
      isErr = true
    }
    else if(data.Password !== data.confirmPassword){
      setError("Password does not match !!!")
      isErr = true
    }
    if(!isErr){
      setFetching(true)
    }
  }
  React.useEffect(() => {
    if(isFetching){
      fetch(data, setFetching, setError)
    }
    return () => {
    }
  }, [isFetching])

  React.useEffect(() => {
    if(error === "Change password successfully"){
      setData({
        oldPassword:"",
        Password:"",
        confirmPassword:""
      })
    }
    return () => {
    }
  }, [error])

  return (
    <Dialog open={open}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change your password in this website, please enter your password and confirm password here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Old Password"
            type="password"
            fullWidth
            variant="standard"
            value={data.oldPassword}
            onChange={(e)=>{
              setData({
                ...data,
                oldPassword:e.target.value
              })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
            value={data.Password}
            onChange={(e)=>{
              setData({
                ...data,
                Password:e.target.value
              })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Confirm Your Password"
            type="password"
            fullWidth
            variant="standard"
            value={data.confirmPassword}
            onChange={(e)=>{
              setData({
                ...data,
                confirmPassword:e.target.value
              })
            }}
          />
          {
            error&&<Alert severity={error==="Change password successfully"?"success":"error"}>{error}</Alert>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
          onClick={handleSubmit} 
          loading={isFetching}
          loadingPosition="start"
          startIcon={<BookmarkAdded/>}>Save Changes</LoadingButton>
        </DialogActions>
      </Dialog>
  );
}