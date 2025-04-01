import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"


const Message = ({ message, onRightClick }) => {
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
                <div
                    onContextMenu={(e) => onRightClick(e, message._id)}
                    className={`chat-bubble break-words max-w-[20rem] ${authUser?._id === message?.senderId ? '' : 'chat-bubble-primary border'}`}>
                    {message.message}
                    <div className="flex items-center justify-end text-[0.7rem] ">
                        {
                            message.isEdited &&
                            <div>Edited</div>
                        }
                        <div className={`mx-2`} >
                            {timeString}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Message