import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PromoCode } from "./promocode.model";
import { CreatePromoCodeDto } from "./dto/create-promocode.dto";

@Injectable()
export class PromoCodeService {

    constructor(@InjectModel(PromoCode) private promoRepository: typeof PromoCode) {}

    async create(dto: CreatePromoCodeDto) {
        const candidate = await this.promoRepository.findOne({where: {code: dto.code}})
        if (candidate) {
            throw new HttpException('Промокод с таким названием уже был когда-то создан', HttpStatus.BAD_REQUEST)
        }
        return this.promoRepository.create(dto)
    }

    async usePromo(code: string) {
        const promo = await this.promoRepository.findOne({where: {code}})
        if (!promo) {
            throw new HttpException('Такого промокода не существует', HttpStatus.BAD_REQUEST)
        }
        if (promo.count <= 0 || (promo.end !== "indefinitely" && Number(promo.end) < Date.now())) {
            throw new HttpException('Действие промокода истекло', HttpStatus.FORBIDDEN)
        }
        await promo.decrement({'count': 1})
        await promo.save()
        return promo
    }

    async delete(id: number) {
        const promo = await this.promoRepository.findByPk(id)
        if (!promo) {
            throw new HttpException('Такого промокода не существует', HttpStatus.BAD_REQUEST)
        }
        await promo.destroy()
        return promo
    }

    async getOne(code: string) {
        return this.promoRepository.findOne({where: {code}})
    }

    async getAllByCreatorId(creatorId: number) {
        return this.promoRepository.findAll({where: {creatorId}})
    }

    async getAll() {
        return this.promoRepository.findAll()
    }
}
