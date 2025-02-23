import React, { useState, useEffect, useRef } from "react";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";
import Message from "./Message";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";
import { HiArrowDown } from "react-icons/hi2";

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage();

    const containerRef = useRef(null);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const { messages } = useSelector((store) => store.message);
    
    const handleScroll = () => {
        const container = containerRef.current;
        if (!container) return;

        const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
        setShowScrollButton(distanceFromBottom > 200);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => container.removeEventListener("scroll", handleScroll);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        handleScroll();
        // eslint-disable-next-line
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

    const getDateLabel = (dateString) => {
        const messageDate = new Date(dateString);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const normalize = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const normalizedMessageDate = normalize(messageDate);
        const normalizedToday = normalize(today);
        const normalizedYesterday = normalize(yesterday);

        if (normalizedMessageDate.getTime() === normalizedToday.getTime()) {
            return "Today";
        } else if (normalizedMessageDate.getTime() === normalizedYesterday.getTime()) {
            return "Yesterday";
        } else {
            return `${messageDate.getDate()}/${messageDate.getMonth() + 1}/${messageDate.getFullYear()}`;
        }
    };

    const groupedMessages = messages?.reduce((groups, message) => {
        const dateKey = new Date(message.createdAt).toLocaleDateString();
        if (!groups[dateKey]) {
            groups[dateKey] = [];
        }
        groups[dateKey].push(message);
        return groups;
    }, {});

    const sortedDates = Object.keys(groupedMessages).sort(
        (a, b) => new Date(a) - new Date(b)
    );

    return (
        <div className="relative">
            <div
                ref={containerRef}
                className="max-h-[calc(100vh-6.9rem)] px-16 h-full border-black overflow-auto"
            >
                {sortedDates?.length > 0 ? (
                    sortedDates.map((dateKey) => (
                        <div key={dateKey}>
                            <h2 className="mx-auto my-4 text-[0.8rem] bg-black bg-opacity-5 border-black w-fit py-1 px-2 rounded-md">
                                {getDateLabel(dateKey)}
                            </h2>
                            {groupedMessages[dateKey].map((message, index) => (
                                <Message message={message} key={index} />
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="h-full flex items-center justify-center">No messages</div>
                )}
            </div>
            {showScrollButton && (
                <button
                    onClick={scrollToBottom}
                    className="fixed bottom-20 right-10 p-3 bg-white rounded-full shadow-xl border"
                >
                    <HiArrowDown />
                </button>
            )}
        </div>
    );
};

export default Messages;
