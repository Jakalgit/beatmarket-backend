import { IsNumber } from "class-validator";

export class CreateChatDto {

    @IsNumber({}, {message: "idOwner1 должно быть числом"})
    idOwner1: number;

    @IsNumber({}, {message: "idOwner2 должно быть числом"})
    idOwner2: number;
}