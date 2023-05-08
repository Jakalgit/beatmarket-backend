import { IsNumber, IsPhoneNumber } from "class-validator";

export class ChangePhoneDto {

    @IsPhoneNumber("RU", {message: "Формат номера телефона +7XXXXXXXXXX"})
    readonly phone: string;

    @IsNumber({}, {message: "id должно быть числом"})
    readonly id: number;
}