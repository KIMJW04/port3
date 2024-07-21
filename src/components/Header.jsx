"use client";

import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { SiYoutubemusic } from "react-icons/si";
import MusicPlayer from "./MusicPlayer";
import LoginModal from "./LoginModal";

const Header = () => {
    const [currentTime, setCurrentTime] = useState("");
    const [locationName, setLocationName] = useState("KOREA");
    const [isMusicPlayerVisible, setIsMusicPlayerVisible] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(
                new Date().toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })
            );
        };

        updateTime();
        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchLocationName = async (latitude, longitude) => {
            try {
                const response = await fetch(`/api/LocationFetcher?latitude=${latitude}&longitude=${longitude}`);
                const data = await response.json();
                if (data.name) {
                    setLocationName(data.name);
                } else {
                    setLocationName("KOREA");
                }
            } catch (error) {
                console.error("Error fetching location:", error);
                setLocationName("KOREA");
            }
        };

        const handleGeoSuccess = (position) => {
            const { latitude, longitude } = position.coords;
            fetchLocationName(latitude, longitude);
        };

        const handleGeoError = (error) => {
            console.error("Geolocation error:", error);
            setLocationName("KOREA");
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
        } else {
            console.error("Geolocation is not supported by this browser.");
            setLocationName("KOREA");
        }
    }, []);

    const currentDate = new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
    });

    const toggleMusicPlayer = () => {
        setIsMusicPlayerVisible(!isMusicPlayerVisible);
    };

    const toggleLoginModal = () => {
        setIsLoginModalVisible(!isLoginModalVisible);
    };

    return (
        <header id="header" className="fixed top-0 left-0 z-50 w-full bg-black bg-opacity-50 backdrop-blur-lg font-GmarketSans">
            <div className="flex items-center justify-between w-full">
                <h1 className="flex text-xs font-bold text-white uppercase pl-[1.875rem] pr-5 pb-3 pt-[0.625rem] relative after:content-['*'] after:left-[10px] after:top-[11px] after:w-[14px] after:h-[14px] after:bg-logo after:bg-cover after:absolute">
                    Jin Woo
                </h1>
                <div className="flex items-center right">
                    <div className="relative w-5 h-5 ">
                        <SiYoutubemusic className="text-xl cursor-pointer text-gray" onClick={toggleMusicPlayer} />
                        <MusicPlayer isVisible={isMusicPlayerVisible} setVisible={setIsMusicPlayerVisible} />
                    </div>
                    <div className="pr-5 ml-5 text-sm text-white">
                        {currentDate}
                        <em className="ml-2 font-bold">{locationName}</em>
                    </div>
                    <div className="ml-5">
                        {!session ? (
                            <>
                                <button onClick={toggleLoginModal} className="text-sm text-white">
                                    Login
                                </button>
                                {isLoginModalVisible && <LoginModal onClose={toggleLoginModal} />}
                            </>
                        ) : (
                            <div className="flex items-center">
                                <img src={session.user.image} alt={session.user.name} className="w-8 h-8 rounded-full mr-2" />
                                <span className="text-sm text-white">{session.user.name}</span>
                                <button onClick={() => signOut()} className="ml-4 text-sm text-white">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
