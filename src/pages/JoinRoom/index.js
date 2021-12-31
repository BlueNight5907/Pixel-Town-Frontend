import React from 'react'
import WrapperSection from '../../components/WrapperSection'
import {Button, Grid, Paper, Stack, Typography} from "@mui/material"
import useStyles from './style'
import UserScreen from "./UserScreen"
import { Box, styled } from '@mui/system'
import { Mic, VideocamRounded, VolumeUpRounded } from '@mui/icons-material'
import * as characters from "../../game/constant/character"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Select = styled("select")(({theme})=>({
    borderRadius:13,
    backgroundColor:"#fff",
    padding:"6px 10px",
    flexGrow:1
}))
function CustomSelect({options, Icon, onChange}){
    return(
        <Stack sx={{color:"#fff"}} spacing={1} direction="row" alignItems="center">
            {Icon}
            <Select>
                {
                    options?.map((value, i)=>{
                        return(
                            <option value={{value}} key={i}>{value}</option>
                        )
                    })
                }
            </Select>
        </Stack>
    )
}
function Character({name,onSelect, index, selected}){
    const styles = {
        padding:"5px 15px",
        "& img":{
            clip:"rect(0,48px,48px,0)",
            position:"absolute",
        },
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        "& .char-container":{
            position:'relative',
            width:"48px",
            height:"48px"
        },
        gap:"5px",
        "&:hover":{
            backgroundColor:index===selected?"rgb(88, 130, 247)":"rgb(144, 173, 255)"
        },
        backgroundColor:index===selected?"rgb(88, 130, 247)":"inherit",
        height:"fit-content",
        borderRadius:1,
        color:index===selected?"#fff":"#000",
        width:"78px"
    }
    return(
        <Box sx={styles} onClick={ ()=> onSelect&&onSelect(index)}>
            <div className='char-container'>
                <img alt="character" src={`/assets/characters/${name}/atlas.png`}/>
            </div>
            <Typography variant='caption' sx={{
                textTransform:"capitalize",
                overflow:"hidden",
                display:"-webkit-box",
                textOverflow:"ellipsis",
                maxWidth:"48px",
                WebkitLineClamp:1
            }}>
                {name}
            </Typography>
        </Box>
    )
}

function JoinRoom() {
    const [selected, setSelected] = useState(0)
    const navigate = useNavigate()
    const onChange = (value)=>{
        setSelected(value)
    }
    const classes = useStyles();
    return (
        <WrapperSection sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:"rgb(32, 37, 64)"
        }} className='join-room'>
            <Paper sx={classes.paper} elevation={5}>
                <Typography sx={{
                            color:"#fff",
                            textTransform:"capitalize",
                            fontWeight:600,
                            marginBottom:1,
                            fontSize:18
                }}>Wellcome to ABC</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Paper elevation={0} sx={classes.selectCharBox}>
                            {
                                Object.values(characters).map((character,i)=>{
                                    return(<Character onSelect={onChange} name={character.name} index={i} selected={selected} key={i}/>)
                                })
                            }
                        </Paper>
                    </Grid>
                    <Grid item container spacing={1} xs={12} sm={5} justifyContent="end">
                        <Grid item xs={11}>
                            <UserScreen/>
                        </Grid>
                        <Grid item xs={12} container justifyContent="center" direction="column" gap={1}>
                            <CustomSelect 
                            Icon={<VideocamRounded color='inherit'/>}
                            options={[1,2,3]}/>
                            <CustomSelect 
                            Icon={<Mic color='inherit'/>}
                            options={[1,2,3]}/>
                            <CustomSelect 
                            Icon={<VolumeUpRounded color='inherit'/>}
                            options={[1,2,3]}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container justifyContent="center" gap={4}>
                        <Button sx={{
                            backgroundColor:theme => theme.main.colorHover2,
                            color:"#000",
                            paddingLeft:"50px",
                            paddingRight:"50px",
                            borderRadius:"15px",
                            "&:hover":{
                                backgroundColor:theme => theme.main.colorHover2,
                                color:"#fff"
                            }    
                        }}
                        onClick = {()=>{
                            navigate(-1)
                        }}>Go Back</Button>
                        <Button sx={{
                            backgroundColor:theme => theme.main.btnColor,
                            color:"#000",
                            paddingLeft:"45px",
                            paddingRight:"45px",
                            borderRadius:"15px",
                            "&:hover":{
                                backgroundColor:theme => theme.main.btnColor,
                                color:"#fff"
                            }
                        }}>Join Room</Button>
                    </Grid>
                </Grid>
            </Paper>
        </WrapperSection>
    )
}

export default JoinRoom
