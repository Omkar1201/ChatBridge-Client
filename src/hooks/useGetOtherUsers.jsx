import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/user/`,
                    { withCredentials: true }
                );
                dispatch(setOtherUsers(response.data?.otherUsers));
            } catch (error) {
                toast.error(error.response?.data.message);
            }
        };
        fetchOtherUsers();
    }, [dispatch]);
};

export default useGetOtherUsers;