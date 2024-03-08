import { IsNumber, IsString } from "class-validator";

export class CreateMessageDto {

    @IsNumber({}, {message: "chatId должно быть числом"})
    chatId: number;

    @IsString({message: "text должно быть строкой"})
    text: number;

    @IsString({message: "type должно быть строкой"})
    type: string;
}