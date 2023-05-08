import { IsNumber } from "class-validator";

export class ChangePriceDto {

    @IsNumber({}, {message: "id должно быть числом"})
    readonly id: number;

    @IsNumber({}, {message: "price должно быть числом"})
    readonly price: number;
}