export const useStyles = () => ({
    root: {

    },
    paperRoot: {
        backgroundColor: '#011627',
        color: 'white',
        overflowY: 'auto',
        margin: 0,
        padding: 0,
        listStyle: "none",
        height: "100%",
        '&::-webkit-scrollbar': {
            width: '0.5em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#0f253b',
            borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#132F4C',
        }
    },
    dialogTitle:{
        padding: '10px 20px'
    },
    dialogContent:{
        padding: '0px 22px'
    },
    closeIcon: {
        position: 'absolute',
        right: 8,
        top: 8,
        color: '#70B0FF'
    }
});