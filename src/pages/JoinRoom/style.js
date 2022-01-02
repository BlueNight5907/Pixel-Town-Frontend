const useStyles = ()=>({
    paper:{
        width:{
            xs:"95%",
            md:"80%",
            lg:"70%",
            xl:"900px"
        },
        backgroundColor:theme => theme.main.color,
        padding:4,
        borderRadius:5
    },
    selectCharBox:{
        width:"100%",
        height:"100%",
        overflowY:"auto",
        display:"flex",
        padding:"5px",
        backgroundColor:"rgb(202, 216, 255)",
        flexWrap:"wrap",
        "::-webkit-scrollbar":{
            width: "4px"
        },
        "&::-webkit-scrollbar-thumb":{
            backgroundColor:"#0f253b",
            borderRadius:1
        },
        borderRadius:"10px",
        gap:1,
        overflowX:"hidden",
        justifyContent:"space-between",
        maxHeight:"340px"
    }
})
export default useStyles