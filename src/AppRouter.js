import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Room from './pages/Room';
import CreateRoom2 from './pages/CreateRoom2';
import CreateRoom from './pages/CreateRoom';
import UserDashboard from './pages/UserDashboard';
import Auth from './pages/Auth';
import RoomLayout from './pages/Room/RoomLayout';
import UserDashboardLayout from "./layouts/UserDashboardLayout"
import MyRoom from './pages/MyRoom';
function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path={"/login"} element={<Auth />} />
                <Route path={"/register"} element={<Auth />} />

                <Route path="/" element={
                    <UserDashboardLayout>
                        <UserDashboard />
                    </UserDashboardLayout>
                } />
                <Route path={"/myroom"} element={
                    <UserDashboardLayout>
                        <MyRoom />
                    </UserDashboardLayout>
                } />
                <Route path='/room' element={< RoomLayout />}>
                    <Route path='/room/create2' element={<CreateRoom2 />} />
                    <Route path='/room/create' element={<CreateRoom />} />
                    <Route path=":roomId" element={<Room />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRouter