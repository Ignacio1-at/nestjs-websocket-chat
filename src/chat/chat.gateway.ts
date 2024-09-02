import { 
  WebSocketGateway, 
  WebSocketServer, 
  SubscribeMessage, 
  OnGatewayConnection, 
  OnGatewayDisconnect 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    client.emit('recentMessages', this.chatService.getRecentMessages());
    this.server.emit('userConnected', { userId: client.id });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.server.emit('userDisconnected', { userId: client.id });
  }

  @SubscribeMessage('chatMessage')
  handleMessage(client: Socket, payload: { message: string }) {
    const newMessage = this.chatService.addMessage(client.id, payload.message);
    this.server.emit('newMessage', newMessage);
  }
}