import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';
import { setIsLoading } from '../redux/loadingSlice';
import { useNavigate } from 'react-router-dom';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    useEffect(() => {
        const fetchOtherUsers = async () => {
            dispatch(setIsLoading(true));
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/user/`,
                    { withCredentials: true }
                );
                dispatch(setOtherUsers(response.data?.otherUsers));
            } catch (error) {
                navigate('/signin')
                toast.error(error.response?.data.message);
            }
            finally{
                dispatch(setIsLoading(false));
            }
        };
        fetchOtherUsers();
        // eslint-disable-next-line
    }, [dispatch]);
};

export default useGetOtherUsers;