import useGetMessages from "../hooks/useGetMessages"
import { useSelector } from "react-redux"
import Message from "./Message"
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage"
const Messages = () => {
    useGetMessages()
    useGetRealTimeMessage()
    const { messages } = useSelector(store => store.message)

    if (!messages) return
    return (
        <div className="max-h-[calc(100vh-6.4rem)] px-16 border-black overflow-auto ">
            {
                messages?.map((message, index) => (
                    <Message message={message} key={index} />
                ))
            }
        </div>
    )
}

export default Messages 