import { IsNumber } from "class-validator";

export class CreateBlockDto {

     @IsNumber({}, {message: "userId должно быть числом"})
     readonly userId: number;
}