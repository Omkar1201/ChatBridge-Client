import axios from "axios";
import { useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { setMessages } from "../redux/messageSlice";

const Sendinput = () => {
    const [usersMessage, setUsersMessage] = useState("");
    const { selectedUser } = useSelector(store => store.user)
    const { messages } = useSelector(store => store.message)
    const dispatch=useDispatch()

    const messageSubmitHandler = async (event) => {
        event.preventDefault();
        try {

            const responseData = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/message/send/${selectedUser?._id}`,
                { message: usersMessage },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            )
            dispatch(setMessages([...messages,responseData?.data?.message]))
        }
        catch (error) {
            console.error("Error in sending message:", error.response?.data);
            toast.error(error.response?.data.message)
        }
        setUsersMessage("")
    }
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            messageSubmitHandler(event);
        }
    };
    return (
        <div className={` w-full border-black h-[3.2rem] px-2 border  `}>
            <form onSubmit={messageSubmitHandler} className="flex justify-between items-center" >
                <textarea type="text" placeholder="Type a message..."
                    onKeyDown={handleKeyDown}
                    value={usersMessage} onChange={(e) => setUsersMessage(e.target.value)}
                    style={{ height: 'auto', resize: 'none', overflow: 'hidden' }}
                    className={`outline-none w-full bg-transparent `}
                />
                <button type="submit" className={`text-[1.5rem]`} >
                    <LuSendHorizontal />
                </button>
            </form>
        </div>
    )
}
export default Sendinput