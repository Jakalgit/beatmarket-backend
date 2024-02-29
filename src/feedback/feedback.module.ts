import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Feedback } from "./feedback.model";

@Module({
  providers: [FeedbackService],
  controllers: [FeedbackController],
  imports: [
    SequelizeModule.forFeature([Feedback])
  ]
})
export class FeedbackModule {}
