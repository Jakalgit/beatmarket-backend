import { IsNumber } from "class-validator";

export class ChangeBpmDto {

    @IsNumber({}, {message: "id должно быть числом"})
    readonly id: number;

    @IsNumber({}, {message: "bpm должно быть числом"})
    readonly bpm: number;
}