import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthUserService } from "./auth-user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthUserService) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    @Post('/send-code')
    sendCode(@Body() dto: CreateUserDto) {
        return this.authService.registrationData(dto)
    }

    @Post('/check-validation-user-token')
    isValidationUserToken(@Body('token') token: string) {
        return this.authService.isValidationToken(token)
    }
}
