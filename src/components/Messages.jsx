import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";
import { HiArrowDown } from "react-icons/hi2";

const Messages = () => {
    useGetRealTimeMessage();

    const { allConversations } = useSelector((store) => store.conversation);
    const { selectedUser, authUser } = useSelector((store) => store.user);
    const [selectedUserConversation, setSelectedUserConversation] = useState([])

    useEffect(() => {
        const conversation = allConversations?.find((conv) =>
            conv?.participants?.includes(authUser.user_id) &&
            conv?.participants?.includes(selectedUser._id)
        );
        setSelectedUserConversation(conversation?.messages || []);
    }, [selectedUser, allConversations]);

    return (
        <div className="relative">
            <div
                className="max-h-[calc(100vh-6.9rem)] px-16 h-full border-black overflow-auto"
            >
                {selectedUserConversation?.length > 0 ? (
                    selectedUserConversation.map((message, index) => (
                        <Message message={message} key={message._id} />
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-4">
                        No messages found. Start a conversation!
                    </p>
                )}
            </div>
        </div>
    );
};

export default Messages;
