import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Review } from "./review.model";
import { CreateReviewDto } from "./dto/create-review.dto";
import { User } from "../user/user.model";
import { Creator } from "../creator/creator.model";

@Injectable()
export class ReviewService {

    constructor(@InjectModel(Review) private reviewRepository: typeof Review,
                @InjectModel(User) private userRepository: typeof User,
                @InjectModel(Creator) private creatorRepository: typeof Creator) {}

    async create(dto: CreateReviewDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const creator = await this.creatorRepository.findByPk(dto.creatorId)
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }
        if (!creator) {
            throw new HttpException('Создатель не найден', HttpStatus.NOT_FOUND)
        }
        const review = await this.reviewRepository.create(dto)
        await review.$set('user', [user.id])
        await review.$set('creator', [creator.id])
        review.user = user
        review.creator = creator
        return review
    }

    async delete(id: number) {
        const review = await this.reviewRepository.findByPk(id)
        if (!review) {
            throw new HttpException('Отзыв не найден', HttpStatus.BAD_REQUEST)
        }
        await review.destroy()
        return review
    }

    async getAllByCreatorId(creatorId: number) {
        return await this.reviewRepository.findAll({where: {creatorId}})
    }

    async getAllByUserId(userId: number) {
        return await this.reviewRepository.findAll({where: {userId}})
    }

    async getAll() {
        return this.reviewRepository.findAll()
    }
}
