import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setAllConversations } from '../redux/conversationSlice';

const useGetAllConversations = () => {
    const { selectedUser } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const responseData = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/message/getconversations`,
                    { withCredentials: true }
                );

                dispatch(setAllConversations(responseData.data?.conversations));
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        };

        fetchConversations();

    }, []);
};

export default useGetAllConversations;