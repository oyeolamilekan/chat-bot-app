"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatProvider } from "@/context/chat-context";

const queryClient = new QueryClient();

export const AppContext = createContext<{
    font: string;
    setFont: Dispatch<SetStateAction<string>>;
}>({
    font: "Default",
    setFont: () => { },
});

export default function Providers({ children }: { children: ReactNode }) {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ChatProvider>
                    {children}
                </ChatProvider>
            </QueryClientProvider>
        </>
    );
}
