import { useSelector } from "react-redux"
import { FaUser } from "react-icons/fa6";
import { FiAtSign } from "react-icons/fi";
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";

const Setting = () => {
    const { authUser } = useSelector(store => store.user)
    console.log(authUser);
    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(authUser.username)
            toast.success('Copied')
        }
        catch (error) {
            toast.error('Cant copy!')
        }

    }
    return (
        <div>
            <div className="bg-white px-4 pt-2 pb-5 h-full border-b ">
                <div className={`text-[1.5rem] font-semibold `}>Setting</div>
                <div className="flex justify-end text-[1.5rem] mt-4">
                    <div className="hover:bg-gray-100 p-2 cursor-pointer rounded-full">
                        <MdEdit />
                    </div>
                </div>
                <div className=" flex flex-col gap-2 items-center justify-center">
                    <div className={` w-32 h-32 rounded-full `}>
                        {
                            authUser?.profilePhoto && authUser.profilePhoto.trim() !== '' ? (
                                <img src={authUser.profilePhoto} alt="Profile" />
                            ) : (
                                <div className="text-[4rem] text-zinc-400 bg-zinc-300 rounded-full h-full flex justify-center items-center">
                                    <FaUser />
                                </div>
                            )
                        }
                    </div>
                    <div className="text-[1.2rem] font-semibold">
                        {
                            authUser.fullName
                        }
                    </div>

                </div>
                <div className="flex items-center gap-8 cursor-pointer " onClick={handleCopyClick} >
                    <div className="text-[1.5rem] text-gray-500"><FiAtSign /></div>
                    <div className="flex flex-col">
                        <div className="text-[1.2rem]">
                            {
                                authUser.username
                            }
                        </div>
                        <div className="text-gray-500">
                            Username
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Setting