import { Module } from '@nestjs/common';
import { LicenseService } from './license.service';
import { LicenseController } from './license.controller';
import { FilesModule } from "../files/files.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { License } from "./license.model";
import { LicenseParagraph } from "./paragraph.model";

@Module({
  providers: [LicenseService],
  controllers: [LicenseController],
  imports: [
    FilesModule,
    SequelizeModule.forFeature([License, LicenseParagraph])
  ]
})
export class LicenseModule {}
