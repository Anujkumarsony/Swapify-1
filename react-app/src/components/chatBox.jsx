import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatBox = ({ exchangeRequestId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchChat = async () => {
      const response = await axios.get(`/api/exchange/${exchangeRequestId}/chat`);
      setMessages(response.data);
    };
    fetchChat();
  }, [exchangeRequestId]);

  const sendMessage = async () => {
    try {
      const response = await axios.post(`/api/exchange/${exchangeRequestId}/chat`, {
        senderId: currentUser .id,
        message,
      });
      setMessages(response.data.chat);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderId.name}: </strong>{msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;