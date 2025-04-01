import { useDispatch } from "react-redux";
import { setSelectedMessageForEdit } from "../redux/messageSlice";
import toast from "react-hot-toast";

const ContextMenu = ({ message }) => {
    const dispatch = useDispatch()
    
    const handleCopy = () => {
        navigator.clipboard.writeText(message.message)
        toast.success("Message Copied!")
    }
    return (
        <div className="p-2 w-[10rem]">
            <div
                onClick={() => dispatch(setSelectedMessageForEdit(message))}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
            >
                Edit
            </div>
            <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
                onClick={handleCopy}
            >
                Copy
            </div>
            <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
            >
                Delete
            </div>
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md">Info</div>
        </div>
    );
};

export default ContextMenu