import { ArrowBackIos, RemoveRounded } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import { users } from '../../../mockData/users'

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
    const {name, userImg, userID,owner,online} = data
    const classes = useStyles(owner)
    const styles = {
        width:"8px",
        height:"8px",
        borderRadius:"50%",
        background:online?owner?"##52ff6c":"#8fffa0":"#b0afac",
        display:"inline-block"
    }
    return(
        <Grid container sx={classes.user} alignItems="center">
            <Avatar
            src={userImg}
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
    return (
        <Paper sx={classes.root} square>
            <Box className="panel-title" sx={classes.title}>
                <Typography component={"h3"} variant='h6'>
                    People
                </Typography>
                <ArrowBackIos onClick={close}/>
            </Box>
            <Box sx={classes.ownerBox}>
                <User data={{
                    name:"Nguyen Van Huy",
                    userID:1,
                    userImg:"/assets/users/u33.jfif",
                    owner:true
                }}/>
            </Box>
            <Box className="panel-title" sx={{...classes.title,borderBottom:"2px solid #fff", margin:"0 5px 15px", padding:"10px 5px"}}>
                <Typography component={"h6"} variant='body1'>
                    Members
                </Typography>
            </Box>
            <Paper sx={classes.listPeople} square elevation={0}>
                {users.map((data,i)=>{
                    return(
                        <User data={data} key={i} edited/>
                    )
                })}
            </Paper>

        </Paper>
    )
}

export default PeoplePanel
