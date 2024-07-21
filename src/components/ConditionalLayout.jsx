// src/components/ConditionalLayout.jsx
"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import VideoBackground from "@/components/VideoBackground";
import MainLoading from "@/components/MainLoading";
import Layer from "@/components/Layer";
import AboutLayer from "@/components/AboutLayer";
import YoutubeLayer from "@/components/YoutubeLayer";
import PortLayer from "@/components/PortLayer";
import ChatLayer from "./ChatLayer";

export default function ConditionalLayout({ children }) {
    const [loading, setLoading] = useState(true);
    const [percent, setPercent] = useState(0);
    const [activeLayer, setActiveLayer] = useState(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleRouteChange = () => {
            setLoading(true);
            setPercent(0);
            let loadedResources = 0;
            const totalResources = 10; // 로드해야 하는 리소스 수를 여기에 설정

            const updatePercent = () => {
                loadedResources += 1;
                const newPercent = Math.min((loadedResources / totalResources) * 100, 100);
                setPercent(newPercent);
                if (newPercent === 100) {
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                }
            };

            // 리소스 로드 시뮬레이션
            for (let i = 0; i < totalResources; i++) {
                setTimeout(updatePercent, i * 100); // 실제 로드 로직을 여기에 구현
            }
        };

        handleRouteChange(); // Initial load

        return () => {};
    }, [pathname]);

    const handleLinkClick = (event) => {
        event.preventDefault();
        const layer = event.currentTarget.getAttribute("data-layer");
        setActiveLayer(layer);
    };

    const closeLayer = () => {
        setActiveLayer(null);
    };

    if (loading) {
        return <MainLoading percent={percent} />;
    }

    return (
        <SessionProvider>
            <VideoBackground />
            <Header />
            <Main>
                {children}
                {activeLayer === "layer1" && (
                    <Layer onClose={closeLayer} ment={"😎 김진우 개발자입니다."}>
                        <AboutLayer />
                    </Layer>
                )}
                {activeLayer === "layer2" && (
                    <Layer onClose={closeLayer} ment={"😏 여기서 세상돌아가는 영상들을 광고 없이 볼 수 있습니다."}>
                        <YoutubeLayer />
                    </Layer>
                )}
                {activeLayer === "layer3" && <PortLayer onClose={closeLayer} />}
                {activeLayer === "layer4" && <ChatLayer onClose={closeLayer} />}
            </Main>
            <Footer onLinkClick={handleLinkClick} />
        </SessionProvider>
    );
}
