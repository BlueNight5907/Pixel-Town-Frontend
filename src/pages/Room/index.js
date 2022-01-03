import React, { Fragment, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Game from '../../game';
import BottomBar from '../../components/BottomBar';
import SmallScreen from './SmallScreen';
import { ConnectionContext } from '../../Context/ConnectionProvider';
import Section from '../../components/Section';
import SideNav from './SideNav';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
function Room() {
    const {roomId} = useParams();
    const navigate = useNavigate();
    const {myCharacter} = useSelector(state => state.joinRoomReducer)
    const {currentUser} = useSelector(state => state.authReducer)
    const {useSignalR} = useContext(ConnectionContext)
    const dispatch = useDispatch()
    const {signalR, setRoomId} = useSignalR
    const [sidebarActive,setSidebarActive] = useState(false)
    const [data,setData] = useState({
        roomId:roomId,
        character:myCharacter,
        name:currentUser?.name
    })
    const [drawerWidth,setDrawerWidth] = useState(70)
    const handleActive= (active)=>{
        setSidebarActive(active)
        setDrawerWidth(active?370:70)
    }
    useEffect(()=>{
        if(!myCharacter){
            navigate("/room/join/"+roomId)
        }
    },[myCharacter])
    useEffect(()=>{
        setData({
            roomId:roomId,
            character:myCharacter,
            name:currentUser.name
        })
        setRoomId(roomId);
    },[roomId,myCharacter,setRoomId,currentUser])

    return (
        <Fragment>
            <SideNav minDrawWidth={70} drawWidth={370} active={sidebarActive} handleActive={handleActive}/>
            <Section className = "room" drawerWidth={drawerWidth}>
                <Game signalR={signalR} data={data} dispatch={dispatch}/>
                <SmallScreen/>
                <BottomBar/>
            </Section>
        </Fragment>
    )
}

export default Room
