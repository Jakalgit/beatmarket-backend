import { IsNumber } from "class-validator";

export class CreateNotificationDto {

    readonly text: string;

    @IsNumber({}, {message: 'creatorId должно быть числом'})
    readonly creatorId: number;
}