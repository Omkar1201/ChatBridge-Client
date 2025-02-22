import { CiSearch, CiLogout } from "react-icons/ci";
import Otherusers from "./Otherusers";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { RxCross2 } from "react-icons/rx";
import Setting from "./Setting";
import { LuSettings } from "react-icons/lu";

const Sidebar = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [showSettings, setShowSettings] = useState(false);

    const { otherUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        setDisplayedUsers(otherUsers);
    }, [otherUsers]);

    useEffect(() => {
        if (search.trim() === "") {
            setDisplayedUsers(otherUsers);
        } else {
            const normalizedSearch = search.replace(/\s+/g, '').toLowerCase();
            const filteredUsers = otherUsers.filter((user) => {
                const normalizedUsername = user.username.replace(/\s+/g, '').toLowerCase();
                const normalizedFullName = user.fullName.replace(/\s+/g, '').toLowerCase();

                return normalizedUsername.includes(normalizedSearch) ||
                    normalizedFullName.includes(normalizedSearch);
            });
            if (filteredUsers.length > 0) {
                setDisplayedUsers(filteredUsers);
            } else {
                setDisplayedUsers([]);
            }
        }
    }, [search, otherUsers]);

    const logOutHandler = async () => {
        try {
            const responseData = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/user/logout`,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            dispatch(setAuthUser(null));
            toast.success(responseData.data.message);
            navigate('/signin');
        } catch (error) {
            console.error("Error in Logout:", error.response?.data);
            toast.error(error.response?.data?.message || "Logout failed. Please try again.");
        }
    };

    return (
        <div className="flex relative overflow-hidden flex-col h-screen w-[35rem] border-black px-4 pt-2">
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center px-2 justify-between rounded-2xl mx-4 border border-zinc-300">
                <div className="cursor-text text-2xl text-zinc-400">
                    <CiSearch />
                </div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-[2.5rem] w-full px-2 rounded-2xl outline-none"
                />
                {search && (
                    <div
                        className="cursor-pointer text-2xl text-zinc-500"
                        onClick={() => setSearch("")}
                    >
                        <RxCross2 />
                    </div>
                )}
            </form>

            <div className="flex-grow overflow-y-auto mt-4 custom-scrollbar">
                {
                    displayedUsers.length > 0 ? (
                        <Otherusers otherUsers={displayedUsers} search={search} />
                    ) : (
                        <div className=" h-full items-center justify-center flex">No result</div>
                    )
                }
            </div>

            <div className="text-start h-[4rem] flex items-center justify-between px-4 ">
                <button onClick={logOutHandler} className="cursor-pointer text-2xl text-zinc-500" title="LogOut">
                    <CiLogout />
                </button>
                <button onClick={() => setShowSettings(!showSettings)} className={` ${showSettings ? ' -rotate-90' : ''} transition duration-75 cursor-pointer text-2xl text-zinc-500`} title="Setting" ><LuSettings /></button>
            </div>
            <div
                className={`absolute inset-0 bg-white z-50 transition-transform duration-300 
                    ${showSettings ? "translate-x-0" : "translate-x-full"}`}
            >
                <button
                    onClick={() => setShowSettings(false)}
                    className="absolute top-4 right-4 text-[1.5rem] rounded-full p-2 hover:bg-gray-100 "
                    title="Close"
                >
                    <RxCross2 />
                </button>
                <Setting />
            </div>
        </div>
    );
};

export default Sidebar;
