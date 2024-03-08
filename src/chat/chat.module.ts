import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MessageGateway } from './message.gateway';
import { SequelizeModule } from "@nestjs/sequelize";
import { Message } from "./message.model";
import { Chat } from "./chat.model";
import { User } from "../user/user.model";

@Module({
  controllers: [ChatController],
  providers: [ChatService, MessageGateway],
  imports: [
    SequelizeModule.forFeature([Message, Chat, User])
  ],
})
export class ChatModule {}
