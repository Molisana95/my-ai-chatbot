import { useContext } from "react"
import { Context } from "../App"
import type { ChatContextType } from "../App"

export default function AIChat () {
    const context = useContext(Context)
    if(!context) {
        throw new Error("A context error occurred")
    }

    const { message }: ChatContextType = context

    const mappedChat = message.length === 0 ? <p>Hello</p> : message.map((m) => {
        return (
            <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 shrink-0 flex items-center justify-center text-white text-xs font-bold">
                    {m.role === "assistant" ? "AI" : "User"}
                </div>
                {m.role === "assistant" && 
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-800 max-w-[75%]">
                    <p>{m.content}</p>
                    <span className="block text-[10px] text-gray-400 mt-1 text-right">10:00</span>
                </div>}
                {m.role === "user" && 
                <div className="flex items-start justify-end space-x-2">
                    <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm max-w-[75%]">
                        <p>{m.content}</p>
                        <span className="block text-[10px] text-blue-200 mt-1 text-right">10:01</span>
                    </div>
                </div>}
            </div>
        )
    }) 
    
    return (
        <>
        <div className="flex-1 p-4 overflow-y-auto space-y-5 bg-gray-50">
            {mappedChat}
        </div>
        </>
    ) 
}


/*useEffect(() => {
    async function handleRequest (inputText: string) {
        const res = await fetch("")
    }
}, [inputText])*/