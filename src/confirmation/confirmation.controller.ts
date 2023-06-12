import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ConfirmationService } from "./confirmation.service";
import { CreateConfirmationDto } from "./dto/create-confirmation.dto";

@Controller('confirmation')
export class ConfirmationController {

    constructor(private confirmationService: ConfirmationService) {}

    @Post()
    create(dto: CreateConfirmationDto) {
        return this.confirmationService.create(dto)
    }

    @Post('/extend/:id')
    extend(@Param('id') id: number) {
        return this.confirmationService.extend(id)
    }

    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.confirmationService.delete(id)
    }

    @Get('/by-user/:id')
    getAllByUserId(@Param('id') id: number) {
        return this.confirmationService.getAllByUserId(id)
    }

    @Get('/by-creator/:id')
    getAllByCreatorId(@Param('id') id: number){
        return this.confirmationService.getAllByCreatorId(id)
    }

    @Get('/by-license/:id')
    getAllByLicenseId(@Param('id') id: number) {
        return this.confirmationService.getAllByLicenseId(id)
    }

    @Get('/by-track/:id')
    getAllByTrackId(@Param('id') id: number) {
        return this.confirmationService.getAllByTrackId(id)
    }

    @Get()
    getAll() {
        return this.confirmationService.getAll()
    }
}
