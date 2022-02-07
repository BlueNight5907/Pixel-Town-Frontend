
import React from 'react'
import {Outlet} from "react-router-dom";
function UserContent() {
    return (
        <div className="user-content">
            <Outlet/>
        </div>
    )
}

export default UserContent