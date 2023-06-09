import { IsBoolean, IsNumber, Length } from "class-validator";

export class CreateLicenseDto {

    @Length(4, 50, {message: "Название от 4 до 50 символов"})
    readonly name: string;

    @IsNumber({}, {message: "price должно быть числом"})
    readonly price: number;

    @IsBoolean({message: "withdraw должно быть boolean"})
    readonly withdraw: boolean;

    @Length(1, 20, {message: "Должно быть не менее 1 и не более 20 пунктов"})
    readonly paragraphs: string[];

    @IsNumber({}, {message: "creator должно быть числом"})
    readonly creatorId: number;
}