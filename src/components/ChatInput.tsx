export default function ChatInput() {
    return (
        <>
            <div className="flex items-center px-4 justify-between gap-2 bottom-0 h-14 bg-gray-200">
                <textarea placeholder="Message..." rows={1} className="flex-1 resize-none bg-gray-100 border-gray-500 px-3 py-1.5 rounded-3xl w-full"></textarea>
                <button className="rounded-2xl p-1">
                    <img src="src\assets\send-svgrepo-com-white.svg" className="w-9 bg-gray-500 hover:bg-green-900 active:bg-green-700 rounded-2xl p-1"/>
                </button>
            </div>
        </>
    )
}