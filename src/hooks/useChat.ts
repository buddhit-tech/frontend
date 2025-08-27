import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  chatService,
  ChatMessage,
  ChatResponse,
} from "../services/chatService";

export const useChat = () => {
  const queryClient = useQueryClient();

  // Query for chat history
  const {
    data: chatHistory = [],
    isLoading: isLoadingHistory,
    error: historyError,
  } = useQuery({
    queryKey: ["chatHistory"],
    queryFn: chatService.getChatHistory,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutation for sending messages
  const sendMessageMutation = useMutation({
    mutationFn: chatService.sendMessage,
    onSuccess: (response: ChatResponse, variables: string) => {
      // Optimistically update the chat history
      const newUserMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "user",
        content: variables,
        timestamp: new Date(),
      };

      const newAiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: response.message,
        timestamp: new Date(),
      };

      queryClient.setQueryData(["chatHistory"], (old: ChatMessage[] = []) => [
        ...old,
        newUserMessage,
        newAiMessage,
      ]);
    },
    onError: (error) => {
      console.error("Failed to send message:", error);
    },
  });

  const sendMessage = (message: string) => {
    sendMessageMutation.mutate(message);
  };

  return {
    chatHistory,
    isLoadingHistory,
    historyError,
    sendMessage,
    isSending: sendMessageMutation.isPending,
    sendError: sendMessageMutation.error,
  };
};
