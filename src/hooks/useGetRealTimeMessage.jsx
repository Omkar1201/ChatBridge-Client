import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addOrUpdateConversation, setAllConversations, setMessages } from "../redux/messageSlice"
import { useSocket } from "../context/SocketContext"
// useGetRealTimeMessage.js
const useGetRealTimeMessage = () => {
    const dispatch = useDispatch();
    const { getSocket } = useSocket();
    const socket = getSocket();

    useEffect(() => {
        const handleNewMessage = (conversation) => {
            // Update Redux store with the new/updated conversation
            dispatch(addOrUpdateConversation(conversation));
        };

        socket?.on("newMessage", handleNewMessage);

        return () => {
            socket?.off("newMessage", handleNewMessage);
        };
    }, [socket, dispatch]);
};

export default useGetRealTimeMessage