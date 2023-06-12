import { Module } from '@nestjs/common';
import { ConfirmationService } from './confirmation.service';
import { ConfirmationController } from './confirmation.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Confirmation } from "./confirmation.model";
import { User } from "../user/user.model";
import { Creator } from "../creator/creator.model";
import { Track } from "../track/track.model";
import { License } from "../license/license.model";

@Module({
  providers: [ConfirmationService],
  controllers: [ConfirmationController],
  imports: [
    SequelizeModule.forFeature([Confirmation, User, Creator, Track, License])
  ]
})
export class ConfirmationModule {}
