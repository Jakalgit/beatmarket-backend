import { Module } from "@nestjs/common";
import { UserModule } from './user/user.module';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user/user.model";
import { ConfigModule } from "@nestjs/config";
import { TrackModule } from './track/track.module';
import { FilesModule } from './files/files.module';
import { Track } from "./track/track.model";
import { Block } from "./user/block.model";
import { ServeStaticModule } from "@nestjs/serve-static";
import { LicenseModule } from './license/license.module';
import * as path from "path"
import {ArchiveLicense} from "./track/archive-license.model";
import {LicenseParagraph} from "./license/paragraph.model";
import {License} from "./license/license.model";
import { AuthModule } from './auth/auth.module';
import { CreatorModule } from './creator/creator.module';
import { PromoCodeModule } from './promocode/promocode.module';
import { ReviewModule } from './review/review.module';
import { ConfirmationModule } from './confirmation/confirmation.module';
import { PurchaseModule } from './purchase/purchase.module';
import { FeedbackModule } from './feedback/feedback.module';
import { Confirmation } from "./confirmation/confirmation.model";
import { Review } from "./review/review.model";
import { PromoCode } from "./promocode/promocode.model";
import { Purchase } from "./purchase/purchase.model";
import { PurchaseParagraph } from "./purchase/paragraph.model";
import { Notification } from "./user/notification.model";
import { Subscribe } from "./user/subscribe.model";
import { Creator } from "./creator/creator.model";

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: `.env`
      }),
      ServeStaticModule.forRoot({
          rootPath: path.resolve(__dirname, 'static')
      }),
      SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          models: [User, Track, Block, Creator, License, ArchiveLicense, LicenseParagraph,
              Confirmation, Review, PromoCode, Purchase, PurchaseParagraph, Notification, Subscribe],
          autoLoadModels: true,
      }),
      FilesModule,
      TrackModule,
      UserModule,
      LicenseModule,
      AuthModule,
      CreatorModule,
      PromoCodeModule,
      ReviewModule,
      ConfirmationModule,
      PurchaseModule,
      FeedbackModule,
  ]
})
export class AppModule {

}