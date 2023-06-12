import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Purchase } from "./purchase.model";
import { PurchaseParagraph } from "./paragraph.model";
import { User } from "../user/user.model";
import { Creator } from "../creator/creator.model";
import { Track } from "../track/track.model";
import { License } from "../license/license.model";
import { CreatePurchaseDto } from "./dto/create-purchase.dto";
import { LicenseParagraph } from "../license/paragraph.model";
import { ArchiveLicense } from "../track/archive-license.model";
import { Confirmation } from "../confirmation/confirmation.model";

@Injectable()
export class PurchaseService {

    constructor(@InjectModel(Purchase) private purchaseRepository: typeof Purchase,
                @InjectModel(PurchaseParagraph) private purchasePointRepository: typeof PurchaseParagraph,
                @InjectModel(User) private userRepository: typeof User,
                @InjectModel(Creator) private creatorRepository: typeof Creator,
                @InjectModel(Track) private trackRepository: typeof Track,
                @InjectModel(License) private licenseRepository: typeof License,
                @InjectModel(LicenseParagraph) private licensePointRepository: typeof LicenseParagraph,
                @InjectModel(ArchiveLicense) private archiveRepository: typeof ArchiveLicense,
                @InjectModel(Confirmation) private confirmationRepository: typeof Confirmation) {}

    async create(dto: CreatePurchaseDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const creator = await this.creatorRepository.findByPk(dto.creatorId)
        const track = await this.trackRepository.findByPk(dto.trackId)
        const license = await this.licenseRepository.findByPk(dto.licenseId)
        if (!user || !creator || !track || !license) {
            throw new HttpException('Обращение к несуществующим элементам', HttpStatus.BAD_REQUEST)
        }
        const archive = await this.archiveRepository.findOne({where: {licenseId: license.id, trackId: track.id}})
        if (!archive || track.creatorId !== creator.id || license.creatorId !== creator.id) {
            throw new HttpException('Обращение к несуществующим элементам', HttpStatus.BAD_REQUEST)
        }
        const confirmation = await this.confirmationRepository.findOne({where: {userId: user.id, creatorId: creator.id}})
        if (!confirmation || confirmation.end <= Date.now()) {
            throw new HttpException('Ожидание подтверждения покупки истекло', HttpStatus.FORBIDDEN)
        }
        const purchase = await this.purchaseRepository.create({
            name: track.name,
            bpm: track.bpm,
            price: license.price,
            image: track.image,
            license: license.name,
            fio: dto.fio,
            userId: user.id,
            creatorId: creator.id
        })
        const licenseParagraphs = await this.licensePointRepository.findAll({where: {licenseId: license.id}})
        for (let i = 0; i < licenseParagraphs.length; i++) {
            const purchaseParagraph = await this.purchasePointRepository.create({
                text: licenseParagraphs[i].text,
                purchaseId: purchase.id,
            })
            await purchase.$add('paragraphs', [purchaseParagraph.id])
            purchase.paragraphs = [purchaseParagraph]
            await purchaseParagraph.$set('purchase', purchase)
            purchaseParagraph.purchase = purchase
        }
        return purchase
    }

    async getOne(id: number) {
        return await this.purchaseRepository.findByPk(id)
    }

    async getAllByUserId(userId: number) {
        return await this.purchaseRepository.findAll({where: {userId}})
    }

    async getAllByCreatorId(creatorId: number) {
        return await this.purchaseRepository.findAll({where: {creatorId}})
    }
}
