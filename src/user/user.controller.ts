import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UploadedFile, UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateBlockDto } from "./dto/create-block.dto";
import { ChangeEmailDto } from "./dto/change-email.dto";
import { ChangePhoneDto } from "./dto/change-phone.dto";
import { ChangeNameDto } from "../dto/change-name.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ChangeIdentifierDto } from "./dto/change-identifier.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ChangeImageDto } from "./dto/change-image.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ChangeSubscribeDto } from "./dto/change-subscribe.dto";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/by-id/:id')
    getOne(@Param('id') id: number) {
        return this.userService.getOneById(id)
    }

    @Get()
    getAll() {
        return this.userService.getAll()
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete')
    delete(@Body() id: number) {
        return this.userService.delete()
    }

    @Post('/block')
    block(@Body() dto: CreateBlockDto) {
        return this.userService.block(dto)
    }

    @Post('/unblock')
    unBlock(@Body() id: number) {
        return this.userService.unBlock(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/change-name')
    changeName(@Body() dto: ChangeNameDto) {
        return this.userService.changeName(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/change-email')
    changeEmail(@Body() dto: ChangeEmailDto) {
        return this.userService.changeEmail(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/change-phone')
    changePhone(@Body() dto: ChangePhoneDto) {
        return this.userService.changePhone(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/change-password')
    changePassword(@Body() dto: ChangePasswordDto) {
        return this.userService.changePassword(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/change-identifier')
    changeIdentifier(@Body() dto: ChangeIdentifierDto) {
        return this.userService.changeIdentifier(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/change-image')
    @UseInterceptors(FileInterceptor('image'))
    changeImage(@UploadedFile() image, @Body() dto: ChangeImageDto) {
        return this.userService.changeImage(dto, image)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/subscribe')
    subscribe(@Body() dto: ChangeSubscribeDto) {
        return this.userService.subscribe(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/unsubscribe')
    unsubscribe(@Body() dto: ChangeSubscribeDto) {
        return this.userService.unsubscribe(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/notifications/:id')
    getAllNotifications(@Param('id') id: number) {
        return this.userService.getAllNotificationsByUserId(id)
    }
}
