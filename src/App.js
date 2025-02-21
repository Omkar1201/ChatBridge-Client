import Signin from './components/Signin';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Home from './components/Home';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client"
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';

function App() {
	const { authUser } = useSelector(store => store.user)
	const {socket}=useSelector(store=>store.socket)
	const {messages}=useSelector(store=>store.message)
	
	console.log(messages);
	
	const dispatch=useDispatch();


	useEffect(() => {
		if (authUser) {
			const socketio = io(`${process.env.REACT_APP_BASE_URL}`.replace('/api/v1',""),{
				withCredentials: true,
			})
			dispatch(setSocket(socketio))

			socketio?.on("getOnlineUsers",(onlineUsers)=>{
				console.log(onlineUsers);
				dispatch(setOnlineUsers(onlineUsers))
			})
			return()=>socketio.close()
		}
		else{
			if(socket){
				socket.close()
				dispatch(setSocket(null))
			}
		}
		// eslint-disable-next-line
	}, [authUser])

	return (
		<div className="App">
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/signin' element={<Signin />} ></Route>
				<Route path='/signup' element={<Signup />} ></Route>
			</Routes>
		</div>
	);
}

export default App;
