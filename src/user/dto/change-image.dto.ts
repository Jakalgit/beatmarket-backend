import { IsNumber } from "class-validator";

export class ChangeImageDto {

    readonly image: string;

    @IsNumber({}, {message: "id должно быть числом"})
    readonly id: number;
}