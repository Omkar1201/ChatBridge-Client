import Sidebar from "./Sidebar";
import Messagecontainer from "./Messagecontainer";
import useGetOtherUsers from "../hooks/useGetOtherUsers"
import useGetAllConversations from "../hooks/useGetAllConversations";

const Home = () => {
    useGetOtherUsers()
    useGetAllConversations()
    return (
        <div className=" h-screen border-black overflow-auto">
            <div className="flex">
                <Sidebar />
                <Messagecontainer />
            </div>
        </div>
    )
}
export default Home;