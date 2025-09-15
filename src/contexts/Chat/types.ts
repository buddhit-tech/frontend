export type ChatUser = {
  chatId: string;
  name: string;
  avatar: string;
  status?: string;
  userId: string;
};

export type ChatRole = "me" | "other";

export type ChatMessage = {
  id: string;
  author: string;
  role: ChatRole;
  text: string;
  time: string;
};

export type ChatContextType = {
  activeChatId?: string | null;
  allChatUsers: null | ChatUser[];
  activeClassRoomId: string | null;
  currentChatUser: null | ChatUser;
  currentChatMessages: ChatMessage[];
  updateActiveChatRoom: (chatId: string) => void;
  updateChatUserAndChat: (chatId: string, userId?: string) => void;
};
