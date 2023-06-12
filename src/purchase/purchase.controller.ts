import { Controller, Get, Param, Post } from "@nestjs/common";
import { CreatePurchaseDto } from "./dto/create-purchase.dto";
import { PurchaseService } from "./purchase.service";

@Controller('purchase')
export class PurchaseController {

    constructor(private purchaseService: PurchaseService) {
    }

    @Post()
    create(dto: CreatePurchaseDto) {
        return this.purchaseService.create(dto)
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.purchaseService.getOne(id)
    }

    @Get('/by-user/:id')
    getAllByUserId(@Param('id') id: number) {
        return this.purchaseService.getAllByUserId(id)
    }

    @Get('/by-creator/:id')
    getAllByCreatorId(@Param('id') id: number) {
        return this.purchaseService.getAllByCreatorId(id)
    }
}
