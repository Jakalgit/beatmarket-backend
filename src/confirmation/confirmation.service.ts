import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Confirmation } from "./confirmation.model";
import { User } from "../user/user.model";
import { Creator } from "../creator/creator.model";
import { CreateConfirmationDto } from "./dto/create-confirmation.dto";
import { License } from "../license/license.model";
import { Track } from "../track/track.model";

@Injectable()
export class ConfirmationService {

    constructor(@InjectModel(Confirmation) private confirmationRepository: typeof Confirmation,
                @InjectModel(User) private userRepository: typeof User,
                @InjectModel(Creator) private creatorRepository: typeof Creator,
                @InjectModel(Track) private trackRepository: typeof Track,
                @InjectModel(License) private licenseRepository: typeof License) {}

    async create(dto: CreateConfirmationDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const creator = await this.creatorRepository.findByPk(dto.creatorId)
        const track = await this.trackRepository.findByPk(dto.trackId)
        const license = await this.licenseRepository.findByPk(dto.licenseId)
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST)
        }
        if (!creator) {
            throw new HttpException('Создатель не найден', HttpStatus.BAD_REQUEST)
        }
        if (!track) {
            throw new HttpException('Произведение не найдено', HttpStatus.BAD_REQUEST)
        }
        if (!license) {
            throw new HttpException('Лицензия не найдена', HttpStatus.BAD_REQUEST)
        }
        console.log(track.licenses)
        if (creator.userId !== user.id || track.creatorId !== creator.id || license.creatorId !== creator.id
            || track.licenses.find(el => el.licenseId === license.id)) {
            throw new HttpException('Ошибка входных данных', HttpStatus.BAD_REQUEST)
        }
        return await this.confirmationRepository.create({...dto, end: Date.now() + 86400000})
    }

    async extend(id: number) {
        const confirmation = await this.confirmationRepository.findByPk(id)
        if (!confirmation) {
            throw new HttpException('Подтверждение не найдено', HttpStatus.BAD_REQUEST)
        }
        await confirmation.increment({
            'end' : 86400000,
        })
        return confirmation
    }

    async delete(id: number) {
        const confirmation = await this.confirmationRepository.findByPk(id)
        if (!confirmation) {
            throw new HttpException('Подтверждение не найдено', HttpStatus.BAD_REQUEST)
        }
        await confirmation.destroy()
        return confirmation
    }

    async getAllByUserId(userId: number) {
        return this.confirmationRepository.findAll({where: {userId}})
    }

    async getAllByCreatorId(creatorId: number) {
        return this.confirmationRepository.findAll({where: {creatorId}})
    }

    async getAllByLicenseId(licenseId: number) {
        return this.confirmationRepository.findAll({where: {licenseId}})
    }

    async getAllByTrackId(trackId: number) {
        return this.confirmationRepository.findAll({where: {trackId}})
    }

    async getAll() {
        return this.confirmationRepository.findAll()
    }
}
