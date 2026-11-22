import { useContext, useRef, useState, useEffect } from "react"
import { Context } from "../App"
import type { ChatContextType } from "../App"
import ToBottom from "./ToBottom"


export default function AIChat () {
    const [isPastMsg, setIsPastMsg] = useState<boolean>(false)
    const scrollRef = useRef<HTMLDivElement | null>(null)
    
    const context = useContext(Context)
    if(!context) {
        throw new Error("A context error occurred")
    }

    const { message, loading }: ChatContextType = context

    function handleScroll (e: React.UIEvent<HTMLDivElement>) {
        const {scrollTop, scrollHeight, clientHeight} = e.currentTarget
        const distanceFromBottom = scrollHeight - (scrollTop + clientHeight)
        setIsPastMsg(distanceFromBottom > 60 ? true : false)
    }

    useEffect(() => {
        if(!isPastMsg) {
            scrollRef.current?.scrollIntoView({ behavior: "auto" })
        }
    }, [message])

    const mappedChat = message.length === 0 ? (
        <div className="bg-green-100 rounded-2xl p-4">
            <p>Don't dare waking up the AI...(you can start your chat below)</p>
        </div>
    ) : message.map((m, index) => {
        return (
            <div className="text-xl">
                <div className={m.role === "assistant" ? "flex items-start space-x-3 w-full" : "flex items-start space-x-3 w-full justify-end"} key={`chat-n-${index}`}>
                    <div className="w-12 h-12 rounded-full bg-blue-500 shrink-0 flex items-center justify-center text-white text-md font-bold">
                        {m.role === "assistant" ? "AI" : "User"}
                    </div>
                    {m.role === "assistant" && 
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-gray-800 max-w-[75%] min-w-30">
                        <p>{m.content}</p>
                        <span className="block text-[10px] text-gray-400 mt-1 text-right">10:00</span>
                    </div>}
                    {m.role === "user" && 
                        <div className="bg-blue-500 text-white p-4 rounded-2xl rounded-tr-none shadow-sm max-w-[75%] min-w-30">
                            <p>{m.content}</p>
                            <span className="block text-[10px] text-blue-200 mt-1 text-right">10:01</span>
                    </div>}
                </div>
            </div>
        )
    }) 
    
    return (
        <div className="flex min-h-0 flex-1 relative">
            <div className="flex-1 p-4 overflow-y-auto space-y-5 bg-gray-50" onScroll={handleScroll} >
                {mappedChat}
                {loading && <p>The AI is writing...</p>}
                <div ref={scrollRef}></div>
            </div>
            {isPastMsg && <ToBottom scrollRef={scrollRef} />}
        </div>
    ) 
}


/*useEffect(() => {
    async function handleRequest (inputText: string) {
        const res = await fetch("")
    }
}, [inputText])*/