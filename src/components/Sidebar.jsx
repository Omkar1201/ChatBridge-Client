import { CiSearch, CiLogout } from "react-icons/ci";
import Otherusers from "./Otherusers";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { RxCross2 } from "react-icons/rx";

const Sidebar = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [displayedUsers, setDisplayedUsers] = useState([]);

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
        <div className="flex flex-col h-screen w-[35rem] border-black px-4 pt-2">
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

            <div className="text-start h-[4rem]">
                <button onClick={logOutHandler} className="cursor-pointer text-2xl text-zinc-500" title="LogOut">
                    <CiLogout />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
