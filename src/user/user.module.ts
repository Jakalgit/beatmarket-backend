import { forwardRef, Module } from "@nestjs/common";
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FilesModule } from "../files/files.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { Block } from "./block.model";
import { AuthModule } from "../auth/auth.module";
import { Subscribe } from "./subscribe.model";
import { Creator } from "../creator/creator.model";
import { Notification } from "./notification.model";

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
      FilesModule,
      forwardRef(() => AuthModule),
      SequelizeModule.forFeature([User, Block, Subscribe, Notification, Creator])
  ],
  exports: [UserService]
})
export class UserModule {}
