import AIChat from "./AIChat"
import ChatHeader from "./ChatHeader"
export default function ChatScreen() {
    return (
        <>
        <div className="mx-auto max-w-100 h-120 border-2 border-amber-400">
            <ChatHeader />
            <AIChat />
        
        </div>
        </>
    )
}