export default function Example () {
    (
        <>
         <div className="flex flex-col h-150 w-full max-w-md mx-auto border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
  

            <div className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
                <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                    AI
                </div>
                <div>
                    <h3 className="text-sm font-semibold">Assistente</h3>
                    <p className="text-xs text-green-400">Online</p>
                </div>
                </div>
            </div>


            <div className="flex-1 p-4 overflow-y-auto space-y-5 bg-gray-50">
                

                <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 shrink-0 flex items-center justify-center text-white text-xs font-bold">AI</div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-800 max-w-[75%]">
                        Ciao! Come posso aiutarti oggi?
                        <span className="block text-[10px] text-gray-400 mt-1 text-right">10:00</span>
                    </div>
                </div>


                <div className="flex items-start justify-end space-x-2">
                    <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm max-w-[75%]">
                        Mi mostri come usare Tailwind per una chat?
                        <span className="block text-[10px] text-blue-200 mt-1 text-right">10:01</span>
                    </div>
                </div>

            </div>


            <div className="p-3 bg-white border-t border-gray-200 flex items-center space-x-2">
                <input 
                type="text" 
                placeholder="Scrivi un messaggio..." 
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                />
                <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition active:bg-blue-950">
                <svg className="w-5 h-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                </button>
            </div>
  
</div>
        </>
    )
}