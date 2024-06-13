export const connectWebSocket = (): WebSocket => {
    const socket = new WebSocket('wss://fe-challenge.cicadatech.net/live-data');

    socket.onopen = () => {
        console.log('WebSocket connection established');
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    return socket;
};
  
export const subscribeToPair = (socket: WebSocket, currencyPair: string, setRate: (rate: number) => void): void => {
    const message = JSON.stringify({ type: 'subscribe', pair: currencyPair });
    socket.send(message);

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.currency === currencyPair) {
            setRate(data.point);
        }
    };
};

export const unsubscribeFromPair = (socket: WebSocket, currencyPair: string): void => {
    const message = JSON.stringify({ type: 'unsubscribe', pair: currencyPair });
    socket.send(message);
};
  