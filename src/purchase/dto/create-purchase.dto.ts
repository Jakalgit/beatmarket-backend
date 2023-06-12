import { IsNumber, Length } from "class-validator";

export class CreatePurchaseDto {

    @IsNumber({}, {message: "trackId должно быть числом"})
    readonly trackId: number;

    @IsNumber({}, {message: "licenseId должно быть числом"})
    readonly licenseId: number;

    @IsNumber({}, {message: "userId должно быть числом"})
    readonly userId: number;

    @IsNumber({}, {message: "creatorId должно быть числом"})
    readonly creatorId: number;

    @Length(7, 110, {message: "Фио от 7 до 110 символов"})
    readonly fio: string;
}