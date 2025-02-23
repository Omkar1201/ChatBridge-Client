import { createContext, useContext, useRef } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);

    const connectSocket = (user) => {
        if (!socketRef.current && user) {
            const socket = io(
                `${process.env.REACT_APP_BASE_URL}`.replace('/api/v1', ''),
                { withCredentials: true }
            );
            socketRef.current = socket;
        }
        return socketRef.current;
    };

    const disconnectSocket = () => {
        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
        }
    };

    const getSocket = () => socketRef.current;

    return (
        <SocketContext.Provider value={{ connectSocket, disconnectSocket, getSocket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};