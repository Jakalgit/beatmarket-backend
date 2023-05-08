import { IsNumber } from "class-validator";

export class CreateTrackDto {

    // readonly creatorId: number;

    readonly name: string;

    @IsNumber({}, {message: "bpm должно быть числом"})
    readonly bpm: number;
}