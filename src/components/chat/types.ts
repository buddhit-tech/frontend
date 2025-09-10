export type ChatRole = "me" | "other";

export type ChatMessage = {
  id: string;
  author: string;
  role: ChatRole;
  text: string;
  time: string;
};
