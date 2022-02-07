import { Grid, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { Box, styled } from '@mui/system';
import { ForumRounded, HomeRounded, InsertDriveFile, PeopleAltRounded, Settings } from "@mui/icons-material"
import { tooltipClasses } from '@mui/material/Tooltip';
import ChatPanel from './ChatPanel';
import PeoplePanel from './PeoplePanel';
import FilePanel from './FilePanel';
import { useNavigate } from 'react-router-dom';
import { SET_READY_TO_JOIN } from '../../../../stores/types/JoinRoom';
import { useDispatch } from 'react-redux';
const CustomHomeRoot = styled('button')`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: rgb(88, 130, 247);
  padding: 12px;
  width:50px;
  height:50px;
  border-radius: 16px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: rgb(121, 155, 249);
  }

  &.${buttonUnstyledClasses.active} {
    background-color: rgb(121, 155, 249);
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CustomButtonRoot = styled('button')`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: inherit;
  padding: 12px;
  width:50px;
  height:50px;
  border-radius: 16px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: rgba(51,58,100,.7);
  }

  &.${buttonUnstyledClasses.active} {
    background-color: rgba(51,58,100,.7);
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ButtonTooltip = styled(({ className, ...props }) => (
    <Tooltip  {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      padding:10,
      borderRadius:15,
      marginLeft:10,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

function HomeButton(props) {
    return (
        <ButtonTooltip title="Click to go Home" placement="right">
            <ButtonUnstyled {...props} component={CustomHomeRoot} />
        </ButtonTooltip>
    )
  }

function SidebarButton({title,...props}) {
  return (
    <ButtonTooltip title={title} placement="right" >
        <ButtonUnstyled {...props} component={CustomButtonRoot} />
    </ButtonTooltip>
  )
}
const useStyle = (minDrawWidth, drawWidth, active)=>({
    sidenav:{
        width:minDrawWidth,
        transition:"all 0.5s ease",
        position:"fixed",
        zIndex:100,
        backgroundColor: theme => theme.main.bgColor,
        overflowY:"auto",
        overflowX:"hidden",
        height:"100%",
        ...(active&&{
            width:drawWidth
        })
    },
    grid:{
        height:"inherit",
        flexWrap:"nowrap"
    },
    listBtn:{
        flexShrink:0,
        height:"inherit",
        display:"flex",
        justifyContent:"space-between",
        flexDirection:"column",
        width:"70px",
        alignItems:"center",
        paddingTop:5,
        paddingBottom:2
    },
    panel:{
        display:active?"block":"none",
        height:"inherit",
        flexGrow:1,
        backgroundColor:"rgba(51,58,100,.7)"
    }

})
function SideNav({minDrawWidth = 0,drawWidth,active,handleActive}) {
    const classes = useStyle(minDrawWidth,drawWidth,active)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [activeTab,setActiveTab] = useState(0)
    return (
        <Paper sx={classes.sidenav} square elevation={4}>
            <Grid container sx={classes.grid}>
                <Grid item sx={classes.listBtn}>
                    <Stack direction={"column"} alignItems={"center"} spacing={3}>
                        <HomeButton onClick={()=> {
                          dispatch({
                            type:SET_READY_TO_JOIN,
                            payload:{
                                data:false
                            }
                          })
                          navigate("/")}}>
                            <HomeRounded/>
                        </HomeButton>
                        <SidebarButton title="People in Group" onClick={()=> {
                          handleActive(true)
                          setActiveTab(0)
                        }}>
                            <PeopleAltRounded/>
                        </SidebarButton>
                        <SidebarButton title="Share Files"onClick={()=> {
                          handleActive(true)
                          setActiveTab(1)
                        }}>
                            <InsertDriveFile/>
                        </SidebarButton>
                        <SidebarButton title="Settings" onClick={()=> {
                          handleActive(true)
                          setActiveTab(2)
                        }}>
                            <Settings/>
                        </SidebarButton>
                    </Stack>
                    <Box>
                        <SidebarButton title="Chat with people" onClick={()=> {
                          handleActive(true)
                          setActiveTab(3)
                        }}>
                            <ForumRounded/>
                        </SidebarButton>
                    </Box>
                </Grid>
                <Grid item sx={classes.panel}>
                   {
                     activeTab===0&&<PeoplePanel close={()=> handleActive(false)}/>
                   }
                   {
                     activeTab===1&&<FilePanel close={()=> handleActive(false)} activeTab={activeTab}/>
                   }
                   {
                     activeTab===3&&<ChatPanel close={()=> handleActive(false)}/>
                   }
                </Grid>
            </Grid>
            
        </Paper>
    )
}

export default SideNav
