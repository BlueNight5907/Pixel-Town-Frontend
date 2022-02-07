import { styled } from "@mui/system";

const drawerWidth = 300;
const useStyles = ()=>({
    appBar: {
        backgroundColor:theme => theme.main.color,
        color:'white',
    },
    headerToolbar: {
        justifyContent: 'space-between',
        alignItems:'stretch',
        position:'relative'
    },
    logo:{
        height:40
    },
    headerLeft:{
        display:{xs:'none',sm:'flex'},
        height:'100%',
        padding:0,
        position:'static'
    },
    headerRight:{
        gap:15+'px',
        display:{xs:'none',md:'flex'}
    },
    headerButton:{
        backgroundColor:'rgb(0,0,0)',
        color:'white',
        textAlign:'center',
        minWidth:120,
        border:'1px solid transparent',
        "&:focus": {
            outline: "none",
        },
        borderRadius:10+'px',
        "&:hover": { 
            backgroundColor:theme => theme.main.color,
            color: 'white',
            border:'1px solid white',
         },
        transition: "all .3s",
        display:{xs:'none',lg:'block'}

    },
    menuButton:{
        backgroundColor:"inherit",
        marginRight:"10px",
        color:'white',
        "&:focus": {
            outline: "none",
        },
        "&:hover": { 
            backgroundColor:theme => theme.main.color,
         },
        minWidth: 40,
        height:40,
        borderRadius:'10px',
        display:{xs:'flex',lg:'none'},
        justifyContent:'center',
        alignItems:'center'
    },
    styleDownArrow: {
        transform: "rotate(90deg)",
        transition: "all .2s",
        marginLeft:10+'px',
        fontSize:12,
        '&.active':{
            transform: "rotate(-90deg)"
        }
    },
    auth:{
        border:'2px solid #fff',
        display:{sm:'none',lg:'block'},
    },
    drawerPaper: {
        width: {xs:300,md:360},
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerHeader:{
        padding:{xs:'10px 10px',md:'10px 16px'},
        minHeight:64,
        position:'relative',
        background:theme => theme.main.bgColor,
        color:'#fff',
        display:'flex',
        alignItems:'center'
    },
    drawerButton:{
        backgroundColor:'#000',
        color: 'white',
        border:'1px solid #000',
        minWidth:120,
        height:50,
        '&:hover':{
            backgroundColor:'white',
            color: 'black',
            border:'1px solid #000', 
        }
    },
    drawerUser:{
        padding:{xs:'12px 10px',md:'12px 16px'},
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        gap:'5px',
        '& a':{
            textDecoration:'none',
            border:theme => '1px solid '+theme.main.color,
            color:theme => theme.main.color,
            textTransform:'Capitalize',
            fontSize:12,
            borderRadius:2,
            flexShrink:0,
            '&:hover':{
                background:'none'
            }
        },
        '& p':{
            fontSize:13,
            lineHeight:1.2
        }
    },
    drawerMenu:{
        pt:0,
        pb:0,
        '& > li > *':{
            width:'100%',
            display:'flex',
            minHeight:60,
            padding:{xs:'0 12px',md:'0 15px'},
            alignItems:'center',
            textDecoration:'none',
            borderBottom:'1px solid rgb(241, 241, 241)',
            position:'relative',
            '& > div':{
                gap:10+'px'
            },
            '& > div > span':{
                color:'black',
                fontSize:15
            },
            '&.active *':{
                color:theme => theme.main.color
            },
            '& > svg':{
                width:16,
                height:16,
                opacity:0.7,
                transition:'transform 0.3s ease-in-out',
                '&.active':{
                    transform:'rotate(90deg)'
                }
            },
            '&.submenu':{
                padding:0,
                '& ul':{
                    pt:0,
                    pb:0,
                    '& > li > a':{
                        pl:7,
                        fontSize:15
                    },
                    '& > li > a.active':{
                        color:theme => theme.main.color
                    }
                }
                
                
            }
        }
    }
})
export default useStyles

export const SearchInput = styled('input')(({theme})=>({
    height:40,
    outline:'none',
    border:'none',
    paddingLeft:10,
    backgroundColor:'white',
    width:120,
    [theme.breakpoints.up('xl')]:{
        width:200
    }
}))



