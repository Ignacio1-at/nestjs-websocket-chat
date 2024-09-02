import { Injectable } from '@nestjs/common';

interface ChatMessage {
  userId: string;
  message: string;
  timestamp: Date;
}

@Injectable()
export class ChatService {
  private messages: ChatMessage[] = [];

  addMessage(userId: string, message: string): ChatMessage {
    const newMessage = {
      userId,
      message,
      timestamp: new Date(),
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  getRecentMessages(count: number = 50): ChatMessage[] {
    return this.messages.slice(-count);
  }

  // Puedes añadir más métodos según necesites, por ejemplo:
  // getUserMessages(userId: string): ChatMessage[] { ... }
  // clearChat(): void { ... }
}