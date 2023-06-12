import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreateCreatorDto } from "./dto/create-creator.dto";
import { CreatorService } from "./creator.service";
import { ChangeNameDto } from "../dto/change-name.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('creator')
export class CreatorController {

    constructor(private creatorService: CreatorService) {}

    @Post()
    create(@Body() dto: CreateCreatorDto) {
        return this.creatorService.create(dto)
    }

    @Post('/change-name')
    changeName(@Body() dto: ChangeNameDto) {
        return this.creatorService.changeName(dto)
    }

    @Post('/change-image')
    @UseInterceptors(FileInterceptor('image'))
    changeImage(@UploadedFile() image, @Body() id: number) {
        return this.creatorService.changeImage(id, image)
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.creatorService.getOne(id)
    }

    @Get('/all')
    getAll() {
        return this.creatorService.getAll()
    }
}
