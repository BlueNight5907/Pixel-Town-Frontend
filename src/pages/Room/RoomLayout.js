import React from 'react'
import { Outlet } from 'react-router-dom'
import ConnectionProvider from "../../Context/ConnectionProvider";
function RoomLayout() {
    return (
           <ConnectionProvider>
                <Outlet/>
           </ConnectionProvider>
    )
}
export default RoomLayout
