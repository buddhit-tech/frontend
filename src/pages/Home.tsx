import React, { useState } from "react";
import { Sparkle, Globe, BookOpen, Calculator } from "@phosphor-icons/react";
import { useChat } from "../hooks/useChat";
import { ChatMessage, ChatInput, SuggestionCard } from "../components/chat";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui";

const Home: React.FC = () => {
  const { chatHistory, sendMessage, isSending, isLoadingHistory } = useChat();

  const suggestions = [
    {
      icon: Sparkle,
      title: "Creative Writing",
      description: "Help me write a story about...",
      color: "bg-purple-100 dark:bg-purple-900",
    },
    {
      icon: Globe,
      title: "Research",
      description: "Find information about...",
      color: "bg-blue-100 dark:bg-blue-900",
    },
    {
      icon: BookOpen,
      title: "Learning",
      description: "Explain how to...",
      color: "bg-green-100 dark:bg-green-900",
    },
    {
      icon: Calculator,
      title: "Math & Science",
      description: "Solve this problem...",
      color: "bg-orange-100 dark:bg-orange-900",
    },
  ];

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const handleMessageAction = (action: string, messageId: string) => {
    console.log(`${action} clicked for message ${messageId}`);
    // Handle different actions (thumbs up, copy, share, etc.)
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-6">
      {/* Welcome Section */}
      {chatHistory.length === 0 && !isLoadingHistory && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
          <Card variant="elevated" padding="xl" className="max-w-2xl">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-gray-900 dark:text-white">
                How can I help you today?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Ask me anything! I can help with research, writing,
                problem-solving, and much more.
              </p>
            </CardContent>
          </Card>

          {/* Suggestions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
            {suggestions.map((suggestion, index) => (
              <SuggestionCard
                key={index}
                icon={suggestion.icon}
                title={suggestion.title}
                description={suggestion.description}
                color={suggestion.color}
                onClick={() => handleSuggestionClick(suggestion.description)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      {chatHistory.length > 0 && (
        <div className="flex-1 overflow-y-auto space-y-6 mb-6">
          {chatHistory.map((message) => (
            <ChatMessage
              key={message.id}
              id={message.id}
              type={message.type}
              content={message.content}
              timestamp={message.timestamp}
              onThumbsUp={() => handleMessageAction("thumbsUp", message.id)}
              onThumbsDown={() => handleMessageAction("thumbsDown", message.id)}
              onCopy={() => handleMessageAction("copy", message.id)}
              onShare={() => handleMessageAction("share", message.id)}
            />
          ))}

          {/* Loading indicator */}
          {isSending && (
            <div className="flex justify-start">
              <div className="max-w-3xl">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">AI</span>
                  </div>
                  <Card className="p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chat Input */}
      <ChatInput
        onSubmit={sendMessage}
        disabled={isSending}
        loading={isSending}
        onMicrophoneClick={() => console.log("Microphone clicked")}
        onImageClick={() => console.log("Image clicked")}
        onCameraClick={() => console.log("Camera clicked")}
      />
    </div>
  );
};

export default Home;
