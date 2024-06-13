import React, { useEffect, useState } from 'react';
import { connectWebSocket, subscribeToPair, unsubscribeFromPair } from '../../../../../libs/utils/src';

interface BannerProps {
    currencyPair: string;
}

const Banner: React.FC<BannerProps> = ({ currencyPair }) => {
    const [rate, setRate] = useState<number | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const socket = connectWebSocket();
        setSocket(socket);

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);

    useEffect(() => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            subscribeToPair(socket, currencyPair, setRate);
        } else {
            console.warn('WebSocket connection not open yet.');
        }
    }, [socket, currencyPair]);

    return (
        <div className="banner">
            <h2>Banner Component</h2>
            <p>Currency Pair: {currencyPair}</p>
            <p>Current Rate: {rate}</p>
        </div>
    );
};

export default Banner;