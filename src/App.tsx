import ChatScreen from "./components/ChatScreen"
import { useState, createContext } from "react"

export type ChatMessage = {
  role: "user" | "system" | "assistant"
  content: string
}

export type ChatContextType = {
  message: ChatMessage[]
  setMessage: React.Dispatch<React.SetStateAction<ChatContextType["message"]>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const Context = createContext<ChatContextType | null>(null)

export default function App() {
  const [message, setMessage] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <>
      <Context.Provider value={
        {message, setMessage, loading, setLoading}
      }>
      <ChatScreen />
      </Context.Provider>
    </>
  )
}

/*

old elements

  {userText: string | null
  setUserText: React.Dispatch<React.SetStateAction<string | null>>
  inputText: string | null
  setInputText: React.Dispatch<React.SetStateAction<string | null>>}

/*const [userText, setUserText] = useState<string | null>("Can you please find me the top 3 movies by RottenTomatoes rank of 2025?")
  const [inputText, setInputText] = useState<string | null>("")*/
