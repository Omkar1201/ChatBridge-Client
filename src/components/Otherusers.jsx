import { useDispatch, useSelector } from "react-redux";
import useGetOtherUsers from "../hooks/useGetOtherUsers"
import { setSelectedUser } from "../redux/userSlice";
import { FaUser } from "react-icons/fa6";
const Otherusers = ({ otherUsers, search }) => {
    useGetOtherUsers();
    const dispatch = useDispatch();

    const { selectedUser, onlineUsers } = useSelector(store => store.user);

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

    return (
        <div className="py-4 flex flex-col gap-1">
            {
                otherUsers?.map((user, index) => (
                    <div
                        className={`${user._id === selectedUser?._id ? 'bg-zinc-200' : 'hover:bg-zinc-100'} relative rounded-lg cursor-pointer flex items-center gap-2 py-[0.7rem] px-2`}
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
                        <div>
                            {highlightText(user.fullName, search)}
                        </div>
                    </div>
                ))}
        </div>
    );
};


export default Otherusers