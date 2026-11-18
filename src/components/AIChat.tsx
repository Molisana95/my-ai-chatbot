import { useContext } from "react"
import { Context } from "../App"


export default function AIChat () {
    const context = useContext(Context)
    if(!context) {
        throw new Error("AIChat must be rendered inside Context.Provider")
    }

    const { systemText, setSystemText } = context

    return (
        <>
        <div className="flex-1 p-4 overflow-y-auto space-y-5 bg-gray-50">
            <h1 className="text-2xl">Chat will be here</h1>
            <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 shrink-0 flex items-center justify-center text-white text-xs font-bold">AI</div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-800 max-w-[75%]">
                    <p>Ciao! Come posso aiutarti oggi?</p>
                    <span className="block text-[10px] text-gray-400 mt-1 text-right">10:00</span>
                </div>
            </div>
        </div>
            
        </>
    ) 
}