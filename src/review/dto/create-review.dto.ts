import { IsNumber, Length, Max, Min } from "class-validator";

export class CreateReviewDto {

    @Length(0, 500, {message: "Комментарий от 0 до 500 символов"})
    readonly text: string;

    @IsNumber({},  {message: "stars должно быть числом"})
    @Min(1, {message: "Минимально 1 звезда"})
    @Max(5, {message: "Максимально 5 звёзд"})
    readonly stars: number;

    @IsNumber({},  {message: "userId должно быть числом"})
    userId: number;

    @IsNumber({},  {message: "creatorId должно быть числом"})
    creatorId: number;
}