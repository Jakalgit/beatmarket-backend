import { IsNumber } from "class-validator";

export class ChangeImageDto {

    @IsNumber({}, {message: "id должно быть числом"})
    readonly id: number;
}