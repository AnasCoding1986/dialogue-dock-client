import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    return socket;
};

export default useSocket;
