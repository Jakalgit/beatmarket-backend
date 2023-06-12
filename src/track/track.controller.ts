import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UploadedFiles,
    UseInterceptors
} from "@nestjs/common";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
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

    @Post('/change-image')
    @UseInterceptors(FileInterceptor('image'))
    changeImage(@UploadedFile() image, @Body() id: number) {
        return this.trackService.changeImage(id, image)
    }

    @Post('/change-audio')
    @UseInterceptors(FileInterceptor('audio'))
    changeAudio(@UploadedFile() audio, @Body() id: number) {
        return this.trackService.changeAudio(id, audio)
    }

    @Post('/increment-reactions')
    incrementReactions(@Body() id: number) {
        return this.trackService.incrementReactions(id)
    }

    @Get('/by-id/:id')
    getOneById(@Param('id') id: number) {
        return this.trackService.getOneById(id)
    }

    @Post('/license-archive/add')
    @UseInterceptors(FileInterceptor('archive'))
    addArchiveLicense(@UploadedFile() archive, @Body() dto: CreateArchiveLicenseDto) {
        return this.trackService.addArchiveLicense(dto, archive)
    }

    @Delete('/license-archive/remove/:id')
    removeArchiveLicense(@Param('id') id: number) {
        return this.trackService.removeArchiveLicense(id)
    }

    @Delete()
    delete(@Body() id: number) {
        return this.trackService.delete(id)
    }

    @Get('/licenses/:id')
    getAllLicenseByTrackId(@Param('id') id: number) {
        return this.trackService.getAllLicenseByTrackId(id)
    }

    @Get('/all')
    getAll() {
        return this.trackService.getAll()
    }
}
