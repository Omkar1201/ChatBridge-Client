import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { FaUser } from "react-icons/fa6";
const Otherusers = ({ otherUsers, search }) => {
    const dispatch = useDispatch();

    const { selectedUser, onlineUsers, authUser } = useSelector(store => store.user);
    const { allConversations } = useSelector((store) => store.conversation);

    if (!otherUsers) return;

    const highlightText = (text, search) => {
        if (!search) return text;

        const regex = new RegExp(`(${search})`, 'gi');
        return text.split(regex).map((part, index) =>
            part.toLowerCase() === search.toLowerCase() ? (
                <span key={index} className="text-blue-500">{part}</span>
            ) : part
        );
    };

    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    };

    const getLastMessage = (user) => {
        const userId = user._id
        const conversation = allConversations.find(convo =>
            convo.participants.includes(authUser._id) && convo.participants.includes(userId)
        );
        if (!conversation || conversation.messages.length === 0) return user.bio;
        const lastMessage = conversation.messages[conversation.messages.length - 1];
        return lastMessage.message.length > 20 ? lastMessage.message.substring(0, 20) + "..." : lastMessage.message;
    };

    return (
        <div className="py-4 flex flex-col gap-1">
            {
                otherUsers?.map((user, index) => (
                    <div
                        className={`${user._id === selectedUser?._id ? 'bg-zinc-200' : 'hover:bg-zinc-100'} relative rounded-lg cursor-pointer flex items-center gap-3 h-[4rem] py-2 px-2`}
                        key={index}
                        onClick={() => selectedUserHandler(user)}
                    >
                        <div className="w-10 overflow-hidden rounded-full border h-10">
                            {user.profilePhoto ? (
                                <img src={user.profilePhoto} alt="img" onError={(e) => e.target.style.display = 'none'} />
                            ) : (
                                <div className="text-[1.2rem] text-zinc-400 bg-zinc-300 rounded-full h-full flex justify-center items-center">
                                    <FaUser />
                                </div>
                            )}
                        </div>
                        <div className={`p-1 rounded-full absolute top-4 left-10 ${onlineUsers?.includes(user._id) ? 'bg-green-500' : ''}`}></div>
                        <div className="flex flex-col h-full justify-center">
                            <div className="">
                                {highlightText(user.fullName, search)}
                            </div>
                            <div className="text-[0.8rem] text-gray-600">
                                {
                                    getLastMessage(user)
                                }
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};


export default Otherusers