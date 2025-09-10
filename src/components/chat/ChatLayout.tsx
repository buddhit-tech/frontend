import type { FC } from "react";
import DashboardPageWrapper from "../page/DashboardPageWrapper";
import MessageList from "./MessageList";
import MessageComposer from "./MessageComposer";
import NewChat from "./NewChat";
import type { ChatMessage } from "./types";
import clsx from "clsx";

const ChatLayout: FC = () => {
  const messages1: ChatMessage[] = [
    {
      id: "1",
      author: "AI",
      role: "other",
      text: "Hi there! How can I help you today?",
      time: "10:00",
    },
    {
      id: "2",
      author: "You",
      role: "me",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate accusantium, iste assumenda nihil quas minima, aliquam dicta quisquam obcaecati porro ipsa molestias corporis quaerat? Est, reiciendis accusantium ab nobis praesentium, natus, eligendi error rem rerum dolore vitae ipsum asperiores veritatis quod mollitia laudantium aliquid molestias reprehenderit cupiditate accusamus esse eum quaerat incidunt ex! Corporis eius, dolores architecto tenetur vel cupiditate asperiores fugiat natus excepturi eveniet dolorem nisi voluptatum amet ex corrupti quod ullam, cum doloribus! Aut ducimus facere quasi eos alias sapiente eum, expedita tempora consequuntur quas possimus hic mollitia autem nobis odit. Id quas possimus, excepturi cum cumque nulla!",
      time: "10:01",
    },
    {
      id: "3",
      author: "AI",
      role: "other",
      text: "Sure! Generating a quick summary for Q3 sales now.",
      time: "10:01",
    },
    {
      id: "4",
      author: "You",
      role: "me",
      text: "Great, also include top-performing regions.",
      time: "10:02",
    },
    {
      id: "5",
      author: "AI",
      role: "other",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate accusantium, iste assumenda nihil quas minima, aliquam dicta quisquam obcaecati porro ipsa molestias corporis quaerat? Est, reiciendis accusantium ab nobis praesentium, natus, eligendi error rem rerum dolore vitae ipsum asperiores veritatis quod mollitia laudantium aliquid molestias reprehenderit cupiditate accusamus esse eum quaerat incidunt ex! Corporis eius, dolores architecto tenetur vel cupiditate asperiores fugiat natus excepturi eveniet dolorem nisi voluptatum amet ex corrupti quod ullam, cum doloribus! Aut ducimus facere quasi eos alias sapiente eum, expedita tempora consequuntur quas possimus hic mollitia autem nobis odit. Id quas possimus, excepturi cum cumque nulla!",
      time: "10:03",
    },
  ];

  const messages: ChatMessage[] = [];

  if (messages.length === 0) {
    return <NewChat />;
  }

  return (
    <DashboardPageWrapper showHeader title="Chat">
      <div className="w-full h-full flex flex-col relative">
        <div className={clsx("absolute inset-0 transition-all duration-500")} />
        <div className="relative z-10 flex flex-col h-full">
          <div
            className={clsx(
              "flex-1 overflow-y-auto px-6 py-6 transition-all duration-300",
              "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
            )}
          >
            <div className="max-w-4xl mx-auto">
              <MessageList messages={messages} />
            </div>
          </div>
          <MessageComposer />
        </div>
      </div>
    </DashboardPageWrapper>
  );
};

export default ChatLayout;
