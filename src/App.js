import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from './context/SocketContext';
import { setOnlineUsers, updateLastSeen } from './redux/userSlice';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import './App.css';

function App() {
	const { authUser } = useSelector((store) => store.user);
	const { connectSocket, disconnectSocket } = useSocket();
	const dispatch = useDispatch();
// console.log(authUser);

	useEffect(() => {
		if (authUser) {
			const socket = connectSocket(authUser);

			socket?.on('getOnlineUsers', (onlineUsers) => {
				dispatch(setOnlineUsers(onlineUsers));
			});

			socket?.on('lastseen', ({ userId, lastSeen }) => {
				dispatch(updateLastSeen({ userId, lastSeen }));
			});

			return () => {
				socket?.off('getOnlineUsers');
				socket?.off('lastseen');
				disconnectSocket();
			};
		}
	}, [authUser, connectSocket, disconnectSocket, dispatch]);

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</div>
	);
}

export default App;