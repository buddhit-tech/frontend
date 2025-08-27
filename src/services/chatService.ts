export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  sources?: string[];
  confidence: number;
}

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const chatService = {
  async sendMessage(message: string): Promise<ChatResponse> {
    // Simulate API call
    await delay(1000 + Math.random() * 2000);
    
    // Simulate different responses based on message content
    const responses = [
      {
        message: `I understand you're asking about "${message}". Let me help you with that. This is a comprehensive response that would typically come from an AI assistant. I can provide detailed information, analysis, and insights on various topics.`,
        sources: ['source1.com', 'source2.org', 'source3.net'],
        confidence: 0.95
      },
      {
        message: `Great question! "${message}" is an interesting topic. Here's what I found: This is a detailed explanation that covers multiple aspects of your query. I've gathered information from reliable sources to provide you with accurate and helpful insights.`,
        sources: ['research.org', 'academic.edu'],
        confidence: 0.88
      },
      {
        message: `Regarding "${message}", I can provide you with several perspectives. This response includes practical advice, theoretical background, and real-world examples to help you understand the topic better.`,
        sources: ['example.com', 'guide.net'],
        confidence: 0.92
      }
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return randomResponse;
  },

  async getChatHistory(): Promise<ChatMessage[]> {
    await delay(500);
    
    return [
      {
        id: '1',
        type: 'user',
        content: 'How do I implement authentication in React?',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: '2',
        type: 'ai',
        content: 'To implement authentication in React, you can use several approaches. The most common methods include JWT tokens, OAuth, or session-based authentication. Here are the key steps...',
        timestamp: new Date(Date.now() - 3500000)
      },
      {
        id: '3',
        type: 'user',
        content: 'What are the best practices for TypeScript?',
        timestamp: new Date(Date.now() - 1800000)
      },
      {
        id: '4',
        type: 'ai',
        content: 'TypeScript best practices include using strict mode, proper type definitions, avoiding any type, using interfaces for object shapes, and leveraging utility types...',
        timestamp: new Date(Date.now() - 1700000)
      }
    ];
  }
};
