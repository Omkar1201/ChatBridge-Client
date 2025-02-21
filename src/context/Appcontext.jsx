import { createContext, useEffect } from "react";
import { io } from "socket.io-client";
export const Appcontext=createContext()
const AppcontextProvider=({children})=>{

    useEffect(()=>{
        const socket = io(process.env.REACT_APP_BASE_URL.replace("/api/v1",""),{
            auth: { token: `${localStorage.getItem('authToken')}` }
        });
        socket.on('getOnlineUsers',(data)=>{
            console.log(data);
        })
    },[])

    return(
        <Appcontext.Provider
            value={{

            }}
        >
            {children}
        </Appcontext.Provider>
    )
}
export default AppcontextProvider;