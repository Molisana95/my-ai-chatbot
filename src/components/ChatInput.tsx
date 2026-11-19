import { Context } from "../App"
import { useContext, useRef } from "react"
import type { ChatMessage } from "../App"
export default function ChatInput() {
    const context = useContext(Context)
        if(!context) {
            throw new Error("A context error occurred")
        }
    const { setMessage, loading, setLoading } = context

    const textRef = useRef<HTMLTextAreaElement>(null)

    async function handleSubmit (): Promise<void> {
        const text = textRef.current?.value.trim()
        if(!text) return
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
            setMessage(current => [...current, ...data.messages])
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
                <button className="rounded-2xl p-1" onClick={handleSubmit} >
                    <img src="src\assets\send-svgrepo-com-white.svg" className="w-9 bg-gray-500 hover:bg-green-900 active:bg-green-700 rounded-2xl p-1"/>
                </button>
            </div>
        </>
    )
}