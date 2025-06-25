import React, { useState } from 'react';
import { useUser } from '../../../context/UserContext';
import {apiurl} from '../../../utilities/constants';

export default function Login() {
    const { setUser } = useUser();
    const [isNewUser, setIsNewUser] = useState(false);
    const [name, setName] = useState('');

    //user login function
    //saving user details to localstorage
    const handleSubmit = async (e) => {
        const url = isNewUser ? `${apiurl}/auth/register` : `${apiurl}/auth/login`;
        e.preventDefault();
        if (name.trim() === '') {
            alert('Please enter a valid name');
            return;
        }
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: name })
        })
        const data = await result.json();
        if (data.success) {
            setUser({
                userId: data.data.userId,
                username: data.data.username
            });
            localStorage.setItem('user', JSON.stringify(data.data))
            window.location.href = '/';
        } else {
            alert(data.error || 'Login failed');
        }
    }
    return (
        <div id="login-screen" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
            <form onSubmit={handleSubmit} id="login-form" className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
                <h2 className="text-4xl font-extrabold mb-8 text-center text-indigo-400 drop-shadow-lg">{isNewUser ? 'Register to chat' : 'Welcome to Chat'}</h2>
                <div className="mb-6">
                    <label htmlFor="username-input" className="block text-gray-300 text-lg font-medium mb-3">
                        Enter your username
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        id="username-input"
                        className="w-full py-4 px-5 rounded-xl bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-4 focus:ring-indigo-600 focus:border-indigo-600 transition-all duration-300 shadow-inner placeholder-gray-400 text-base"
                        required
                        placeholder="Enter name here..."
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center justify-center text-lg"
                >
                    Start Chatting
                </button>
                <div className="mt-6 text-center text-gray-400">
                    {isNewUser ? (
                        <span>
                            Already have an account?{' '}
                            <button type='button' onClick={() => setIsNewUser(false)} className="text-indigo-400 hover:underline">
                                Login
                            </button>
                        </span>
                    ) : (
                        <span>
                            New here?{' '}
                            <button type='button' onClick={() => setIsNewUser(true)} className="text-indigo-400 hover:underline">
                                Register
                            </button>
                        </span>
                    )}
                </div>
            </form>
        </div>

    )
}
