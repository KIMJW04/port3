"use client";

import React from "react";
import { signIn } from "next-auth/react";

const LoginModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 backdrop-blur-lg">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <button onClick={onClose} className="self-end mb-4">
                    Close
                </button>
                <button onClick={() => signIn("google")} className="text-sm text-black mb-4">
                    Login with Google
                </button>
                <button onClick={() => signIn("github")} className="text-sm text-black">
                    Login with GitHub
                </button>
            </div>
        </div>
    );
};

export default LoginModal;
