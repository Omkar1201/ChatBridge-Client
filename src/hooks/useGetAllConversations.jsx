import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAllConversations } from '../redux/conversationSlice';

const useGetAllConversations = () => {
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
                if (!error.response) {
                    toast.error("Please check your internet connection");
                }
                else {
                    toast.error(error.response.data?.message);
                }
            }
        };

        fetchConversations();
        // eslint-disable-next-line 
    }, []);
};

export default useGetAllConversations;