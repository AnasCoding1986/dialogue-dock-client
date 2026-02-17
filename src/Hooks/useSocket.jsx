import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('https://y-blush-three.vercel.app/'); // Adjust URL if deployed
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    return socket;
};

export default useSocket;
