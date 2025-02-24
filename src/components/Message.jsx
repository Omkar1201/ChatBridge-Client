import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"


const Message = ({ message }) => {

    const scroll = useRef()
    const { authUser } = useSelector(store => store.user)

    const timestamp = message.createdAt;
    const options = { hour: '2-digit', minute: '2-digit', hour12: false };
    const timeString = new Date(timestamp).toLocaleTimeString('en-GB', options);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "auto" })
    }, [message])

    return (
        <>
            <div ref={scroll} className={` flex ${authUser?._id === message?.senderId ? 'justify-end chat-end' : 'justify-start chat-start'} chat`}>
                <div className={`chat-bubble break-words max-w-[20rem] ${authUser?._id === message?.senderId ? '' : 'chat-bubble-primary border'}`}>
                    {message.message}
                    <div className={`text-[0.7rem] mx-2 w-full text-right`} >
                        {timeString}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Message