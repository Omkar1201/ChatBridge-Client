import Messages from "./Messages";
import Sendinput from "./Sendinput";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa6";

const Messagecontainer = () => {
    const { selectedUser, onlineUsers } = useSelector(store => store.user);

    return (
        <div className="h-screen w-screen border-black flex flex-col">
            <div className="h-[3.2rem] gap-4 items-center justify-start flex px-4 text-[1.1rem] border font-semibold">
                <div className="w-10 border rounded-full h-10">
                    {
                        selectedUser && selectedUser.profilePhoto ? (
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
        </div>
    );
};

export default Messagecontainer;
