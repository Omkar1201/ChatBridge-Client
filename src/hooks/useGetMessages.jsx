import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { setMessages } from "../redux/messageSlice"

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user)
    
    const dispatch=useDispatch()
    useEffect(() => {
        if (!selectedUser?._id) return;

        const fetchMessages = async () => {
            try {
                const responseData = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/message/${selectedUser?._id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true, 
                    }
                )
                dispatch(setMessages(responseData.data?.messages))
                // console.log(responseData.data.messages);
            }
            catch (error) {
                console.log(error.response?.data.message);
                toast.error(error.response?.data.message)
            }
        }
        fetchMessages()
        // eslint-disable-next-line
    }, [selectedUser])
}

export default useGetMessages