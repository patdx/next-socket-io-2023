'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function SocketClient() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = io();

    socket.on('message', (data) => {
      setMessages((messages) => [...messages, data].slice(-10));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </>
  );
}
