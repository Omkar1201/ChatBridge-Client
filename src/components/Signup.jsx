import axios from "axios";
import { useState } from "react";

const Signup = () => {
    const [userData, setUserData] = useState({ fullName: "", username: "", email: "", password: "", confirmPassword: "" });
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
                {fullName:userData.fullName, username: userData.username, email: userData.email, password: userData.password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            console.log(responseData);
        }
        catch (error) {
            console.error("Error signing in:", error.response?.data || error.message);
        }
    }
    return (
        <div>
            <form onSubmit={handleSignUp}>
                <label>
                    <div>Enter fullName: </div>
                    <input type="text" placeholder="FullName" name="fullName" onChange={handleChange} value={userData.fullName} required />
                </label>
                <label>
                    <div>Enter userName: </div>
                    <input type="text" placeholder="UserName" name="username" onChange={handleChange} value={userData.username} required />
                </label>
                <label>
                    <div>Enter email: </div>
                    <input type="email" placeholder="Email" name="email" onChange={handleChange} value={userData.email} required />
                </label>
                <label>
                    <div>Enter password: </div>
                    <input type="password" placeholder="Password" name="password" onChange={handleChange} value={userData.password} required />
                </label>
                <label>
                    <div>Confirm password: </div>
                    <input type="password" placeholder="Password" name="confirmPassword" onChange={handleChange} value={userData.confirmPassword} required />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup;