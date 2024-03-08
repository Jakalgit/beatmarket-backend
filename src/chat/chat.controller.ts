import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { CreateMessageDto } from "./dto/create-message.dto";
import { JwtGuard } from "../auth/guards/jwt.guard";

@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService) {
    }

    @Post('/create')
    createChat(@Body() dto: CreateChatDto) {
        return this.chatService.createChat(dto)
    }

    @Post('/create-message')
    createMessage(@Body() dto: CreateMessageDto) {
        return this.chatService.createMessage(dto)
    }

    @Get('/chats/:id')
    getChats(@Param('id') userId: number) {
        return this.chatService.getChats(userId)
    }

    @Get('/messages/:id')
    getMessages(@Param('id') chatId: number) {
        return this.chatService.getMessages(chatId)
    }

    @Post('/users/')
    getUsersByFinder(@Body('find') find: string, @Body('userId') userId: number) {
        return this.chatService.getUsersByFinder(find, userId)
    }
}
