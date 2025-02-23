import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import { useSocket } from '../context/SocketContext';

const useGetMessages = () => {
    const { selectedUser } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const { getSocket } = useSocket();

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUser?._id) return;
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/message/${selectedUser?._id}`,
                    { withCredentials: true }
                );
                dispatch(setMessages(response.data?.messages));
            } catch (error) {
                toast.error(error.response?.data.message);
            }
        };

        fetchMessages();

        const socket = getSocket();
        const handleNewMessage = (newMessage) => {
            // Handle new messages if needed
        };

        socket?.on('newMessage', handleNewMessage);
        return () => {
            socket?.off('newMessage', handleNewMessage);
        };
    }, [selectedUser, dispatch, getSocket]);
};

export default useGetMessages;