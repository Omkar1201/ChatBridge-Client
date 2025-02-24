import { useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";


const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

            navigate('/')
            const { token,message, success, ...userData } = responseData.data.userData
            dispatch(setAuthUser(userData))
            
            toast.success(responseData?.data?.message)
        }
        catch (error) {
            console.error("Error signing in:", error.response?.data);
            toast.error(error.response?.data.message)
        }
    }
    return (
        <div className="bg-white shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 p-10 border border-gray-300 rounded-lg">
            <div className="text-center text-[2rem] font-semibold mb-4">Login</div>
            <form onSubmit={handleSignin} className="">
                <div className="flex flex-col gap-7">
                    <div className="relative">
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                            onFocus={() => setIsUsernameFocused(true)}
                            onBlur={() => setIsUsernameFocused(false)}
                            className="w-full transition duration-[0.2s] px-3 py-2.5 text-base outline-none hover:border-blue-300 border-2 border-gray-300 rounded-md focus:border-blue-500"
                            required
                        />
                        <label
                            className={`absolute left-3 pointer-events-none transition-all duration-300 
                            ${username ? "-top-2 left-2 text-xs bg-white px-2" : "top-[0.55rem]"} 
                            ${isUsernameFocused ? "text-blue-500" : "text-gray-500"} `}
                        >
                            Username
                        </label>
                    </div>

                    <div className="relative">
                        <input type={`${isPasswordVisible ? 'text' : 'password'}`} value={password} onChange={(e) => setPassword(e.target.value)} required
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                            className="w-full transition duration-[0.2s] px-3 py-2.5 text-base outline-none hover:border-blue-300 border-2 border-gray-300 rounded-md focus:border-blue-500"
                            maxLength={15}
                        />
                        <label
                            className={`absolute flex left-3 pointer-events-none transition-all duration-300 
                            ${password ? "-top-2 left-2 text-xs bg-white px-2" : "top-[0.55rem]"} 
                            ${isPasswordFocused ? "text-blue-500" : "text-gray-500"} `}
                        >
                            Password
                        </label>
                        <div className={` absolute top-3 right-2 text-[1.4rem] cursor-pointer
                            ${isPasswordFocused ? 'text-blue-500' : 'text-gray-500'}
                            ${password ? 'flex' : 'hidden'}`}
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                            {
                                isPasswordVisible ?
                                    <IoEyeOutline /> : <IoEyeOffOutline />
                            }
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 w-full text-white px-5 py-2.5 rounded-md float-right hover:bg-blue-600 focus:outline-none"
                    >
                        Sign In
                    </button>
                </div>
                <div className="text-center font-semibold my-2 ">Don't have an account?<Link to={'/signup'}><span className="text-blue-500"> Signup</span></Link> </div>
            </form>
        </div>
    );
}

export default Signin;