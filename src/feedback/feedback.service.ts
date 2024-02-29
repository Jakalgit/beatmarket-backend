import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Feedback } from "./feedback.model";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";

@Injectable()
export class FeedbackService {

    constructor(@InjectModel(Feedback) private feedbackRepository: typeof Feedback) {}

    async create(dto: CreateFeedbackDto) {
        return await this.feedbackRepository.create(dto)
    }

    async getAllFeedbacks() {
        return this.feedbackRepository.findAll()
    }

    async getFeedbackById(id: number) {
        return this.feedbackRepository.findOne({where: {id}})
    }
}
