export default function ChatHeader() {
    return (
        <div className="flex bg-gray-300 h-20 md:h-30 p-2 gap-3 justify-start items-center">
            <div className="h-12 w-12 md:h-17 md:w-17 font-bold text-white text-2xl p-2 rounded-full bg-green-800 flex items-center justify-center">
                <h1>AI</h1>
            </div>
            <div className="flex-col">
                <div className="text-md text-gray-800 font-medium">
                    <h2>AI RudeBot</h2>
                </div>
                <div className="text-sm text-green-600">
                    <p>Online</p>
                </div>
            </div>
        </div>
    )
}