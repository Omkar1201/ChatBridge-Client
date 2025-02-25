import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";
import { HiArrowDown } from "react-icons/hi2";

const SCROLL_THRESHOLD = 200; // Pixels from bottom to show button

const Messages = () => {
    useGetRealTimeMessage();
    const containerRef = useRef(null);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const { allConversations } = useSelector((store) => store.conversation);
    const { selectedUser, authUser } = useSelector((store) => store.user);
    const [selectedUserConversation, setSelectedUserConversation] = useState([]);
    const { isLoading } = useSelector(store => store.loader)

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    };

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
            setShowScrollButton(distanceFromBottom > SCROLL_THRESHOLD);
        }
    };

    useEffect(() => {
        const conversation = allConversations?.find((conv) =>
            conv?.participants?.includes(authUser?._id) &&
            conv?.participants?.includes(selectedUser?._id)
        );
        setSelectedUserConversation(conversation?.messages || []);
    }, [selectedUser, allConversations, authUser?._id]);

    useEffect(() => {
        scrollToBottom();
    }, [selectedUserConversation]);

    return (
        <div className="relative">
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="max-h-[calc(100vh-6.9rem)] relative px-16 h-full border-black overflow-auto"
            >
                {
                    isLoading ? (
                        <div className="flex items-center justify-center h-[calc(100vh-6.9rem)]">
                            <div className="loading loading-spinner loading-lg text-secondary">
                            </div>
                        </div>
                    ) :
                        (
                            selectedUserConversation?.length > 0 ? (
                                selectedUserConversation.map((message) => (
                                    <Message message={message} key={message._id} />
                                ))
                            ) : (
                                <p className="text-center text-gray-500 mt-4">
                                    No messages found. Start a conversation!
                                </p>
                            )
                        )
                }
            </div>

            {showScrollButton && (
                <button
                    onClick={scrollToBottom}
                    className="absolute bottom-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow-lg border"
                >
                    <HiArrowDown className="w-6 h-6 text-gray-700" />
                </button>
            )}
        </div>
    );
};

export default Messages;