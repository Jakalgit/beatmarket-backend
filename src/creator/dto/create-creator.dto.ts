import { IsNumber } from "class-validator";

export class CreateCreatorDto {

    @IsNumber({}, {message: "userId должно быть числом"})
    userId: number;
}