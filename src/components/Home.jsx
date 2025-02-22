import Sidebar from "./Sidebar";
import Messagecontainer from "./Messagecontainer";
import useGetOtherUsers from "../hooks/useGetOtherUsers"

const Home = () => {
    useGetOtherUsers()
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