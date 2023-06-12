import { IsNumber, Length } from "class-validator";

export class ChangeIdentifierDto {

    @Length(8, 55, {message: "Идентификатор от 8 до 55 символов"})
    readonly identifier: string;

    @IsNumber({}, {message: "id должно быть числом"})
    readonly id: number;
}