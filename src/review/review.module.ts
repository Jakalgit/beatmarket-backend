import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Review } from "./review.model";
import { User } from "../user/user.model";
import { Creator } from "../creator/creator.model";

@Module({
  providers: [ReviewService],
  controllers: [ReviewController],
  imports: [
    SequelizeModule.forFeature([Review, User, Creator])
  ]
})
export class ReviewModule {}
