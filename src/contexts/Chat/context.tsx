import { createContext } from "react";
import type { ChatContextType } from "./types";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export default ChatContext;
