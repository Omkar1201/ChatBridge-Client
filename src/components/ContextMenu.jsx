import { useDispatch } from "react-redux";
import { setSelectedMessageForEdit } from "../redux/messageSlice";

const ContextMenu = ({ message }) => {
    const dispatch = useDispatch()
    return (
        <div className="p-2 w-[10rem]">
            <div
                onClick={() => dispatch(setSelectedMessageForEdit(message))}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
            >
                Edit
            </div>
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md">Copy</div>
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md">Forward</div>
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md">Info</div>
        </div>
    );
};

export default ContextMenu