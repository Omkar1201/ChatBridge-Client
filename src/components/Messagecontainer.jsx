import Messages from "./Messages";
import Sendinput from "./Sendinput";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";

const Messagecontainer = () => {
    const { selectedUser, onlineUsers, authUser } = useSelector(store => store.user);

    return (
        <div className="h-screen w-screen border-black flex flex-col">
            {
                selectedUser ? (
                    <>
                        <div className="flex justify-between items-center border px-4">
                            <div className="h-[3.2rem] gap-4 items-center justify-start flex text-[1.1rem]  font-semibold">
                                <div className="w-10 border rounded-full h-10 overflow-hidden">
                                    {
                                        selectedUser?.profilePhoto ? (
                                            <img src={selectedUser.profilePhoto} alt="img" />
                                        ) : (
                                            <div className={`text-[1.2rem] text-zinc-400 bg-zinc-300 rounded-full h-full flex justify-center items-center`}>
                                                <FaUser />
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="flex flex-col items-start">
                                    {
                                        selectedUser ? (
                                            <>
                                                <div>{selectedUser.fullName}</div>
                                                <div className="text-[0.8rem] text-gray-500">
                                                    {
                                                        onlineUsers?.includes(selectedUser._id) ? (
                                                            <div>online</div>
                                                        ) : (
                                                            <>
                                                                last seen&nbsp;
                                                                {
                                                                    new Date(selectedUser.lastSeen).toLocaleString('en-US', {
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                        hourCycle: 'h23'
                                                                    })
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="text-[1.4rem] p-1 rounded-full"><HiOutlineDotsVertical /></div>
                        </div>
                        {selectedUser && (
                            <div className="flex flex-col flex-grow ">
                                <div className="flex-grow overflow-y-auto">
                                    <Messages />
                                </div>
                                <div className=" relative">
                                    <Sendinput />
                                </div>
                            </div>
                        )}
                    </>
                ) :
                    (<div className="border h-full flex items-center text-center text-[1.2rem] font-smibold justify-center">
                        Hi, {authUser?.fullName}<br></br>
                        Let's Start Conversation
                    </div>)
            }
        </div>
    );
};

export default Messagecontainer;
