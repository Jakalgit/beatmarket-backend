import { IsNumber } from "class-validator";

export class ChangeSubscribeDto {

    @IsNumber({}, {message: "userId должно быть числом"})
    readonly userId: number;

    @IsNumber({}, {message: "creatorId должно быть числом"})
    readonly creatorId: number;
}