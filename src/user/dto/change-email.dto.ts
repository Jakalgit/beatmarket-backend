import { IsEmail, IsNumber } from "class-validator";

export class ChangeEmailDto {

    @IsEmail({}, {message: "Некорректный E-Mail"})
    readonly email: string;

    @IsNumber({}, {message: "id должно быть числом"})
    readonly id: number;
}