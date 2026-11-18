import AIChat from "./AIChat"
import ChatHeader from "./ChatHeader"
import ChatInput from "./ChatInput"
export default function ChatScreen() {
    return (
        <>
        <div className="flex flex-col mx-auto max-w-100 h-120 border-2 border-gray-400">
            <ChatHeader />
            <AIChat />
            <ChatInput />
        </div>
        </>
    )
}