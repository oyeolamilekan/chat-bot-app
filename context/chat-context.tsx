import { createContext, ReactNode, useState } from "react"

type ChatProviderProps = {
    children: ReactNode
}

type AccountProviderProps = {
    references: []
}

type ChatContext = {
    setReference: (value: []) => void
    resetReference: () => void
    state: AccountProviderProps
}

export const ChatProviderContext = createContext({} as ChatContext)

export function ChatProvider({ children }: ChatProviderProps) {
    const [state, setState] = useState<AccountProviderProps>({
        references: []
    })

    const setReference = (value: []) => {
        setState({ references: value })
    }

    const resetReference = () => {
        setState({ references: [] })
    }

    return <>
        <ChatProviderContext.Provider value={{ state, setReference, resetReference }}>
            {children}
        </ChatProviderContext.Provider>
    </>
}
