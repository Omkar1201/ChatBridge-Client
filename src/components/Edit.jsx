import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa6";
import { MdOutlineAddAPhoto } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { setAuthUser } from "../redux/userSlice";

const Edit = () => {
    const { authUser } = useSelector((store) => store.user);

    const dispatch = useDispatch()

    const [username, setUsername] = useState(authUser?.username || "");
    const [fullName, setfullName] = useState(authUser?.fullName || "");
    const [bio, setBio] = useState(authUser?.bio || "");
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isfullNameFocused, setIsfullNameFocused] = useState(false);
    const [isBioFocused, setIsBioFocused] = useState(false);
    const [isContentSame,setIscontentSame] = useState(false)

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(authUser?.profilePhoto || "");
    const [base64Image, setBase64Image] = useState("");

    useEffect(() => {
        if (!selectedFile) {
            setPreviewUrl(authUser?.profilePhoto || "");
            setBase64Image("");
            return;
        }
        // Create preview URL for displaying the image
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(objectUrl);

        // Convert file to base64 string
        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64Image(reader.result);
        };
        reader.readAsDataURL(selectedFile);

        return () => URL.revokeObjectURL(objectUrl);
        // eslint-disable-next-line
    }, [selectedFile]);

    useEffect(()=>{
        setIscontentSame(username===authUser?.username && fullName===authUser?.fullName && bio===authUser?.bio && previewUrl===authUser?.profilePhoto)
        // eslint-disable-next-line
    },[username,fullName,bio,previewUrl])

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/jpg")) {
            setSelectedFile(file);
        } else {
            toast.error("Please select a JPG image.");
        }
    };

    const handleCancelEdit = (event) => {
        event.preventDefault();
        setUsername(authUser?.username || "");
        setBio(authUser?.bio || "");
        setfullName(authUser?.fullName || "");
        setSelectedFile(null);
    };

    const handleEdit = async (event) => {
        event.preventDefault();

        const payload = {
            fullName,
            username,
            email: authUser?.email,
            bio,
            profilePhoto: base64Image, // sending base64 string
        };

        try {
            const responseData = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/user/edit`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            dispatch(setAuthUser(responseData?.data?.updatedUserData))
            toast.success(`${responseData?.data?.message}`);
        } catch (error) {
            console.error("Error updating profile:", error.response?.data);
            toast.error(
                error.response?.data?.message || "Profile update failed. Please try again."
            );
        }
    };

    return (
        <div className="px-4 pt-2">
            <div className="text-[1.5rem] font-semibold mt-2">Edit</div>
            <div className="flex justify-center my-10">
                <div className="w-32 h-32 border-black relative rounded-full overflow-hidden group cursor-pointer">
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Selected Preview"
                            className="group-hover:bg-opacity-10"
                        />
                    ) : (
                        <div className="relative w-full h-full">
                            <div className="text-[4rem] text-zinc-400 bg-zinc-300 rounded-full h-full flex justify-center items-center">
                                <FaUser />
                            </div>
                        </div>
                    )}
                    <input
                        type="file"
                        accept=".jpg, .jpeg"
                        onChange={handleFileChange}
                        className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-[4rem] absolute top-8 right-9 text-black transition hidden group-hover:block">
                        <MdOutlineAddAPhoto />
                    </div>
                </div>
            </div>
            <div className="w-full rounded-lg">
                <form onSubmit={handleEdit}>
                    <div className="relative mb-8">
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setfullName(e.target.value)}
                            onFocus={() => setIsfullNameFocused(true)}
                            onBlur={() => setIsfullNameFocused(false)}
                            className="w-full transition duration-[0.2s] px-3 py-2.5 text-base outline-none hover:border-blue-300 border-2 border-gray-300 rounded-md focus:border-blue-500"
                        />
                        <label
                            className={`absolute left-3 pointer-events-none transition-all duration-300 ${fullName
                                ? "-top-2 left-2 text-xs bg-white px-2"
                                : "top-[0.55rem]"
                                } ${isfullNameFocused ? "text-blue-500" : ""} text-gray-500`}
                        >
                            Fullname
                        </label>
                    </div>

                    <div className="relative mb-8">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onFocus={() => setIsUsernameFocused(true)}
                            onBlur={() => setIsUsernameFocused(false)}
                            className="w-full transition duration-[0.2s] px-3 py-2.5 text-base outline-none hover:border-blue-300 border-2 border-gray-300 rounded-md focus:border-blue-500"
                        />
                        <label
                            className={`absolute left-3 pointer-events-none transition-all duration-300 ${username
                                ? "-top-2 left-2 text-xs bg-white px-2"
                                : "top-[0.55rem]"
                                } ${isUsernameFocused ? "text-blue-500" : ""} text-gray-500`}
                        >
                            Username
                        </label>
                    </div>

                    <div className="relative mb-8">
                        <input
                            type="text"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            onFocus={() => setIsBioFocused(true)}
                            onBlur={() => setIsBioFocused(false)}
                            className="w-full transition duration-[0.2s] px-3 py-2.5 text-base outline-none hover:border-blue-300 border-2 border-gray-300 rounded-md focus:border-blue-500"
                        />
                        <label
                            className={`absolute left-3 pointer-events-none transition-all duration-300 ${bio ? "-top-2 left-2 text-xs bg-white px-2" : "top-[0.55rem]"
                                } ${isBioFocused ? "text-blue-500" : ""} text-gray-500`}
                        >
                            Bio
                        </label>
                    </div>

                    <div className="flex justify-between border-black">
                        <button
                            onClick={handleCancelEdit}
                            className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`bg-blue-500 ${isContentSame ? 'opacity-50' :'hover:bg-blue-600'} text-white px-5 py-2 rounded-md transition duration-[0.2s] focus:outline-none focus:ring-2 focus:ring-blue-300`}
                            disabled={isContentSame}
                        >
                            Edit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
