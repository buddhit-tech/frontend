import { useState, type FC, type PropsWithChildren } from "react";
import ChatContext from "./context";
import { v4 as uuidv4 } from "uuid";
import type { ChatMessage, ChatRole, ChatUser } from "./types";

const DUMMY_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    author: "AI",
    role: "other" as ChatRole,
    text: "Hi there! How can I help you today?",
    time: "10:00",
  },
  {
    id: "2",
    author: "You",
    role: "me" as ChatRole,
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate accusantium, iste assumenda nihil quas minima, aliquam dicta quisquam obcaecati porro ipsa molestias corporis quaerat? Est, reiciendis accusantium ab nobis praesentium, natus, eligendi error rem rerum dolore vitae ipsum asperiores veritatis quod mollitia laudantium aliquid molestias reprehenderit cupiditate accusamus esse eum quaerat incidunt ex! Corporis eius, dolores architecto tenetur vel cupiditate asperiores fugiat natus excepturi eveniet dolorem nisi voluptatum amet ex corrupti quod ullam, cum doloribus! Aut ducimus facere quasi eos alias sapiente eum, expedita tempora consequuntur quas possimus hic mollitia autem nobis odit. Id quas possimus, excepturi cum cumque nulla!",
    time: "10:01",
  },
  {
    id: "3",
    author: "AI",
    role: "other" as ChatRole,
    text: "Sure! Generating a quick summary for Q3 sales now.",
    time: "10:01",
  },
  {
    id: "4",
    author: "You",
    role: "me" as ChatRole,
    text: "Great, also include top-performing regions.",
    time: "10:02",
  },
  {
    id: "5",
    author: "AI",
    role: "other" as ChatRole,
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate accusantium, iste assumenda nihil quas minima, aliquam dicta quisquam obcaecati porro ipsa molestias corporis quaerat? Est, reiciendis accusantium ab nobis praesentium, natus, eligendi error rem rerum dolore vitae ipsum asperiores veritatis quod mollitia laudantium aliquid molestias reprehenderit cupiditate accusamus esse eum quaerat incidunt ex! Corporis eius, dolores architecto tenetur vel cupiditate asperiores fugiat natus excepturi eveniet dolorem nisi voluptatum amet ex corrupti quod ullam, cum doloribus! Aut ducimus facere quasi eos alias sapiente eum, expedita tempora consequuntur quas possimus hic mollitia autem nobis odit. Id quas possimus, excepturi cum cumque nulla!",
    time: "10:03",
  },
];

const DUMMY_CHAT_USERS: ChatUser[] = [
  {
    chatId: uuidv4(),
    userId: uuidv4(),
    name: "Alice Johnson",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    status: "Online",
  },
  {
    chatId: uuidv4(),
    userId: uuidv4(),
    name: "Bob Smith",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "Last seen 2 min ago",
  },
  {
    chatId: uuidv4(),
    userId: uuidv4(),
    name: "Charlie Lee",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    status: "Online",
  },
  {
    chatId: uuidv4(),
    userId: uuidv4(),
    name: "Diana Prince",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    status: "Last seen 5 min ago",
  },
  {
    chatId: uuidv4(),
    userId: uuidv4(),
    name: "Ethan Brown",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    status: "Online",
  },
];

const ChatProvider: FC<PropsWithChildren> = ({ children }) => {
  const [allChatUsers] = useState<ChatUser[]>([...DUMMY_CHAT_USERS]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chatMessages] = useState<ChatMessage[]>([...DUMMY_CHAT_MESSAGES]);
  const [currentChatUser, setCurrentChatUser] = useState<ChatUser | null>(null);
  const [activeClassRoomId, setActiveClassRoomId] = useState<string | null>(
    null
  );

  const updateChatUserAndChat = (chatId?: string, userId?: string) => {
    const chatUserByChatId = DUMMY_CHAT_USERS.find(
      (user) => user.chatId === chatId && userId === user.userId
    );

    if (chatUserByChatId && chatId) {
      setCurrentChatUser(chatUserByChatId);
      setActiveChatId(chatId);
    } else {
      setCurrentChatUser(null);
      setActiveChatId(null);
    }
  };

  const updateActiveChatRoom = (chatRoomId: string) =>
    setActiveClassRoomId(chatRoomId);

  return (
    <ChatContext.Provider
      value={{
        updateActiveChatRoom,
        updateChatUserAndChat,
        allChatUsers: allChatUsers,
        activeChatId: activeChatId,
        currentChatUser: currentChatUser,
        currentChatMessages: chatMessages,
        activeClassRoomId: activeClassRoomId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
