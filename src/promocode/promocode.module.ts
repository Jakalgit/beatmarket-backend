import { Module } from '@nestjs/common';
import { PromoCodeService } from './promocode.service';
import { PromoCodeController } from './promocode.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { PromoCode } from "./promocode.model";

@Module({
  providers: [PromoCodeService],
  controllers: [PromoCodeController],
  imports: [
    SequelizeModule.forFeature([PromoCode])
  ]
})
export class PromoCodeModule {}
