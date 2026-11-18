import ChatScreen from "./components/ChatScreen"
import { useState, createContext } from "react"

type ChatContextType = {
  systemText: string | null
  setSystemText: React.Dispatch<React.SetStateAction<string | null>>
  userText: string | null
  setUserText: React.Dispatch<React.SetStateAction<string | null>>
}

export const Context = createContext<ChatContextType | null>(null)

export default function App() {
  const [systemText, setSystemText] = useState<string | null>("Hi, how can I help you?")
  const [userText, setUserText] = useState<string | null>("Can you please find me the top 3 movies by RottenTomatoes rank of 2025?")

  return (
    <>
    <Context.Provider value={
      {systemText, setSystemText, userText, setUserText}
    }>
     <ChatScreen />
     </Context.Provider>
    </>
  )
}