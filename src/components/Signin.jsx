import { useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";


const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignin = async (event) => {
        event.preventDefault();
        try {
            // axios.defaults.withCredentials=true;
            const responseData = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/user/signin`,
                { username, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, //Required to send/receive cookies
                }
            )

            console.log(responseData);
            navigate('/')
            const { token, success, ...userData } = responseData.data
            dispatch(setAuthUser(userData))

            toast.success(responseData.data.message)
        }
        catch (error) {
            console.error("Error signing in:", error.response?.data);
            toast.error(error.response?.data.message)
        }
    }
    return (
        <div className="bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 p-10 border border-gray-300 rounded-lg">
            <form onSubmit={handleSignin} className="">
                <div className="relative mb-8">
                    <input type="username" value={username} onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => setIsUsernameFocused(true)}
                        onBlur={() => setIsUsernameFocused(false)}
                        className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-md focus:border-2 focus:border-blue-500 focus:outline-none"
                        required
                    />
                    <label
                        className={`absolute left-3 pointer-events-none transition-all duration-300 ${username || isUsernameFocused
                            ? '-top-2 left-2 text-blue-500 text-xs bg-white px-2'
                            : 'top-[0.55rem] text-gray-500'
                            }`}
                    >
                        Username
                    </label>
                </div>

                <div className="relative mb-8">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-md focus:border-2 focus:border-blue-500 focus:outline-none"
                    />
                    <label
                        className={`absolute left-3 pointer-events-none transition-all duration-300 ${password || isPasswordFocused
                            ? '-top-2 left-2 text-blue-500 text-xs bg-white px-2'
                            : 'top-[0.55rem] text-gray-500'
                            }`}
                    >
                        Password
                    </label>
                </div>


                <button
                    type="submit"
                    className="bg-blue-500 text-white px-5 py-2.5 rounded-md float-right hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}

export default Signin;