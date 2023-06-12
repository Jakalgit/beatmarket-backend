import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Purchase } from "./purchase.model";
import { PurchaseParagraph } from "./paragraph.model";
import { User } from "../user/user.model";
import { Creator } from "../creator/creator.model";
import { Track } from "../track/track.model";
import { License } from "../license/license.model";
import { LicenseParagraph } from "../license/paragraph.model";
import { ArchiveLicense } from "../track/archive-license.model";
import { Confirmation } from "../confirmation/confirmation.model";

@Module({
  providers: [PurchaseService],
  controllers: [PurchaseController],
  imports: [
    SequelizeModule.forFeature([Purchase, PurchaseParagraph, User, Creator, Track,
      License, LicenseParagraph, ArchiveLicense, Confirmation])
  ]
})
export class PurchaseModule {}
