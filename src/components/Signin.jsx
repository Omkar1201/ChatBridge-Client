import { useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";


const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate=useNavigate()
    const dispatch = useDispatch()

    const showToast = () => {
        toast.success('Successfully saved!');
        toast.error('Something went wrong!');
        toast('This is a simple toast');
    };

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
        <div>
            <form onSubmit={handleSignin} className="">
                <label>
                    <div>Enter Username: </div>
                    <input type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border border-black outline-none" required/>
                </label>
                <label>
                    <div>Enter password: </div>
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </label>
                <button type="submit">Sign In</button>
            </form>
            <div onClick={showToast}>test toast</div>
        </div>
    );
}

export default Signin;