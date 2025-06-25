import React, { useState } from 'react'
import { useUser } from '../../context/UserContext';
import socket from '../../utilities/socket';

export default function InputBox() {
    const [msg, setMsg] = useState('');
    const { user } = useUser();

    const handleChange = (e) => {
        if (e.target.value.trim() === '') {
            setMsg('');
            return;
        }
        setMsg(e.target.value);
        socket.emit('typing', { username: user.username });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('stopTyping', { username: user.username });
        socket.emit('message', { username: user.username, text: msg });
        setMsg('');
    }
    return (
        <form className="bg-gray-800 p-5 flex items-center shadow-2xl rounded-t-2xl border-t border-gray-700" onSubmit={handleSubmit}>
            <input
                type="text"
                className="w-full sm:w-[70%] flex-1 p-4 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-4 focus:ring-indigo-600 placeholder-gray-400 mr-3  text-base shadow-inner transition-all duration-300"
                placeholder="Type your message here..."
                value={msg}
                onChange={handleChange}
            />
            <button
                type="submit"
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3.5 px-6 sm:px-3 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center text-lg"
            >
                Send
            </button>
        </form>
    )
}
