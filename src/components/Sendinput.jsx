import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { setMessages } from "../redux/messageSlice";
import { VscSend } from "react-icons/vsc";

const Sendinput = () => {
    const [usersMessage, setUsersMessage] = useState("");
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);
    const dispatch = useDispatch();
    const textareaRef = useRef(null);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto"; 
            textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [usersMessage]);

    const messageSubmitHandler = async (event) => {
        event.preventDefault();
        if (!usersMessage.trim()) return;
        try {
            const responseData = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/message/send/${selectedUser?._id}`,
                { message: usersMessage },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            dispatch(setMessages([...messages, responseData?.data?.message]));
        } catch (error) {
            console.error("Error in sending message:", error.response?.data);
            toast.error(error.response?.data.message);
        }
        setUsersMessage("");
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            messageSubmitHandler(event);
        }
    };

    return (
        <div className="absolute bottom-0 w-full border border-black bg-white z-10">
            <form onSubmit={messageSubmitHandler} className="flex items-center px-2 py-1">
                <textarea
                    ref={textareaRef}
                    placeholder="Type a message..."
                    onKeyDown={handleKeyDown}
                    value={usersMessage}
                    onChange={(e) => setUsersMessage(e.target.value)}
                    style={{ resize: "none", overflow: "hidden" }}
                    className="outline-none w-full bg-transparent rounded-md"
                />
                <button type="submit" className=" text-[1.5rem]">
                    <VscSend/>
                </button>
            </form>
        </div>
    );
};

export default Sendinput;
