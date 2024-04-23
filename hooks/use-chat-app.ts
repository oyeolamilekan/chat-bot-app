import { ChatProviderContext } from "@/context/chat-context";
import { useContext } from "react";

export function useChatApp() {
    return useContext(ChatProviderContext);
}