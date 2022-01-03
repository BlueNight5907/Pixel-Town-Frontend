import { Grid } from '@mui/material'
import React from 'react';
import MyRoomCard from '../../components/MyRoomCard';

const MyRoom = () => {
    return (
        <Grid container spacing={4} sx={{
            marginBottom:10
        }}>
            <Grid item xs={12} sm={6} md={6} lg={6}> 
                <MyRoomCard
                    avtSrc="https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png"
                    roomName="Pixel Town"
                    hostName="Huy"
                    desImg="https://media.istockphoto.com/vectors/pixel-art-cyberpunk-metropolis-background-vector-id1279840008?k=20&m=1279840008&s=612x612&w=0&h=M_E3GNssqAkdszL4-1TIsPohgnIJbhyqWShC5wuU7Tw="
                    currentUser={5}
                    maxUser={30}
                    desText="Nơi giao lưu kết bạn tâm giao,..."
                />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <MyRoomCard
                    avtSrc="https://i.pinimg.com/564x/7b/64/c8/7b64c8d6a9ceefa256636659226cd0f2.jpg"
                    roomName="My City"
                    hostName="Dang"
                    desImg="https://media.sketchfab.com/models/9363665ee7b94a16b6aba18a89d70be9/thumbnails/b5c7bc7d6dfe496fac3463b45e535ef8/b4b17aa65e68425ab4aea8db1f136202.jpeg"
                    currentUser={50}
                    maxUser={50}
                    desText="Nơi giao lưu kết bạn tâm giao,..."
                />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <MyRoomCard
                    avtSrc="https://i.pinimg.com/originals/f8/27/ed/f827ed9a704146f65b96226f430abf3c.png"
                    roomName="My Room"
                    hostName="Dat"
                    desImg="https://mocah.org/uploads/posts/923896-pixel-art-town-city-waneella.jpg"
                    currentUser={6}
                    maxUser={35}
                    desText="Nơi giao lưu kết bạn tâm giao,..."
                />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <MyRoomCard
                    avtSrc="https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png"
                    roomName="Default"
                    hostName=""
                    desImg="https://t3.ftcdn.net/jpg/02/16/90/02/360_F_216900207_Qzsnl42GZPn6tRa86DeI1ioY4M0pz0eF.jpg"
                    currentUser={5}
                    maxUser={30}
                    desText="Nơi giao lưu kết bạn tâm giao,..."
                />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <MyRoomCard
                    avtSrc="https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png"
                    roomName="Back to hometown"
                    hostName=""
                    desImg="https://i.pinimg.com/originals/7d/76/72/7d76721a7c0e9121f19c6641762fa968.png"
                    currentUser={6}
                    maxUser={45}
                    desText="Nơi giao lưu kết bạn tâm giao,..."
                />
            </Grid>
        </Grid>
    );
};

export default MyRoom;