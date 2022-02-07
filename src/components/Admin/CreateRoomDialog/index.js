import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Alert, Card, CardMedia, Grid, Slider,Typography } from '@mui/material';
import {LoadingButton} from "@mui/lab"
import { BookmarkAdded } from '@mui/icons-material';
import { styled } from '@mui/system';
import { ASP_APP_FOLDER } from 'src/constants/config';
import { templates } from 'src/mockData/TestData';
import { createRoomApi } from 'src/api/roomApi';
const PrettoSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

async function fetch(values,setFetch,setError,setLoading){
  setError("")
  setLoading(true)
  try{
    const {data} = await createRoomApi(values)
    
    setTimeout(() => {
      setFetch(false)
      setLoading(false)
      setError("Create room successfully")
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
const RoomTemplate = ({room, setDataChange, id, selected})=>{
  React.useEffect(() => {
    id === selected && setDataChange(room,id)
  }, [])
  return(
    <Grid
    sx={{
      cursor:"pointer",
    }}
    item xs={6} onClick={() =>setDataChange && setDataChange(room, id)}>
      <Card sx={{ 
        maxWidth: 345,
        backgroundColor: theme => id === selected?theme.main.bgColor:"#fff",
        color: theme => id === selected?theme.main.btnColor:"#000",
      }}
      elevation={id === selected?10:0}
      >
        <CardMedia
          component="img"
          height="140"
          image={room.src}
          alt="green iguana"
        />
        <Typography textAlign="center" 
        variant="caption" component="div">
            {room.name}
        </Typography>
      </Card>
    </Grid>
  )
}
export default function CreateRoomDialog({open, setOpen,setLoading}) {
  const handleClose = () => {
    setOpen(false);
  };
  const [isFetching,setFetching] = React.useState(false)
  const [error,setError] = React.useState(false)
  const [selected,setSelected] = React.useState(1)
  const [mapInfor,setMapInfor] = React.useState({})
  const [data, setData] = useState({
    mapId:0,
    quantity:1,
    roomName:"",
    roomPass:"",
    description:""
  })

  const handleSelected = (room, index)=>{
    setMapInfor(room)
    setSelected(index)
    setData({
      ...data,
      mapId:room.tid
    })
  }
  const handleSubmit = ()=>{
    let isErr = false
    if(!(data.roomName)){
      setError("Room name does not empty !!!!")
      isErr = true
    }
    if(!isErr){
      setFetching(true)
    }
  }
  React.useEffect(() => {
    if(isFetching){
      fetch(data, setFetching, setError,setLoading)
    }
    return () => {
    }
  }, [isFetching])

  React.useEffect(() => {
    if(error === "Create room successfully"){
      setData({
        mapId:0,
        quantity:20,
        roomName:"",
        roomPass:"",
        description:""
      })
    }
    return () => {
    }
  }, [error])

  return (
    <Dialog open={open} maxWidth="lg">
        <DialogTitle>Create New Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
              To create new room, fill all infor in this form and submit. Some infor is optional, so you can ignore it. There is 4 map for you.
          </DialogContentText>
          <Typography sx={{
            paddingLeft:3,
            paddingBottom:2
          }}>
            Choose Your Map
          </Typography>
          <Grid container spacing={5}>
              <Grid item container xs={12} md={6} spacing={2}> 
                  {
                    templates.map((template, i)=>{
                      if(!template.templateRooms){
                        return(<React.Fragment key={i}></React.Fragment>)
                      }
                      const {templateRooms} = template;
                      return(
                        templateRooms.map((room, index)=>{
                            return(
                              <RoomTemplate selected={selected} id={room.tid} room={room} key={index} setDataChange={handleSelected}/>
                            )
                        })
                      )
                    })
                  }
              </Grid>
              <Grid item xs={12} md={6}>
                  
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Room Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={data.roomName}
                    onChange={(e)=>{
                      setData({
                        ...data,
                        roomName:e.target.value
                      })
                    }}
                  />
                  <Typography 
                  variant='caption'
                  gutterBottom>User Quantity</Typography>
                  <PrettoSlider
                      valueLabelDisplay="auto"
                      aria-label="User Quantity"
                      defaultValue={20}
                      value={data.quantity}
                      max={mapInfor?.max || 21}
                      onChange={(e)=>{
                        setData({
                          ...data,
                          quantity:e.target.value
                        })
                      }}
                    />
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Room Password(Optional)"
                    type="password"
                    fullWidth
                    variant="standard"
                    value={data.roomPass}
                    onChange={(e)=>{
                      setData({
                        ...data,
                        roomPass:e.target.value
                      })
                    }}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Description(Optional)"
                    type="password"
                    fullWidth
                    variant="standard"
                    value={data.description}
                    multiline
                    minRows={4}
                    onChange={(e)=>{
                      setData({
                        ...data,
                        description:e.target.value
                      })
                    }}
                  />
                  {
                    error&&<Alert severity={error==="Create room successfully"?"success":"error"}>{error}</Alert>
                  }
              </Grid>
          </Grid>
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