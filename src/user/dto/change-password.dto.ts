import { IsNumber, Length } from "class-validator";

export class ChangePasswordDto {

    @Length(8, 32, {message: "Пароль от 8 до 32 символов"})
    readonly password: string;

    @IsNumber({}, {message: "id должно быть числом"})
    readonly id: number;
}