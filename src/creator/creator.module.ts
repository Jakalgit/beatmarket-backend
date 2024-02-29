import { Module } from '@nestjs/common';
import { CreatorService } from './creator.service';
import { CreatorController } from './creator.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Creator } from "./creator.model";
import { User } from "../user/user.model";
import { NotificationCreator } from "./notification.model";
import { FilesModule } from "../files/files.module";

@Module({
  providers: [CreatorService],
  controllers: [CreatorController],
  imports: [
      FilesModule,
      SequelizeModule.forFeature([User, Creator, NotificationCreator])
  ]
})
export class CreatorModule {}
