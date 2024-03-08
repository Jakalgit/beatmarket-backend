import {
    OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io"
import { ChatService } from "./chat.service";
import { CreateMessageDto } from "./dto/create-message.dto";

@WebSocketGateway()
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

    constructor(private chatService: ChatService) {
    }

    @WebSocketServer() server: Server;

    @SubscribeMessage('sendMessage')
    async handleSendMessage(client: Socket, payload: CreateMessageDto) {
        await this.chatService.createMessage(payload)
        this.server.emit("recMessage", payload)
    }

    afterInit(server: any): any {
        console.log(server)
    }

    handleConnection(client: Socket) {
        console.log(`Connected: ${client.id}`)
    }

    handleDisconnect(client: Socket) {
        console.log(`Disconnected: ${client.id}`)
    }
}
