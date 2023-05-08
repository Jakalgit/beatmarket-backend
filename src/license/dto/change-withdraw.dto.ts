import { IsBoolean, IsNumber } from "class-validator";

export class ChangeWithdrawDto {

    @IsNumber({}, {message: "id должно быть числом"})
    readonly id: number;

    @IsBoolean({message: "withdraw должно быть boolean"})
    readonly withdraw: boolean;
}