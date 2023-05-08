import { IsBoolean, IsNumber, Length } from "class-validator";
import { CreateParagraphDto } from "./create-paragraph-dto";

export class CreateLicenseDto {

    @Length(4, 50, {message: "Название от 4 до 50 символов"})
    readonly name: string;

    @IsNumber({}, {message: "price должно быть числом"})
    readonly price: number;

    @IsBoolean({message: "withdraw должно быть boolean"})
    readonly withdraw: boolean;

    @Length(1, 20, {message: "Должно быть не менее 1 и не более 20 пунктов"})
    readonly paragraphs: CreateParagraphDto[];

    @IsNumber({}, {message: "trackId должно быть числом"})
    readonly trackId: number;
}