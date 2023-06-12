import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/create-review.dto";

@Controller('review')
export class ReviewController {

    constructor(private reviewService: ReviewService) {}

    @Post()
    create(@Body() dto: CreateReviewDto) {
        return this.reviewService.create(dto)
    }

    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.reviewService.delete(id)
    }

    @Get('/by-creator/:id')
    getAllByCreatorId(@Param('id') id: number) {
        return this.reviewService.getAllByCreatorId(id)
    }

    @Get('/by-user/:id')
    getAllByUserId(@Param('id') id: number) {
        return this.reviewService.getAllByUserId(id)
    }

    @Get()
    getAll() {
        return this.reviewService.getAll()
    }
}
