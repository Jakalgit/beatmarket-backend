import { IsNumber, Length } from "class-validator";

export class ChangeNameDto {

    @IsNumber({}, {message: "id должно быть числом"})
    readonly id: number;

    @Length(4, 50, {message: "Название от 4 до 50 символов"})
    readonly name: string;
}