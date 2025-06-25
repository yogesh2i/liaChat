import React from 'react'
import { useUser } from '../../context/UserContext'
import { apiurl } from '../../utilities/constants';

export default function Navbar() {
    const { user, notification, setNotification } = useUser();

    //remove from localstorage once logged out
    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
    }

    const handleSummary = async () => {
        try {
            let msg = { type: 'summary', text: 'Summarizing...', user: 'AI', timestamp: new Date() };
            setNotification((prev) => [...prev, msg]);
            let response = await fetch(`${apiurl}/chat/summarize`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ history: notification })
            });
            let data = await response.json();
            setNotification((prev) =>
                prev.map((n) =>
                    n.timestamp === msg.timestamp && n.type === 'summary'
                        ? { ...n, text: data.data } // Update the text with the result
                        : n // Keep other notifications unchanged
                )
            );
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <header className="bg-gray-800 p-5 shadow-xl flex justify-between items-center rounded-b-2xl border-b border-gray-700">
            <h1 className="text-2xl sm:text-xl font-extrabold text-indigo-400 drop-shadow-md mb-2 sm:mb-0">Lia Chat</h1>
            <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-2 sm:space-y-0 w-full sm:w-auto">
                <button onClick={handleSummary}
                    className="flex justify-center bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-bold py-2.5 px-5 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center text-base w-full sm:w-auto"
                >
                    Summarize Chat
                </button>
                <div className="text-md text-gray-400 text-center sm:text-left">
                    Logged in as: <span id="display-username" className="font-semibold text-indigo-300">{user.username}</span>
                    <div className="text-xs text-gray-500 break-words mt-1">
                        User ID: <span className="font-mono text-gray-600 text-xxs select-all">{user.userId}</span>
                    </div>
                </div>
            </div>
                <button className='text-md text-gray-400 cursor-pointer hover:text-gray-200' onClick={handleLogout}>
                    Logout
                </button>
        </header>
    )
}
