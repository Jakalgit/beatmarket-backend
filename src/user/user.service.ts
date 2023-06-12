import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserDto } from "../dto/create-user.dto";
import { Block } from "./block.model";
import { CreateBlockDto } from "./dto/create-block.dto";
import { ChangeEmailDto } from "./dto/change-email.dto";
import { ChangePhoneDto } from "./dto/change-phone.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ChangeImageDto } from "./dto/change-image.dto";
import { ChangeNameDto } from "../dto/change-name.dto";
import { ChangeIdentifierDto } from "./dto/change-identifier.dto";
import { Op } from "sequelize";
import { FilesService, TypeFile } from "../files/files.service";
import { DEFAULT_USER_PREVIEW } from "../consts/consts";
import { CreateNotificationDto } from "../dto/create-notification.dto";
import { Notification } from "./notification.model";
import { Subscribe } from "./subscribe.model";
import { ChangeSubscribeDto } from "./dto/change-subscribe.dto";
import { Creator } from "../creator/creator.model";

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                @InjectModel(Block) private blockRepository: typeof Block,
                @InjectModel(Notification) private notificationRepository: typeof Notification,
                @InjectModel(Subscribe) private subscribeRepository: typeof Subscribe,
                @InjectModel(Creator) private creatorRepository: typeof Creator,
                private fileService: FilesService) {
    }

    async create(dto: CreateUserDto) {
        const rand = Date.now() +  Math.floor(Math.random() * 10000)
        const name = rand + "-market-user"
        const identifier = "id-" + rand
        const image = DEFAULT_USER_PREVIEW
        return await this.userRepository.create({ ...dto, name, identifier, image });
    }

    async getOneById(id: number) {
        return await this.userRepository.findOne({where: {id}})
    }

    async getOneByIdentifier(identifier: string) {
        return await this.userRepository.findOne({where: {identifier}})
    }

    async getOneByEmail(email: string) {
        return await this.userRepository.findOne({where: {email}})
    }

    async getAll() {
        return await this.userRepository.findAll()
    }

    async delete() {

    }

    async createNotification(dto: CreateNotificationDto) {
        return this.notificationRepository.create(dto)
    }

    async deleteNotification(id: number) {
        return this.notificationRepository.destroy({where: {id}})
    }

    async subscribe(dto: ChangeSubscribeDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const creator = await this.creatorRepository.findByPk(dto.creatorId)
        const candidate = await this.subscribeRepository.findOne({where: {creatorId: dto.creatorId, userId: dto.userId}})
        if (candidate) {
            throw new HttpException('Пользователь уже подписан', HttpStatus.BAD_REQUEST)
        }
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }
        if (!creator) {
            throw new HttpException('Создатель не найден', HttpStatus.NOT_FOUND)
        }
        const subscribe = await this.subscribeRepository.create(dto)
        await subscribe.$set('user', user)
        await subscribe.$set('creator', creator)
        subscribe.user = user
        subscribe.creator = creator
        return subscribe
    }

    async unsubscribe(dto: ChangeSubscribeDto) {
        const subscribe = await this.subscribeRepository.findOne({where: {creatorId: dto.creatorId, userId: dto.userId}})
        if (!subscribe) {
            throw new HttpException('Такой подписки не сущетсвует', HttpStatus.NOT_FOUND)
        }
        await subscribe.destroy()
        return subscribe
    }

    // для администратора, будет перенесена
    async block(dto: CreateBlockDto) {
        const block = await this.blockRepository.findOne({where: {userId: dto.userId}})
        const user = await this.userRepository.findByPk(dto.userId)
        if (block) {
            throw new HttpException('Пользователь уже заблокирован', HttpStatus.BAD_REQUEST)
        }
        if (user) {
            await user.$set('block', block.id)
            return dto
        }
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }

    // для администратора, будет перенесена
    async unBlock(userId: number) {
        const block = await this.blockRepository.findOne({where: {userId}})
        const user = await this.userRepository.findByPk(userId)
        if (!block) {
            throw new HttpException('Пользователь уже разблокирован', HttpStatus.BAD_REQUEST)
        }
        if (user) {
            await user.$remove('block', block.id)
            await block.destroy()
            return user
        }
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }

    async changeName(dto: ChangeNameDto) {
        const user = await this.userRepository.findByPk(dto.id)
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }
        user.name = dto.name
        await user.save()
        return user
    }

    async changeEmail(dto: ChangeEmailDto) {
        const user = await this.userRepository.findByPk(dto.id)
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }
        user.email = dto.email
        await user.save()
        return user
    }

    async changePhone(dto: ChangePhoneDto) {
        const user = await this.userRepository.findByPk(dto.id)
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }
        user.phone = dto.phone
        await user.save()
        return user
    }

    async changePassword(dto: ChangePasswordDto) {
        /*
        const user = await this.userRepository.findByPk(dto.id)
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }
        user.password = dto.password
        await user.save()
        return user
         */
    }

    async changeImage(dto: ChangeImageDto, file) {
        const user = await this.userRepository.findByPk(dto.id)
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }
        if (user.image !== DEFAULT_USER_PREVIEW) await this.fileService.removeFile(user.image, TypeFile.IMAGE)
        user.image = await this.fileService.createImageFile(file)
        await user.save()
        return user
    }

    async changeIdentifier(dto: ChangeIdentifierDto) {
        const candidate = await this.userRepository.findOne({where: {identifier: dto.identifier, id: {[Op.not]: dto.id}}})
        if (candidate) {
            throw new HttpException('Пользователь с таким идентификатором уже существует', HttpStatus.FORBIDDEN)
        }
        const user = await this.userRepository.findByPk(dto.id)
        user.identifier = dto.identifier
        await user.save()
        return user
    }
}
