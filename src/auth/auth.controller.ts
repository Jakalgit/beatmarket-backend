import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

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
        return this.authService.createCode(dto)
    }

    @Post('/check-validation-user-token')
    isValidationUserToken(@Body('accessToken') accessToken: string,
                          @Body('refreshToken') refreshToken: string) {
        return this.authService.isValidationToken(accessToken, refreshToken)
    }
}
