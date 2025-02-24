import { FaUser } from "react-icons/fa6";

const OtherusersSkeleton = () => {
    return (
        <div className="flex relative flex-col h-screen w-[35rem] px-4 pt-2">
            <div
                className=" px-2 h-[2.5rem] animate-pulse rounded-2xl mx-4 bg-zinc-200"
            >
            </div>
            <div className="flex-grow overflow-y-auto mt-4 py-4 flex flex-col gap-1">
                {
                    Array.from({ length: 9 }).map((_, index) => (
                        <div
                            className={`relative animate-pulse border bg-zinc-200 rounded-lg flex items-center gap-2 py-[0.7rem] px-2`}
                            key={index}
                        >
                            <div className="w-10 animate-pulse rounded-full border h-10">

                                <div className="text-[1.2rem] text-zinc-400 bg-zinc-300 rounded-full h-full flex justify-center items-center">
                                    <FaUser />
                                </div>
                            </div>
                            <div className="h-4 bg-zinc-300 w-[8rem] "></div>
                        </div>
                    ))
                }
            </div>

            <div className="text-start h-[4rem] bg-zinc-100 flex items-center justify-between px-2 ">
                <div
                    className="p-5 animate-pulse rounded-full bg-zinc-200 "
                >
                </div>
                <div
                    className="p-5 animate-pulse rounded-full bg-zinc-200 "
                >
                </div>
            </div>
        </div>

    )
}
export default OtherusersSkeleton