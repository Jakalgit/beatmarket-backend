import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FilesModule } from "../files/files.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { Block } from "./block.model";

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
      FilesModule,
      SequelizeModule.forFeature([User, Block])
  ]
})
export class UserModule {}
