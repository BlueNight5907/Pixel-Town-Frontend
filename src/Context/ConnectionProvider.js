import React, { createContext } from 'react'
import useSignalR from '../custom_hooks/useSignalR'
export const ConnectionContext = createContext()
function ConnectionProvider({children}) {
    const signalR_hook = useSignalR(`https://localhost:5001/hub/room`)
    return (
        <ConnectionContext.Provider value={{
            useSignalR:signalR_hook
        }}>
            {children}
        </ConnectionContext.Provider>
    )
}

export default ConnectionProvider
