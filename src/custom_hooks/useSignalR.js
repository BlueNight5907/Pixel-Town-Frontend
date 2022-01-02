import { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import {
    JsonHubProtocol,
    HubConnectionState,
    HubConnectionBuilder,
    LogLevel
} from "@microsoft/signalr"

const isDev = process.env.NODE_ENV === 'development';

const startSignalRConnection = async connection => {
    try {
      await connection.start();
      console.assert(connection.state === HubConnectionState.Connected);
      console.log('SignalR connection established. Connection Id: '+ connection.connectionId);
    } catch (err) {
      console.assert(connection.state === HubConnectionState.Disconnected);
      console.error('SignalR Connection Error: ', err);
      setTimeout(() => startSignalRConnection(connection), 5000);
    }
  };

function useSignalR(connectionHub) {
    const [signalR,setSignalR] = useState(null)
    const [roomId, setRoomId] = useState(null)
    const {currentUser} = useSelector(state => state.authReducer)
    useEffect(()=>{
        let claim = false;
        //option for signalR
        const options = {
            accessTokenFactory: ()=> currentUser.accessToken,
            logMessageContent: isDev,
            logger: isDev ? LogLevel.Warning : LogLevel.Error,
            
        };
        //check if count is change
        if(!signalR && connectionHub && currentUser?.accessToken){
            console.log(currentUser.accessToken)
            async function createConnection(){
                const connection = new HubConnectionBuilder()
                                .withUrl(connectionHub, options)
                                .withAutomaticReconnect()
                                .withHubProtocol(new JsonHubProtocol())
                                .configureLogging(LogLevel.Information)
                                .build();
                connection.serverTimeoutInMilliseconds = 60000;
                // re-establish the connection if connection dropped
                connection.onclose(error => {
                    console.assert(connection.state === HubConnectionState.Disconnected);
                    console.log('Connection closed due to error. Try refreshing this page to restart the connection', error);
                });

                connection.onreconnecting(error => {
                    console.assert(connection.state === HubConnectionState.Reconnecting);
                    console.log('Connection lost due to error. Reconnecting.', error);
                });

                connection.onreconnected(connectionId => {
                    console.assert(connection.state === HubConnectionState.Connected);
                    console.log('Connection reestablished. Connected with connectionId', connectionId);
                });
                connection.on("error", data => console.log(data))
                await startSignalRConnection(connection);
                setSignalR(connection);
            }
            createConnection();
        }
        return ()=>{
            if(signalR){
                console.log("Hello")
                signalR.stop()
            }
        }
    },[signalR,connectionHub,currentUser?.accessToken,currentUser])

    const sendShortMessage = (message)=>{
        message?.length > 0 && signalR.invoke("ShortMessage",roomId,message)
    }
    return {
        signalR,
        setRoomId,
        sendShortMessage
    }
}

export default useSignalR