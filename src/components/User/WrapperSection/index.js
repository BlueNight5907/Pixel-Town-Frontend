import { styled } from '@mui/material/styles';

const WrapperSection = styled("section")(({theme})=>({
    backgroundColor:theme.main.bgColor,
    minHeight:"100vh",
    overflow:"auto",
    color:"#fff"
}))

export default WrapperSection