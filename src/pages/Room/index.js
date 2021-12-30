import React, { Fragment, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Game from '../../game';
import BottomBar from '../../components/BottomBar';
import SmallScreen from './SmallScreen';
import { ConnectionContext } from '../../Context/ConnectionProvider';
import Section from '../../components/Section';
import SideNav from './SideNav';
import { useEffect } from 'react';
function Room() {
    const {roomId} = useParams();
    const name = "Pro player";

    const {useSignalR} = useContext(ConnectionContext)
    const {signalR, setRoomId} = useSignalR
    const [sidebarActive,setSidebarActive] = useState(false)
    const [data,setData] = useState({
        roomId:roomId,
        name:name

    })
    const [drawerWidth,setDrawerWidth] = useState(70)
    const handleActive= (active)=>{
        setSidebarActive(active)
        setDrawerWidth(active?370:70)
    }
    
    useEffect(()=>{
        setData({
            name,
            roomId
        })
        setRoomId(roomId);
    },[roomId,name,setRoomId])

    return (
        <Fragment>
            <SideNav minDrawWidth={70} drawWidth={370} active={sidebarActive} handleActive={handleActive} setRoomId={setRoomId}/>
            <Section className = "room" drawerWidth={drawerWidth}>
                <Game signalR={signalR} data={data}/>
                <SmallScreen/>
                <BottomBar/>
            </Section>
        </Fragment>
    )
}

export default Room
