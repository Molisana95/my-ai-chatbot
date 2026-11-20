import { Context } from "../App"
import { useContext, useRef } from "react"
import type { ChatMessage } from "../App"

export default function ChatInput() {
    const context = useContext(Context)
        if(!context) {
            throw new Error("A context error occurred")
        }
    const { setMessage, setLoading, loading } = context

    let textRef = useRef<HTMLTextAreaElement>(null)

    
    async function handleSubmit () {
        const textArea = textRef.current
        const text = textArea?.value.trim()
        if(!text || !textArea) return
        setMessage(current => [...current, { role: "user", content: text }])
        textArea.value = ""
        setLoading(true)
        try {
            const response = await fetch ("/.netlify/functions/serverless-ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userTextInput: text
                })
            })
            if(!response.ok) {
                throw new Error(`Error-status: ${response.status}`)
            }
            const data: { messages: ChatMessage[] } = await response.json()
            setMessage(current => [...current, ...data.messages.filter(m => m.role === "assistant")])
        } catch(err) {
            console.error("Error fetching data", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="flex items-center px-4 justify-between gap-2 bottom-0 h-14 bg-gray-200">
                <textarea placeholder="Message..." rows={1} ref={textRef} className="flex-1 resize-none bg-gray-100 border-gray-500 px-3 py-1.5 rounded-3xl w-full"></textarea>
                <button className="rounded-2xl p-1" onClick={handleSubmit} disabled={loading ? true : false} >
                    <img src="src\assets\send-svgrepo-com-white.svg" className="w-9 bg-gray-500 hover:bg-green-900 active:bg-green-700 rounded-2xl p-1"/>
                </button>
            </div>
        </>
    )
}

/*
 
    <div className="flex items-start justify-end space-x-2">
        <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm max-w-[75%]">
            <p>{text}</p>
            <span className="block text-[10px] text-blue-200 mt-1 text-right">10:01</span>
        </div>
    </div>
*/