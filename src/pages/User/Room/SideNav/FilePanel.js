import { ArrowBackIos, Close, FileDownloadRounded, PageviewOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, CardMedia, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { downloadFile } from '../../../../api/downloadApi'
import { uploadFileApi } from '../../../../api/roomApi'
import LinearProgressWithValue from '../../../../components/User/LinearProgressWithValue'
import UploadDialog from '../../../../components/User/UploadDialog'
import { ASP_APP_FOLDER } from '../../../../constants/config'
import { getfiles, getfilesLast } from '../../../../stores/actions/JoinRoom'
import { ADD_NEW_FILES } from '../../../../stores/types/JoinRoom'
const sendFile =async (roomId, form,onProgressChange,dispatch)=>{
    const {data} = await uploadFileApi(roomId,form,onProgressChange)
    console.log(data)
    const file = {
        time:data.value.time,
        fileURL:data.value.urlFile,
        userId:data.value.userId,
        id:data.value.id
    }
    dispatch({
        type:ADD_NEW_FILES,
        payload:{
            data:file
        }
    })

}
const MessageInput = ({...other})=>{
    const [open,setOpen] = useState(false)
    const [file,setFile] = useState(null)
    const [isFetch,setIsFetch] = useState(false)
    const [progress,setProgress] = useState(0)
    const {roomInfor} = useSelector(state => state.joinRoomReducer)
    const dispatch = useDispatch()
    const handleClick = (event)=>{
        setOpen(true)
    }

    const sendMessage = async ()=>{
        setProgress(0)
        setIsFetch(true)
        const form = new FormData()
        form.append("file",file)
        await sendFile(roomInfor.id,form,onProgressChange,dispatch)
        setFile(null)
        setTimeout(() => {
            setIsFetch(false)
        }, 1500);
    }
    const onProgressChange = (loaded,total)=>{
        setProgress(100*loaded/total)
    }
    const handleFileChange = (file)=>{
        setFile(file)
    }
    return(
        <>
            {isFetch&&(
                <LinearProgressWithValue value={progress}/>
            )}
            <Stack flexDirection="row"
            alignItems="center"
            sx={{
                backgroundColor:"#fff",
                padding:0.5,
                borderRadius:4,
                "& .file-name":{
                    border:"none",
                    outline:"none",
                    paddingLeft:1,
                    height:"100%",
                    paddingRight:1,
                    fontSize:14,
                    fontWeight:500,
                    flexGrow:1,
                    color:theme => theme.main.bgColor,
                    cursor:"pointer"
                }
            }}>
                <input readOnly className="file-name" onClick ={handleClick}
                value={file?file.name:"Filename"}
                />
                {file&&(<div style={{
                    width:25,
                    height:25,
                    marginRight:5,
                    borderRadius:"50%",
                    backgroundColor:"rgba(237, 55, 82,0.85)",
                    color:"#fff",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center"
                }} onClick={()=> setFile(null)}>
                    <Close fontSize='small'/>
                </div>)}
                <Button
                sx={{
                    textTransform:"capitalize",
                    margin:0,
                    borderRadius:3,
                    background:"rgb(6, 214, 160)",
                    transition:"background 0.2s ease-in-out",
                    color:"#000",
                    height:30,
                    '&:hover':{
                        background:"rgb(81,226,189)"
                    },
                    marginTop:"0!important",
                }}
                disabled = {file===null || isFetch}
                onClick = {sendMessage}
                >Send</Button>
            </Stack>
            <UploadDialog open={open} handleClose={()=>setOpen(false)} onFileChange={handleFileChange}/>
        </>
        
    )
}

const useStyles =()=>({
    root:{
        height:"inherit",
        backgroundColor:"inherit",
        display:"flex",
        flexDirection:"column",
        position:"relative",
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
    listMsg:{
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
    bottomBox:{
        padding:"0 5px 10px",
        color:"#fff",
        flexGrow:0,
        flexShrink:0,
        
    }
})

const imageForFileType = {
    "docx":"/public/filetype/word.jpg",
    "mp4":"/public/filetype/video.png",
    "mp3":"/public/filetype/music.png",
    "avi":"/public/filetype/video.png",
    "txt":"/public/filetype/text-file.png",
    "xlsx":"/public/filetype/excel.jpg",
    "doc":"/public/filetype/word.jpg",
    "zip":"/public/filetype/zip.png",
    "rar":"/public/filetype/rar.jpg",
    "pdf":"/public/filetype/pdf.png",
    other:"/public/filetype/other.jpg"
}

const FileBox = ({data,...other})=>{
    const {userId,  avatar, name, fileURL,time} = data
    const fileName = fileURL.split("/").at(-1)
    const [urlImg, setUrlImg] = useState("")
    const [isImg, setIsImg] = useState(false)
    const {currentUser} = useSelector(state => state.authReducer)
    const myID = currentUser?.id
    useEffect(() => {
        if(fileName.match(/.(jpg|jpeg|png|gif|jfif|svg)$/i)){
            setIsImg(true)
            setUrlImg(fileURL)
        }else{
            const ext = fileURL.split("/").at(-1).split(".").at(-1)
            let fileImg = imageForFileType[ext]
            if(fileImg){
                setUrlImg(fileImg)
            }
            else{
                setUrlImg(imageForFileType.other)
            }
        }
    }, [fileURL])

    
    const tranProps = ()=>{
        return (userId !== myID)?{
            alignItems:"start",
            sx:{
                "& .time-span":{
                    marginLeft:"45px"
                }
            }
        }:{
            alignItems:"end"
        }
    }

    const getClass = ()=>{
        return (userId !== myID)?{
            "& .message-box":{
                gap:1,
                "& .file-container":{
                    fontSize:"13px",
                    fontWeight:"500",
                    display:"flex",
                    flexDirection:"column",
                    gap:1,
                    padding:1,
                    borderRadius:2,
                    backgroundColor:"#fff",
                    maxWidth:"180px"
                },
                "& .avt":{
                    width:35,
                    height:35
                }
            }
            
        }:{
            borderRadius:"10px 5px 5px 10px",
            backgroundColor:"rgb(0 170 136)",
            "& .file-container":{
                fontSize:"13px",
                fontWeight:"500",
                display:"flex",
                flexDirection:"column",
                gap:1,
                padding:1,
                borderRadius:2,
                maxWidth:"180px"
            },
            maxWidth:"70%"
        }
    }

    return(
        <Grid container sx={{
            width:"100%"
        }} {...tranProps()} flexDirection="column">
            <Grid item sx ={{...getClass()}}>
                {
                    userId !== myID?(
                        <>
                            <Typography className="user-name" 
                            sx={{
                                marginBottom:1,
                                marginLeft:0.5,
                                textTransform:"capitalize"
                            }}
                            color="white" variant="body2">
                                {name}
                            </Typography>
                            <Grid container className="message-box">
                                <Avatar 
                                src={ASP_APP_FOLDER + avatar}
                                className="avt"/>
                                <Box className="file-container">
                                    <Typography className="user-name" 
                                    sx={{
                                        marginLeft:0.5
                                    }}
                                    color="primary" variant="body2">
                                        {fileName}
                                    </Typography>

                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={ASP_APP_FOLDER + urlImg}
                                        alt="green iguana"
                                    />
                                    <Stack direction="row" justifyContent="end" gap={0.3}>
                                        {isImg&&(
                                            <Button sx={{
                                                padding:"0 5px",
                                                minWidth:"30px"
                                            }}>
                                                <PageviewOutlined fontSize='small'/>
                                            </Button>
                                        )}
                                        
                                        <Button sx={{
                                            padding:"0 5px",
                                            minWidth:"30px"
                                        }}
                                        onClick={()=>{
                                            downloadFile(fileURL,fileName )
                                        }}
                                        >
                                            <FileDownloadRounded fontSize='small'/>
                                        </Button>
                                    </Stack>
                                </Box>
                                
                            </Grid>
                        </>
                        
                    ):(
                    <>
                        <Box className="file-container">
                            <Typography className="user-name" 
                            sx={{
                                marginLeft:0.5
                            }}
                            color="white" variant="body2">
                                {fileName}
                            </Typography>

                            <CardMedia
                                component="img"
                                height="140"
                                image={ASP_APP_FOLDER + urlImg}
                                alt="green iguana"
                            />
                            <Stack direction="row" justifyContent="end" gap={0.3}>
                                {isImg&&(
                                    <Button sx={{
                                        padding:"0 5px",
                                        minWidth:"30px",
                                        color:"#fff"
                                    }}>
                                        <PageviewOutlined fontSize='small' color='inherit'/>
                                    </Button>
                                )}
                                
                                <Button sx={{
                                    padding:"0 5px",
                                    minWidth:"30px",
                                    color:"#fff"
                                }}
                                onClick={()=>{
                                    downloadFile(fileURL,fileName )
                                }}
                                >
                                    <FileDownloadRounded color='inherit' fontSize='small'/>
                                </Button>
                            </Stack>
                        </Box>
                    </>
                    )
                } 
            </Grid>
            <Grid item>
                <Typography className="time-span" color="white" component="span" variant="caption">
                    {new Date(time).toLocaleString()}
                </Typography>
            </Grid>
        </Grid>
    )
}


function FilePanel({close,activeTab}) {
    const {files, roomInfor} = useSelector(state => state.joinRoomReducer)
    const classes = useStyles()
    const dispatch = useDispatch();
    const messageList = useRef(null);
    const lastAnchor =  useRef(null);
    const lastMessage = useRef(null);
    const [fetchFiles, setFetchFiles] = useState(false)
    const scrollToBottom = () => {
        return lastAnchor.current.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(()=>{

        async function fetch(){
            await new Promise(resolve => setTimeout(resolve,1000)) 
            if(activeTab === 1){
                console.log(files.at(-1)?.time,files.at(0)?.time)
                dispatch(getfilesLast(roomInfor.id, files.at(-1)?.time))
                console.log("fetch last")
            }
        }
        fetch()
    },[activeTab])

    const scrollToMessPosition = (position)=>{
        let childs = messageList.current.childNodes
        if(!childs || childs.length === 0 ){
            return
        }
        let childLength = childs.length
        let scrollHeight = 0
        for(let i = 0;i<childLength;i++){
            if(childLength - i - 1 < position){
                break
            }
            scrollHeight += childs[i].scrollHeight
        }
        messageList.current.scrollTop = scrollHeight
    }
    const handleScroll= (e)=>{
        const top = e.target.scrollTop === 0
        
        if(top){
            setFetchFiles(true)
            lastMessage.current = e.target.childElementCount
        }
    }
    useEffect(() => {
        let timeOut
        if(fetchFiles){
            timeOut = setTimeout(() => {
                setFetchFiles(false)
                clearTimeout(timeOut)
            }, 2000);
            dispatch(getfiles(roomInfor.id, files.at(0)?.time))

        }
    }, [fetchFiles])
    useEffect(()=>{
        if(roomInfor?.hostId != null && files?.length === 0){
            setFetchFiles(true)
            dispatch(getfiles(roomInfor.id, Date.now()))
            let timeOut = setTimeout(() => {
                setFetchFiles(false)
                clearTimeout(timeOut)
            }, 1000);
        }
    },[])



    useEffect(()=>{
        if(!fetchFiles){
            scrollToBottom()
        }
        else{
            let messageLength = files.length
            if(messageLength > 0 && lastMessage.current){
                scrollToMessPosition(lastMessage.current)
            }
        }
    },[files])

    return (
        <Paper sx={classes.root} square>
            {
                fetchFiles&&(
                    <Paper sx={{
                        position:"absolute",
                        top:50,
                        left:0,
                        padding:1,
                        width:"100%",
                        zIndex:101,
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        gap:1,
                        color:"#0d978f",
                        backgroundColor:"rgba(255,255,255,0.8)"
                    }}>
                        <CircularProgress size={30} sx={{
                            color:"#24b53a"
                        }} />
                        <Typography color="inherit">
                            Loading old file...
                        </Typography>
                    </Paper>
                )
            }

            <Box className="panel-title" sx={classes.title}>
                <Typography component={"h3"} variant='h6'>
                    Files
                </Typography>
                <ArrowBackIos onClick={close}/>
            </Box>

            <Paper
            onScroll={handleScroll} ref={messageList}
            sx={classes.listMsg} square elevation={0}>
                {
                    files.map((data,i)=>{
                        return(
                            <FileBox  key={i} data={data}/>
                        )
                    })
                }
                

                <div ref={lastAnchor}/>
            </Paper>

            <Box sx={classes.bottomBox}>
                <Typography variant="caption" component={"p"} sx={{
                    paddingLeft:1,
                    paddingBottom:0.5,
                    marginTop:0.5,
                    borderTop:"2px solid rgb(81,226,189)"
                }}>
                    Input your File
                </Typography>
                <MessageInput/>
            </Box>
        </Paper>
    )
}

export default FilePanel
