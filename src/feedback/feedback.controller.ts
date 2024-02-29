import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { FeedbackService } from "./feedback.service";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";

@Controller('feedback')
export class FeedbackController {

    constructor(private feedbackService: FeedbackService) {}

    @Post()
    create(@Body() dto: CreateFeedbackDto) {
        return this.feedbackService.create(dto)
    }

    @Get()
    getAll() {
        return this.feedbackService.getAllFeedbacks()
    }

    @Get('/:id')
    getOneById(@Param('id') id: number) {
        return this.feedbackService.getFeedbackById(id)
    }
}
