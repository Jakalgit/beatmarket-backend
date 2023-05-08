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
          models: [User, Track, Block],
          autoLoadModels: true,
      }),
      FilesModule,
      TrackModule,
      UserModule,
      LicenseModule,
  ]
})
export class AppModule {

}