import React, { useState, useEffect, useRef } from "react";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";
import Message from "./Message";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage();
    const containerRef = useRef(null);
    const [showScrollButton, setShowScrollButton] = useState(false);
    
    const { messages } = useSelector((store) => store.message);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;

            if (distanceFromBottom > 400) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        container.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => container.removeEventListener("scroll", handleScroll);
    }, [messages]);

    const scrollToBottom = () => {
        const container = containerRef.current;
        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    if (!messages) return null;

    return (
        <div className="relative">
            <div
                ref={containerRef}
                className="max-h-[calc(100vh-6.9rem)] px-16 h-full border-black overflow-auto"
            >
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <Message message={message} key={index} />
                    ))
                ) : (
                    <div className="h-full flex items-center justify-center">No messages</div>
                )}
            </div>
            {showScrollButton && (
                <button
                    onClick={scrollToBottom}
                    className="fixed bottom-20 right-10 p-3 bg-blue-500 text-white rounded-full shadow-lg"
                >
                    Scroll to bottom
                </button>
            )}
        </div>
    );
};

export default Messages;
