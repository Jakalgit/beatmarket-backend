import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { PromoCodeService } from "./promocode.service";
import { CreatePromoCodeDto } from "./dto/create-promocode.dto";

@Controller('promocode')
export class PromoCodeController {

    constructor(private promoService: PromoCodeService) {}

    @Post()
    create(@Body() dto: CreatePromoCodeDto) {
        return this.promoService.create(dto)
    }

    @Post('/:code')
    usePromo(@Param('code') code: string) {
        return this.promoService.usePromo(code)
    }

    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.promoService.delete(id)
    }

    @Get('/one/:code')
    getOne(@Param('code') code: string) {
        return this.promoService.getOne(code)
    }

    @Get('/creator/:creatorId')
    getAllByCreatorId(@Param('creatorId') creatorId: number) {
        return this.promoService.getAllByCreatorId(creatorId)
    }

    @Get('/all')
    getAll() {
        return this.promoService.getAll()
    }
}
