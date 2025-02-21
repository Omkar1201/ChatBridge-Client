import { useEffect } from "react"
import axios from 'axios'
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { setOtherUsers } from "../redux/userSlice"

const useGetOtherUsers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                const responseData = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/user/`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true, //Required to send/receive cookies
                    }
                )
                dispatch(setOtherUsers(responseData.data.otherUsers))
                // console.log(responseData);
            }
            catch (error) {
                toast.error(error.response?.data.message)
            }
        }
        fetchOtherUsers();
        // eslint-disable-next-line
    }, [])
}
export default useGetOtherUsers