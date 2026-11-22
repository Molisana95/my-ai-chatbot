import bottomIcon from "../assets/down-line-svgrepo-com.svg"
//the type for the ref values is new to me. Better to remember for the next time
type ToBottomProp = {
    scrollRef: React.RefObject<HTMLDivElement | null>
}
export default function ToTop({ scrollRef }: ToBottomProp) {


    return (
        <>
            <div id="to-bottom" className="absolute bottom-0 right-0 text-xl mx-5 my-4">
                    <button onClick={() => scrollRef.current?.scrollIntoView({ behavior: "smooth" })} className="bg-gray-200 rounded-full hover:bg-gray-300 active:bg-gray-100">
                        <img src={bottomIcon} className="w-10 sm:w-12 p-1" />
                    </button>
            </div>
        </>
    )
}