import { Contains, IsAlpha, IsNumber, IsUppercase, Length, Min } from "class-validator";

export class CreatePromoCodeDto {

    @Length(4, 25)
    @IsUppercase({message: 'В промокоде только заглавные буквы'})
    @IsAlpha("en-GB", {message: 'В промокоде только латинские буквы'})
    readonly code: string;

    @IsNumber({}, {message: 'count должно быть числом'})
    @Min(1)
    readonly count: number;

    readonly end: string;

    @Contains("procent" || "currency")
    readonly type: string;

    @IsNumber({}, {message: 'discount должно быть числом'})
    readonly discount: number;

    @IsNumber({}, {message: 'creatorId должно быть числом'})
    readonly creatorId: number;
}