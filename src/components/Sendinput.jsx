import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { addOrUpdateConversation } from "../redux/conversationSlice";
import { VscSend } from "react-icons/vsc";
import { MdTranslate, MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { setSelectedMessageForEdit } from "../redux/messageSlice";

const Sendinput = () => {
    const { authUser, selectedUser } = useSelector(store => store.user);
    const { selectedMessageForEdit } = useSelector(store => store.message);

    const dispatch = useDispatch();
    const textareaRef = useRef(null);

    const [usersMessage, setUsersMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setUsersMessage(selectedMessageForEdit.message);
    }, [selectedMessageForEdit]);

    useEffect(()=>{
        dispatch(setSelectedMessageForEdit(''))
        setUsersMessage('')
    },[selectedUser])

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
            dispatch(addOrUpdateConversation(responseData?.data?.gotConversation));
            setUsersMessage("");
        } catch (error) {
            console.error("Error in sending message:", error.response?.data);
            toast.error(error.response?.data.message);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            messageSubmitHandler(event);
        }
    };
    const translate = async () => {
        try {
            setIsLoading(true)
            const responseData = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/message/translate`,
                { message: usersMessage, targetLanguage: authUser?.translateMessageTo },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            setUsersMessage(responseData?.data?.translatedMessage)
        } catch (error) {
            console.error("Error in translating message:", error.response?.data);
            toast.error(error.response?.data?.message);
        }
        finally {
            setIsLoading(false)
        }
    }
    const handleCancelEdit = () => {
        dispatch(setSelectedMessageForEdit(''))
        setUsersMessage('')
    }
    return (
        <div className="absolute bottom-0 w-full border-r border-b border-t bg-white z-10">
            {
                selectedMessageForEdit &&
                <div className="border h-[4rem] p-2">
                    <div className="bg-green-100 h-full flex items-center gap-2 px-2">
                        <div className="text-[1.2rem] text-green-800">
                            <MdEdit />
                        </div>
                        <div>
                            <div className=" text-[0.8rem] font-semibold text-green-800">
                                Edit Message
                            </div>
                            <div className="text-[0.8rem]">
                                {
                                    selectedMessageForEdit?.message
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            <form onSubmit={messageSubmitHandler} className="flex items-center px-2 py-1">
                <textarea
                    ref={textareaRef}
                    placeholder="Type a message..."
                    onKeyDown={handleKeyDown}
                    value={usersMessage}
                    onChange={(e) => setUsersMessage(e.target.value)}
                    style={{ resize: "none", overflow: "hidden" }}
                    className="outline-none w-full px-1 bg-transparent rounded-md"
                />
                {
                    selectedMessageForEdit &&
                    <div onClick={handleCancelEdit} className="mr-4 text-[1.5rem] hover:bg-zinc-100 p-1 rounded-sm cursor-pointer">
                        <RxCross2 />
                    </div>
                }
                <div onClick={translate} className={`text-[1.5rem] cursor-pointer mr-4 ${usersMessage ? 'block' : 'hidden'}`}>
                    {
                        isLoading ? <div className="loading loading-spinner text-secondary"></div>
                            : <MdTranslate />
                    }
                </div>
                <button type="submit" className=" text-[1.5rem]">
                    <VscSend />
                </button>
            </form>
        </div>
    );
};

export default Sendinput;
