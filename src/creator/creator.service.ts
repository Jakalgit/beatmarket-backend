import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Creator } from "./creator.model";
import { CreateCreatorDto } from "./dto/create-creator.dto";
import { User } from "../user/user.model";
import { ChangeNameDto } from "../dto/change-name.dto";
import { FilesService, TypeFile } from "../files/files.service";
import { DEFAULT_USER_PREVIEW } from "../consts/consts";
import { NotificationCreator } from "./notification.model";
import { CreateNotificationDto } from "../dto/create-notification.dto";

@Injectable()
export class CreatorService {

    constructor(@InjectModel(Creator) private creatorRepository: typeof Creator,
                @InjectModel(User) private userRepository: typeof User,
                @InjectModel(NotificationCreator) private notificationRepository: typeof NotificationCreator,
                private fileService: FilesService) {}

    async create(dto: CreateCreatorDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }
        return await this.creatorRepository.create({
            name: user.name,
            userId: user.id,
            image: user.image
        })
    }

    async changeName(dto: ChangeNameDto) {
        const creator = await this.creatorRepository.findByPk(dto.id)
        if (!creator) {
            throw new HttpException('Создатель не найден', HttpStatus.NOT_FOUND)
        }
        creator.name = dto.name
        await creator.save()
        return creator
    }

    async changeImage(id: number, file) {
        const creator = await this.creatorRepository.findByPk(id)
        if (!creator) {
            throw new HttpException('Создатель не найден', HttpStatus.NOT_FOUND)
        }
        if (creator.image !== DEFAULT_USER_PREVIEW) await this.fileService.removeFile(creator.image, TypeFile.IMAGE)
        creator.image = await this.fileService.createImageFile(file)
        await creator.save()
        return creator
    }

    async createNotification(dto: CreateNotificationDto) {
        return this.notificationRepository.create(dto)
    }

    async deleteNotification(id: number) {
        return this.notificationRepository.destroy({where: {id}})
    }

    async getOne(id: number) {
        return this.creatorRepository.findByPk(id)
    }

    async getAll() {
        return this.creatorRepository.findAll()
    }
}
