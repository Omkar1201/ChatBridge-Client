import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Signup = () => {
    const [userData, setUserData] = useState({ fullName: "", username: "", email: "", password: "", confirmPassword: "" });
    const [isFocused, setIsFocused] = useState({ fullName: false, username: false, email: false, password: false, confirmPassword: false })

    const handleFocuse = (event) => {
        setIsFocused({
            ...isFocused,
            [event.target.name]: true
        })
    }

    const handleBlur = (event) => {
        setIsFocused({
            ...isFocused,
            [event.target.name]: false
        })
    }

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
    }

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (userData.password !== userData.confirmPassword) {
            alert("Password does not match");
            return;
        }
        try {
            const responseData = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/user/signup`,
                { fullName: userData.fullName, username: userData.username, email: userData.email, password: userData.password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            toast.success(responseData.data.message)
        }
        catch (error) {
            toast.error(error.response?.data?.message)
            console.error("Error signing in:", error.response?.data || error.message);
        }
    }

    return (
        <div className="bg-white shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[28rem] py-8 px-10 border border-gray-300 rounded-lg">
            <div className="text-center text-[2rem] font-semibold mb-4">Sign Up</div>
            <form onSubmit={handleSignUp} className="">
                <div className="flex flex-col gap-7">
                    <div className="relative ">
                        <input type="text" name="fullName" required
                            value={userData.fullName}
                            onChange={handleChange}
                            onFocus={handleFocuse}
                            onBlur={handleBlur}
                            className="w-full transition duration-[0.2s] px-3 py-2.5 text-base outline-none hover:border-blue-300 border-2 border-gray-300 rounded-md focus:border-blue-500"
                        />
                        <label
                            className={`absolute left-3 pointer-events-none transition-all duration-300 
                            ${userData.fullName ? "-top-2 left-2 text-xs bg-white px-2" : "top-[0.55rem]"} 
                            ${isFocused.fullName ? "text-blue-500" : "text-gray-500"}`}
                        >
                            Fullname
                        </label>
                    </div>
                    <div className="relative ">
                        <input type="text" name="username" required
                            value={userData.username}
                            onChange={handleChange}
                            onFocus={handleFocuse}
                            onBlur={handleBlur}
                            className="w-full transition duration-[0.2s] px-3 py-2.5 text-base outline-none hover:border-blue-300 border-2 border-gray-300 rounded-md focus:border-blue-500"
                        />
                        <label
                            className={`absolute left-3 pointer-events-none transition-all duration-300 
                            ${userData.username ? "-top-2 left-2 text-xs bg-white px-2" : "top-[0.55rem]"} 
                            ${isFocused.username ? "text-blue-500" : "text-gray-500"} `}
                        >
                            Username
                        </label>
                    </div>
                    <div className="relative ">
                        <input type="email" name="email" required
                            value={userData.email}
                            onChange={handleChange}
                            onFocus={handleFocuse}
                            onBlur={handleBlur}
                            className="w-full transition duration-[0.2s] px-3 py-2.5 text-base outline-none hover:border-blue-300 border-2 border-gray-300 rounded-md focus:border-blue-500"
                        />
                        <label
                            className={`absolute left-3 pointer-events-none transition-all duration-300 
                            ${userData.email ? "-top-2 left-2 text-xs bg-white px-2" : "top-[0.55rem]"} 
                            ${isFocused.email ? "text-blue-500" : "text-gray-500"} `}
                        >
                            Email
                        </label>
                    </div>
                    <div className="relative ">
                        <input type="password" name="password" required
                            value={userData.password}
                            onChange={handleChange}
                            onFocus={handleFocuse}
                            onBlur={handleBlur}
                            className="w-full transition duration-[0.2s] px-3 py-2.5 text-base outline-none hover:border-blue-300 border-2 border-gray-300 rounded-md focus:border-blue-500"
                        />
                        <label
                            className={`absolute left-3 pointer-events-none focus focus:text-blue-500 transition-all duration-300 
                            ${userData.password ? "-top-2 left-2 text-xs bg-white px-2" : "top-[0.55rem]"} 
                            ${isFocused.password ? "text-blue-500" : "text-gray-500"} `}
                        >
                            Password
                        </label>
                    </div>

                    <div className="relative ">
                        <input type="password" name="confirmPassword" required
                            value={userData.confirmPassword}
                            onChange={handleChange}
                            onFocus={handleFocuse}
                            onBlur={handleBlur}
                            className="w-full transition duration-[0.2s] px-3 py-2.5 text-base outline-none hover:border-blue-300 border-2 border-gray-300 rounded-md focus:border-blue-500"
                        />
                        <label
                            className={`absolute left-3 pointer-events-none transition-all duration-300 
                            ${userData.confirmPassword ? "-top-2 left-2 text-xs bg-white px-2" : "top-[0.55rem]"} 
                            ${isFocused.confirmPassword ? "text-blue-500" : "text-gray-500"} `}
                        >
                            ConfirmPassword
                        </label>
                    </div>
                    <button type="submit" className="border w-full py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 active:bg-blue-500">SignUp</button>
                </div>
                <div className="text-center font-semibold my-2 ">Already have an account?<Link to={'/signin'}><span className="text-blue-500"> Sign in</span></Link> </div>
            </form>
        </div>
    )
}

export default Signup;