import { IsNumber, Length } from "class-validator";

export class CreateParagraphDto {

    @Length(40, 600, {message: "Описание от 40 до 600 символов"})
    readonly text: string;

    @IsNumber({}, {message: "licenseId должно быть числом"})
    readonly licenseId: number;
}