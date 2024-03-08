import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Message } from "./message.model";
import { Chat } from "./chat.model";
import { CreateChatDto } from "./dto/create-chat.dto";
import { CreateMessageDto } from "./dto/create-message.dto";
import { Op } from "sequelize";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../user/user.model";

@Injectable()
export class ChatService {

    constructor(@InjectModel(Message) private messageRepository: typeof Message,
                @InjectModel(Chat) private chatRepository: typeof Chat,
                @InjectModel(User) private userRepository: typeof User) {
    }

    async createChat(dto: CreateChatDto) {
        if (dto.idOwner1 === dto.idOwner2) {
            throw new HttpException("Запрещено создавать чаты с самим собой", HttpStatus.CONFLICT)
        }
        return await this.chatRepository.create(dto)
    }

    async createMessage(dto: CreateMessageDto) {
        const chat = await this.chatRepository.findOne({where: {id: dto.chatId}})
        if (!chat) {
            throw new HttpException("Чат с таким id не найден", HttpStatus.NOT_FOUND)
        }
        return await this.chatRepository.create(dto)
    }

    async getMessages(id: number) {
        return await this.messageRepository.findAll({where: {chatId: id}})
    }

    async getChats(id: number): Promise<any> {
        const chats = await this.chatRepository.findAll({
            where: {
                [Op.or]: [{idOwner1: id}, {idOwner2: id}]
            }
        })
        if (chats.length === 0) {
            return []
        } else {
            const ids = chats.map(chat => {
                if (chat.dataValues.idOwner1 !== id) {
                    return chat.dataValues.idOwner1
                } else {
                    return chat.dataValues.idOwner2
                }
            })
            const users = await this.userRepository.findAll({
                where: {
                    id: {
                        [Op.or]: ids
                    }
                }
            })
            const usersData = users.map(user => {
                return {
                    id: user.dataValues.id,
                    name: user.dataValues.name,
                    identifier: user.dataValues.identifier,
                    preview: user.dataValues.image
                }
            })
            return chats.map(chat => {
                const data = usersData.find(el => el.id === chat.idOwner1 || el.id === chat.idOwner2)
                return {...chat, data}
            })
        }
    }

    async getUsersByFinder(text: string, userId: number) {
        const users = await this.userRepository.findAll({
            where: {
                identifier: {
                    [Op.substring]: text
                },
                id: {
                    [Op.ne]: userId
                }
            }
        })
        return users.map(user => {
            return {identifier: user.identifier, name: user.name}
        })
    }
}
