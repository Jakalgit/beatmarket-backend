import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FilesModule } from "../files/files.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { Track } from "./track.model";
import { ArchiveLicense } from "./archive-license.model";

@Module({
  providers: [TrackService],
  controllers: [TrackController],
  imports: [
      FilesModule,
      SequelizeModule.forFeature([Track, ArchiveLicense])
  ]
})
export class TrackModule {}
