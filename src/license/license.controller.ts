import {Body, Controller, Get, Param, Post, Query} from "@nestjs/common";
import { CreateLicenseDto } from "./dto/create-license.dto";
import { LicenseService } from "./license.service";
import { ChangeNameDto } from "../dto/change-name.dto";
import { ChangePriceDto } from "./dto/change-price.dto";
import { ChangeWithdrawDto } from "./dto/change-withdraw.dto";

@Controller('license')
export class LicenseController {

    constructor(private licenseService: LicenseService) {}

    @Post()
    create(@Body() dto: CreateLicenseDto) {
        return this.licenseService.create(dto)
    }

    @Post('/name')
    changeName(@Body() dto: ChangeNameDto) {
        return this.licenseService.changeName(dto)
    }

    @Post('/price')
    changePrice(@Body() dto: ChangePriceDto) {
        return this.licenseService.changePrice(dto)
    }

    @Post('/withdraw')
    changeWithdraw(@Body() dto: ChangeWithdrawDto) {
        return this.licenseService.changeWithdraw(dto)
    }

    @Get()
    getAll() {
        return this.licenseService.getAll()
    }

    @Get('/paragraphs/:id')
    getAllParagraphsByLicenseId(@Param('id') id: number) {
        return this.licenseService.getAllParagraphByLicenseId(id)
    }
}
