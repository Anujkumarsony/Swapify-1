import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './Chat.css';
function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [userId, setUserId] = useState(localStorage.getItem('userId')); // assuming userId is in localStorage
    console.log(userId);
    useEffect(() => {
        const socketInstance = io('http://localhost:4000');
        setSocket(socketInstance);

        socketInstance.on('receive-message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const message = { senderId: userId, message: newMessage };
            socket.emit('send-message', message);
            setMessages((prevMessages) => [...prevMessages, message]);
            setNewMessage('');
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.senderId}:</strong> <span>{msg.message}</span>
                    </div>
                ))}
            </div>
            <div className="input">
                <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="Type a message"
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;