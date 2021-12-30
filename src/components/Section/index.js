import { styled } from '@mui/system'
import React from 'react'

const Wrapper = styled('section',{
    shouldForwardProp: (prop) => prop !== 'drawerWidth',
  })(({theme,drawerWidth})=>({
    position:"relative",
    top:0,
    transition:"all 0.5s ease",
    ...(drawerWidth &&{
        left:drawerWidth,
        width:`calc(100% - ${drawerWidth}px)`
    })
}))

function Section({children,drawerWidth,...other}) {
    return (
        <Wrapper {...other} drawerWidth={drawerWidth}>
            {children}
        </Wrapper>
    )
}

export default Section
