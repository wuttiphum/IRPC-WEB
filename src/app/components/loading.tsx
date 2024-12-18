export default function Loading(){
    return <>
        <div className="flex items-center justify-center bg-white h-screen relative">
            <div className="w-[48px] h-[48px] bg-blue-400 absolute rounded-full animate-pulse duration-150"></div>
            <div className="w-[24px] h-[24px] bg-[--primary] rounded-full animate-pulse"></div>
        </div>
    </>
}