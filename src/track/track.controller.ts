import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateTrackDto } from "./dto/create-track.dto";
import { TrackService } from "./track.service";
import { ChangeNameDto } from "../dto/change-name.dto";
import { ChangeBpmDto } from "./dto/change-bpm.dto";
import { CreateArchiveLicenseDto } from "./dto/create-archive-license.dto";

@Controller('track')
export class TrackController {

    constructor(private trackService: TrackService) {
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1},
        { name: 'audio', maxCount: 1},
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
        const {image, audio} = files
        return this.trackService.create(dto, image[0], audio[0])
    }

    @Post('/name')
    changeName(@Body() dto: ChangeNameDto) {
        return this.trackService.changeName(dto)
    }

    @Post('/bpm')
    changeBpm(@Body() dto: ChangeBpmDto) {
        return this.trackService.changeBpm(dto)
    }

    @Post('/image')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1},
    ]))
    changeImage(@UploadedFiles() files, @Body() id: number) {
        return this.trackService.changeImage(id, files.image[0])
    }

    @Post('/audio')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'audio', maxCount: 1},
    ]))
    changeAudio(@UploadedFiles() files, @Body() id: number) {
        return this.trackService.changeAudio(id, files.audio[0])
    }

    @Get('/:id')
    getOneById(@Param() id: number) {
        return this.trackService.getOneById(id)
    }

    @Post('/license/add')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'archive', maxCount: 1},
    ]))
    addArchiveLicense(@UploadedFiles() files, @Body() dto: CreateArchiveLicenseDto) {
        return this.trackService.addArchiveLicense(dto, files.archive[0])
    }

    @Delete('/license/remove')
    removeArchiveLicense(@Body() id: number) {
        return this.trackService.removeArchiveLicense(id)
    }

    @Delete()
    delete(@Body() id: number) {
        return this.trackService.delete(id)
    }

    @Get('/all')
    getAll() {
        return this.trackService.getAll()
    }
}
