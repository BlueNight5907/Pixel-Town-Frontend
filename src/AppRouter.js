import React,{Fragment} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import Room from './pages/User/Room';
import CreateRoom from './pages/User/CreateRoom';
import UserDashboard from './pages/User/UserDashboard';
import Auth from './pages/User/Auth';
import RoomLayout from './pages/User/Room/RoomLayout';
import UserDashboardLayout from "./layouts/UseLayout/UserDashboardLayout"
import JoinRoom from './pages/User/JoinRoom';
import Profile from './pages/User/Profile';
import AdminRouter from "./AdminRouter";
import GlobalStyles from "./theme/globalStyles";
import {BaseOptionChartStyle} from "./components/Admin/charts/BaseOptionChart";
import UserContent from "./layouts/UseLayout/UserContent";
function AppRouter() {
    return (
        <Routes>
            <Route element={<UserContent/>}>
                <Route path={"/login"} element={<Auth />} />
                <Route path={"/register"} element={<Auth />} />
                <Route path={"/profile"} element={
                    <UserDashboardLayout>
                        <Profile />
                    </UserDashboardLayout>
                } />

                <Route path="/" element={<Navigate to="/myroom" />}/>
                <Route path={"/myroom"} element={
                    <UserDashboardLayout>
                        <UserDashboard />
                    </UserDashboardLayout>
                } />
                <Route path="/explore" element={
                    <UserDashboardLayout>
                        <UserDashboard />
                    </UserDashboardLayout>
                } />
                <Route path='/room/create' element={<CreateRoom />} />
                <Route path='/room' element={< RoomLayout />}>
                    <Route path='/room/join' element={<Navigate to="/myroom" />} />
                    <Route path='/room/join/:roomId' element={<JoinRoom />} />
                    <Route path=":roomId" element={<Room />} />
                </Route>
            </Route>
            <Route path={"/admin/*"} element={
                <Fragment>
                    <GlobalStyles/>
                    <BaseOptionChartStyle/>
                    <AdminRouter/>
                </Fragment>
                }/>
        </Routes>
    )
}

export default AppRouter