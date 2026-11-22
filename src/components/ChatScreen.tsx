import AIChat from "./AIChat"
import ChatHeader from "./ChatHeader"
import ChatInput from "./ChatInput"
export default function ChatScreen() {
    return (
        <>
        <div className="flex flex-col mx-auto w-screen h-screen sm:max-w-120 md:max-w-150 border-2 border-gray-400">
            <ChatHeader />
            <AIChat />
            <ChatInput />
        </div>
        </>
    )
}