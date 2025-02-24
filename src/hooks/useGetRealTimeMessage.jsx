import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addOrUpdateConversation } from "../redux/conversationSlice"
import { useSocket } from "../context/SocketContext"

const useGetRealTimeMessage = () => {
    const dispatch = useDispatch();
    const { getSocket } = useSocket();
    const socket = getSocket();

    useEffect(() => {
        const handleNewMessage = (conversation) => {
            // Update Redux store with the new/updated conversation
            dispatch(addOrUpdateConversation(conversation));
        };

        socket?.on("newOrUpdatedConversation", handleNewMessage);

        return () => {
            socket?.off("newOrUpdatedConversation", handleNewMessage);
        };
    }, [socket, dispatch]);
};

export default useGetRealTimeMessage