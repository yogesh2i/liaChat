import React, { useEffect, useRef } from 'react'
import { useUser } from '../../context/UserContext'
import '../../App.css';

export default function ChatBox() {
    const { user, notification } = useUser();
    const chatContainerRef = useRef(null); //for auto scroll feature

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [notification])

    return (
        <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar" ref={chatContainerRef}>

            {notification.length > 0 && notification.map((msg) => {
                if (msg.type === "notify") {
                    return (
                        <div className="flex justify-center" key={msg.timestamp}>
                            <div className="px-2 py-0.5 rounded-xl bg-gray-700 text-gray-100 border border-gray-600">
                                <div className="text-xs opacity-40">{msg.text}</div>
                            </div>
                        </div>
                    )
                }
                else if (msg.type === "typing") {
                    return (
                        <div className="flex justify-start" key={msg.timestamp}>
                            <div className="max-w-[70%] p-4 rounded-xl shadow-lg bg-gray-700 text-gray-100 rounded-bl-none border border-gray-600 animate-pulse">
                                <div className="text-xs font-semibold mb-1 opacity-80">{msg.text}</div>
                            </div>
                        </div>
                    )
                }
                else if (msg.type === "summary") {
                    return (
                        <div className={`flex justify-start ${msg.text === "Summarizing..." ? 'animate-pulse' : ''}`} key={msg.timestamp}>
                            <div className="max-w-[70%] p-4 rounded-xl shadow-lg bg-gray-700 text-gray-100 rounded-bl-none border border-gray-600">
                                <div className="text-xs font-semibold mb-1 opacity-80">{msg.text}</div>
                            </div>
                        </div>
                    )
                }
                else if (msg.type === "message") {
                    return (
                        <div className={`flex ${msg.user === user.username ? 'justify-end' : 'justify-start'}`} key={msg.timestamp}>
                            <div className={`${msg.user === user.username ? "max-w-[75%] p-2 rounded-xl shadow-lg border bg-gradient-to-br from-indigo-700 to-blue-600 text-white rounded-br-none border-indigo-500 transition-all duration-200" : 'max-w-[75%] p-2 rounded-xl shadow-lg border bg-gray-700 text-gray-100 rounded-bl-none border-gray-600 transition-all duration-200'}`}
                            >
                                <div className="text-xs mb-1 opacity-40 break-word">{msg.user === user.username ? 'You' : msg.user}</div>
                                <p className="text-base leading-relaxed break-words">{msg.text}</p>
                                <div className="text-xs text-right mt-2 opacity-40">{new Date(msg.timestamp).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })}</div>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}
