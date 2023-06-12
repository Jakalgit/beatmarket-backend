import { IsNumber } from "class-validator";

export class CreateTrackDto {

    readonly name: string;

    @IsNumber({}, {message: "bpm должно быть числом"})
    readonly bpm: number;

    @IsNumber({}, {message: "creatorId должно быть числом"})
    readonly creatorId: number;
}