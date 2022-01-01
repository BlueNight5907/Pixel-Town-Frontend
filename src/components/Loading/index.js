import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import "./style.scss";
import { useSelector } from 'react-redux';
export default function Loading() {
  const {loading} = useSelector(state => state.notificationReducer)
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <div className="loading">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
      </Backdrop>
    </div>
  );
}