import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import ChatBox from '../ChatBox/ChatBox'
import InputBox from '../ChatBox/InputBox'
import { useUser } from '../../context/UserContext';
import socket from '../../utilities/socket';
import {apiurl} from '../../utilities/constants';

export default function Home() {
    const { user, setNotification } = useUser();

    //fetch chat history from backend
    async function fetchChats() {
        try {
            const response = await fetch(`${apiurl}/chat/history`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setNotification(result.data || []);
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    }
    //fetch history
    useEffect(() => {
        fetchChats();
    }, [])

    //handle socket events
    useEffect(() => {
        socket.emit('join', { username: user.username });

        socket.on('userJoined', (message) => {
            setNotification((prev) => [...prev, message]);
        })
        socket.on('welcome', (message) => {
            setNotification((prev) => [...prev, message]);
        })
        socket.on('userLeft', (message) => {
            setNotification((prev) => [...prev, message]);
        })
        socket.on('typing', (message) => {
            setNotification((prev) => {
                const isTypingAlready = prev.some(
                    (n) => n.user === message.user && n.type === 'typing'
                );
                if (!isTypingAlready) {
                    return [...prev, message];
                }
                return prev;
            });
        })
        socket.on('stopTyping', (message) => {
            setNotification((prev) => prev.filter((n) => !(n.user === message.user && n.type === 'typing')))
        })
        socket.on('message', (message) => {
            setNotification((prev) => [...prev, message]);
        })
        socket.on('error', (message) => {
            alert(`Error: ${message.error}`);
        })

        return () => {
            socket.off('userJoined');
            socket.off('welcome');
            socket.off('userLeft');
            socket.off('typing');
            socket.off('stopTyping');
            socket.off('message');
            socket.off('error');
        }
    }, [])
    return (
        <div id="chat-screen" className="flex flex-col h-screen bg-gradient-to-br from-gray-950 to-gray-800 text-gray-100 font-inter antialiased">
            <Navbar />
            <ChatBox />
            <InputBox />
        </div>
    )
}
