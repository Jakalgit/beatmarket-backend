import { IsEmail, Length } from "class-validator";

export class CreateUserDto {

    @IsEmail({}, {message: "Некорректный E-Mail"})
    readonly email: string;

    @Length(8, 32, {message: "Пароль от 8 до 32 символов"})
    readonly password: string;
}