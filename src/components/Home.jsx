import Sidebar from "./Sidebar";
import Messagecontainer from "./Messagecontainer";
const Home = () => {

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