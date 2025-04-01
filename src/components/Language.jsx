import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { GoArrowLeft } from "react-icons/go";
import axios from "axios";
import { setAuthUser } from "../redux/userSlice";
import toast from "react-hot-toast";

const languages = [
    { code: "auto", language: "Automatic" },
    { code: "af", language: "Afrikaans" },
    { code: "ar", language: "Arabic" },
    { code: "as", language: "Assamese" },
    { code: "az", language: "Azerbaijani" },
    { code: "be", language: "Belarusian" },
    { code: "bn", language: "Bengali" },
    { code: "bho", language: "Bhojpuri" },
    { code: "zh", language: "Chinese (Simplified)" },
    { code: "zh-cn", language: "Chinese (Simplified, PRC)" },
    { code: "zh-tw", language: "Chinese (Traditional, Taiwan)" },
    { code: "zh-sg", language: "Chinese (Simplified, Singapore)" },
    { code: "zh-hk", language: "Chinese (Traditional, Hong Kong)" },
    { code: "da", language: "Danish" },
    { code: "doi", language: "Dogri" },
    { code: "nl", language: "Dutch" },
    { code: "en", language: "English" },
    { code: "fr", language: "French" },
    { code: "de", language: "German" },
    { code: "el", language: "Greek" },
    { code: "gu", language: "Gujarati" },
    { code: "he", language: "Hebrew" },
    { code: "hi", language: "Hindi" },
    { code: "hu", language: "Hungarian" },
    { code: "id", language: "Indonesian" },
    { code: "ga", language: "Irish" },
    { code: "it", language: "Italian" },
    { code: "ja", language: "Japanese" },
    { code: "kn", language: "Kannada" },
    { code: "ko", language: "Korean" },
    { code: "la", language: "Latin" },
    { code: "ml", language: "Malayalam" },
    { code: "mr", language: "Marathi" },
    { code: "mn", language: "Mongolian" },
    { code: "ne", language: "Nepali" },
    { code: "or", language: "Odia" },
    { code: "fa", language: "Persian" },
    { code: "pt", language: "Portuguese" },
    { code: "pa", language: "Punjabi" },
    { code: "ro", language: "Romanian" },
    { code: "ru", language: "Russian" },
    { code: "sa", language: "Sanskrit" },
    { code: "sr", language: "Serbian" },
    { code: "es", language: "Spanish" },
    { code: "sv", language: "Swedish" },
    { code: "ta", language: "Tamil" },
    { code: "te", language: "Telugu" },
    { code: "th", language: "Thai" },
    { code: "tr", language: "Turkish" },
    { code: "uk", language: "Ukrainian" },
    { code: "ur", language: "Urdu" },
    { code: "vi", language: "Vietnamese" },
];
const Language = ({ setShowLanguages }) => {
    const { authUser } = useSelector(store => store.user)
    const [selectedLanguage, setSelectedLanguage] = useState(authUser?.translateMessageTo);

    const dispatch = useDispatch()
    const handleChange = async (event) => {
        event.preventDefault();
        const payload = {
            fullName: authUser?.fullName,
            username: authUser?.username,
            email: authUser?.email,
            bio: authUser?.bio,
            profilePhoto: authUser?.profilePhoto,
            translateMessageTo: event.target.value
        };

        try {
            const responseData = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/v1/user/edit`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            setSelectedLanguage(event.target.value);
            dispatch(setAuthUser(responseData?.data?.updatedUserData))
            toast.success(`Language selected!`)            
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Profile update failed. Please try again."
            );
        }
    };
    
    return (
        <div className="px-4 pt-2 h-full">
            <div className="text-[1.5rem] font-semibold mt-2 flex items-center gap-4">
                <div onClick={() => setShowLanguages(false)} className="cursor-pointer hover:bg-gray-100 rounded-full p-2">
                    <GoArrowLeft />
                </div>
                Languages
            </div>
            <div className=" text-blue-500 font-semibold my-4">
                Translate Messages
            </div>
            <div className="py-2 text-[1.1rem] h-full">
                <div className="my-2">
                    Translate Message to
                </div>
                <div className="radio-container flex flex-col overflow-auto h-full">
                    {languages.map((lang, index) => (
                        <label key={index} className={`${selectedLanguage===lang.code ? 'bg-zinc-200' : 'hover:bg-zinc-100'} group px-2 py-2 flex items-center gap-2 cursor-pointer rounded-md`}>
                            <input
                                type="radio"
                                name="language"
                                value={lang.code}
                                checked={selectedLanguage === lang.code}
                                onChange={handleChange}
                                className="hidden"
                            />
                            <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center transition-colors duration-200 group-has-[:checked]:border-blue-500">
                                <div className="w-2.5 h-2.5 rounded-full transform transition-all duration-200 scale-0 group-has-[:checked]:scale-100 bg-blue-500"></div>
                            </div>
                            <span className="text-gray-700">{lang.language}</span>
                        </label>
                    ))}
                </div>

            </div>
        </div>
    )
}
export default Language