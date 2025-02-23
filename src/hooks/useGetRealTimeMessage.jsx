import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage=()=>{
    const{socket}=useSelector(store=>store.socket);
    const{messages}=useSelector(store=>store.message);
    const dispatch=useDispatch();
    console.log("allmessage",messages);
    
    useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{   
            console.log(newMessage);
                     
            dispatch(setMessages([...messages,newMessage]))
        })
        // eslint-disable-next-line
    },[socket,setMessages,messages])
}
export default useGetRealTimeMessage