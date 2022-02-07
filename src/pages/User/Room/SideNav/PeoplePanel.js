import { ArrowBackIos, RemoveRounded } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { users } from '../../../../mockData/users'
import {getUser} from "../../../../api/userApi"
import { ASP_APP_FOLDER } from '../../../../constants/config'
const useStyles =(owner)=>({
    root:{
        height:"inherit",
        backgroundColor:"inherit",
        display:"flex",
        flexDirection:"column",
    },
    title:{
        padding:"10px",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        color:"#fff",
        flexGrow:0,
        flexShrink:0,
        

    },
    listPeople:{
        flexGrow:1,
        backgroundColor:"inherit",
        display:"flex",
        flexDirection:"column",
        gap:"10px",
        overflowX:"hidden",
        overflowY:"auto",
        padding:"0 5px",
        "&::-webkit-scrollbar": {
            width: '5px',
            borderRadius:"10px"
        },  
        "&::-webkit-scrollbar-track": {
            background: "rgba(255,255,255,0.9)",
            borderRadius:"10px"
          },
           
        "&::-webkit-scrollbar-thumb": {
            background: theme => theme.main.bgColor,
            borderRadius:"10px"
        }, 
        "&::-webkit-scrollbar-thumb:hover ":{
            background: theme => theme.main.btnColor
        }
    },
    ownerBox:{
        padding:"5px 10px",
        background:"#fff",
        borderRadius:2,
        margin:"0 5px",
        "& h4":{
            fontSize:14,
            fontWeight:600
        }
    },
    avt:{
        border:theme => "2px solid "+theme.main.btnColor
    },
    user:{
        padding:!owner?"10px":"5px 10px",
        borderRadius:"15px",
        '&:hover':{
            backgroundColor: theme => !owner&&theme.main.bgColor,
            "& .remove":{
                visibility:"visible",
                opacity:1,
            }
        },
        "& .user-name":{
            fontSize:14,
            fontWeight:500,
            marginLeft:0.5,
            textTransform:"capitalize",
            color:owner?"#000":"#fff",
        },
        "& .type":{
            fontSize:12,
            fontWeight:400,
            marginLeft:0.6,
            color:owner?"rgba(0,0,0,0.8)":"#fff",
            textTransform:"capitalize"
        },
        "& .infor":{
            flexGrow:1
        },

        "& .remove":{
            width:37,
            minWidth:40,
            height:20,
            borderRadius:5,
            color:"#ff7575",
            "&:hover":{
                background:"#fff"
            },
            visibility:"hidden",
            opacity:0,
            transform:"all 0.2s ease"
        }
    }
})

function User({edited,data,...other}){
    const {name, userImg, userId,state,owner} = data
    const classes = useStyles(owner)
    const styles = {
        width:"8px",
        height:"8px",
        borderRadius:"50%",
        background:state === "Online"?owner?"#52ff6c":"#8fffa0":"#b0afac",
        display:"inline-block"
    }
    return(
        <Grid container sx={classes.user} alignItems="center">
            <Avatar
            src={ASP_APP_FOLDER + (userImg ||  "/public/users/u29.jfif")}
            sx={classes.avt}/>
            <Stack flexDirection="column" className="infor" gap={0.1}>
                <Typography className="user-name">
                    {name} {<span className="status" style={styles}></span>}
                </Typography>
                <Typography className="type">
                    {owner?"Owner":"Member"}
                </Typography>

                
            </Stack>
            {edited&&(<Button className='remove'><RemoveRounded fontSize="large"/></Button>)}
        </Grid>
    )
}



function PeoplePanel({close}) {
    const classes = useStyles()
    const {users, roomInfor} = useSelector(state => state.joinRoomReducer)
    const {currentUser} = useSelector(state => state.authReducer)
    console.log(users,roomInfor)
    const [host, setHost] = useState({
        name:"Loading",
        userID:1,
        userImg:"/public/users/u33.jfif",
        owner:true,
        state:"Offline"
    })

    useEffect(() => {
        async function fetch(){
            const {data} = await getUser(roomInfor.hostId)
            console.log(data)
            setHost({
                name:data.name,
                userId:roomInfor.hostId,
                userImg:data.avatar,
                owner:true,
                state:"Offline"
            })
        }
        let temp = users?.filter(e => e.userId === roomInfor.hostId)
        if(temp?.length){
            setHost({
                ...temp[0],
                owner:true
            })
        }
        else(
            fetch()
        )
    }, [roomInfor,users])

    return (
        <Paper sx={classes.root} square>
            <Box className="panel-title" sx={classes.title}>
                <Typography component={"h3"} variant='h6'>
                    People
                </Typography>
                <ArrowBackIos onClick={close}/>
            </Box>
            <Box sx={classes.ownerBox}>
                <User data={host}/>
            </Box>
            <Box className="panel-title" sx={{...classes.title,borderBottom:"2px solid #fff", margin:"0 5px 15px", padding:"10px 5px"}}>
                <Typography component={"h6"} variant='body1'>
                    Members
                </Typography>
            </Box>
            <Paper sx={classes.listPeople} square elevation={0}>
                {users?.filter(e => e.userId !== roomInfor.hostId).map((data,i)=>{
                    return(
                        <User data={data} key={i} edited={currentUser.id === roomInfor.hostId}/>
                    )
                })
                }
            </Paper>

        </Paper>
    )
}

export default PeoplePanel
