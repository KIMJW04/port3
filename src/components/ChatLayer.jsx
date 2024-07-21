// src/components/ChatLayer.jsx
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import io from "socket.io-client";

const socket = io();

const ChatLayer = ({ onClose }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        socket.on("message", (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off("message");
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() && session) {
            socket.emit("message", `${session.user.name}: ${message}`);
            setMessage("");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 backdrop-blur-lg">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 h-1/2 flex flex-col">
                <button onClick={onClose} className="self-end mb-4">
                    Close
                </button>
                <div className="flex-1 overflow-y-auto mb-4">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-2">
                            {msg}
                        </div>
                    ))}
                </div>
                <div className="flex">
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className="flex-1 border border-gray-300 p-2 rounded-l-lg" disabled={!session} />
                    <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-r-lg" disabled={!session}>
                        Send
                    </button>
                </div>
                {!session && <div className="text-red-500 mt-2">Please login to send messages.</div>}
            </div>
        </div>
    );
};

export default ChatLayer;
