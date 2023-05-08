import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { License } from "./license.model";
import { CreateLicenseDto } from "./dto/create-license.dto";
import { LicenseParagraph } from "./paragraph.model";
import { CreateParagraphDto } from "./dto/create-paragraph-dto";
import { ChangeNameDto } from "../dto/change-name.dto";
import { ChangePriceDto } from "./dto/change-price.dto";
import { ChangeWithdrawDto } from "./dto/change-withdraw.dto";

@Injectable()
export class LicenseService {

    constructor(@InjectModel(License) private licenseRepository: typeof License,
                @InjectModel(LicenseParagraph) private paragraphRepository: typeof LicenseParagraph) {}

    async create(dto: CreateLicenseDto) {
        const paragraphs = dto.paragraphs
        for (let i = 0; i < paragraphs.length; i++) {
            const candidate = await this.paragraphRepository.findOne({where: {text: paragraphs[i].text}})
            if (candidate) {
                throw new HttpException('Пункты описания не должны совпадать', HttpStatus.FORBIDDEN)
            }
        }
        const license = await this.licenseRepository.create({
            name: dto.name,
            price: dto.price,
            withdraw: dto.withdraw,
            trackId: dto.trackId,
        })
        for (let i = 0; i < paragraphs.length; i++) {
            const paragraph = await this.paragraphRepository.create(paragraphs[0])
            if (paragraph) {
                throw new HttpException('Внутренняя ошибка сервера', HttpStatus.INTERNAL_SERVER_ERROR)
            }
            await license.$add('paragraph', [paragraph.id])
        }
        return license
    }

    async addLicenseParagraph(arrayDto: CreateParagraphDto[]) {

    }

    async delete(id: number) {
        const license = await this.licenseRepository.findByPk(id)
        for (let i = 0; i < license.paragraphs.length; i++) {
            const paragraph = await this.paragraphRepository.findByPk(license.paragraphs[i].id)
            if (paragraph) await paragraph.destroy()
        }
        await license.destroy()
        return "Deleted"
    }

    async removeLicenseParagraph() {

    }

    async changeName(dto: ChangeNameDto) {
        const license = await this.licenseRepository.findByPk(dto.id)
        if (!license) {
            throw new HttpException('Лицензия не найдена', HttpStatus.NOT_FOUND)
        }
        license.name = dto.name
        await license.save()
        return license
    }

    async changePrice(dto: ChangePriceDto) {
        const license = await this.licenseRepository.findByPk(dto.id)
        if (!license) {
            throw new HttpException('Лицензия не найдена', HttpStatus.NOT_FOUND)
        }
        license.price = dto.price
        await license.save()
        return license
    }

    async changeWithdraw(dto: ChangeWithdrawDto) {
        const license = await this.licenseRepository.findByPk(dto.id)
        if (!license) {
            throw new HttpException('Лицензия не найдена', HttpStatus.NOT_FOUND)
        }
        license.withdraw = dto.withdraw
        await license.save()
        return license
    }
}
