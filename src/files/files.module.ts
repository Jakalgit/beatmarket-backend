import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { FilesController } from './files.controller';

@Module({
  providers: [FilesService],
  exports: [FilesService],
  controllers: [FilesController]
})
export class FilesModule {}
